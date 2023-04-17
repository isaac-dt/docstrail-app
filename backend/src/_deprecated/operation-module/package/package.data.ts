import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {
  getFirestore,
  FieldValue,
  DocumentData,
  FieldPath,
} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {Package} from "../../../generated/types/operation/package/package.pb";
import {
  JOIN_PACKAGE_OPEN_DEF_COLLECTION_NAME,
  PACKAGE_COLLECTION_NAME,
  PACKAGE_COLLECTION_SCHEMA,
} from "./package.schema";
import {WritePackageRequest} from "../../../generated/types/operation/package/package.api.pb";
import {
  JoinPackageOpenDefinitionRequest,
  JoinPackageOpenDefinitionResponse,
} from "../../../generated/types/join/package-open-def.pb";
import {OpenDefinitionDataService} from "../../catalog-module/open-definition/open-definition.data";
import {JOIN_TEMPLATE_PACKAGE_COLLECTION_NAME} from "../template/template.schema";
import {JoinTemplatePackageRequest} from "../../../generated/types/join/template-package.pb";

/**
 * Manages operations on package data.
 */
@Injectable()
export class PackageDataService {
  readonly db = getFirestore();

  constructor(private readonly openDefDataService: OpenDefinitionDataService) {}

  async getPackage(args: {packageId: string}): Promise<Package | AppError> {
    const packageSnap = await this.db
      .collection(PACKAGE_COLLECTION_NAME)
      .doc(args.packageId)
      .get();
    const packageObj: Partial<Package> | undefined = packageSnap.data();
    if (!packageObj)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: PACKAGE_COLLECTION_NAME, id: args.packageId},
      });
    return Package.fromJSON({...packageObj, id: packageSnap.id});
  }

  async getPackagesFromIds(args: {
    packageIds: string[];
  }): Promise<readonly Package[]> {
    const data = await this.db
      .collection(PACKAGE_COLLECTION_NAME)
      .where(FieldPath.documentId(), "in", args.packageIds)
      .get();
    const packages = data.docs.map((doc) =>
      Package.fromPartial({
        ...(doc.data() as Partial<Package>),
        id: doc.id,
      })
    );
    return packages;
  }

  async getPackagesOfTemplate(args: {
    templateId: string;
  }): Promise<readonly Package[]> {
    const data = await this.db
      .collection(JOIN_TEMPLATE_PACKAGE_COLLECTION_NAME)
      .where("templateId", "==", args.templateId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinTemplatePackageRequest.fromPartial({
        ...(doc.data() as Partial<JoinTemplatePackageRequest>),
      })
    );
    const packageIds = joins.map((join) => join.packageId);
    const packages = await this.getPackagesFromIds({
      packageIds,
    });
    return packages;
  }

  async addOpenDefToPackage(
    args: JoinPackageOpenDefinitionRequest
  ): Promise<JoinPackageOpenDefinitionResponse | AppError> {
    const openDefs = await this.openDefDataService.getOpenDefsOfPackage({
      packageId: args.packageId,
    });
    const duplicateOpenDef = openDefs.find(
      (openDef) => openDef.id === args.openDefinitionId
    );
    if (duplicateOpenDef) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_PACKAGE_OPEN_DEF_COLLECTION_NAME)
      .add(JoinPackageOpenDefinitionRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const packageObj = await this.getPackage({packageId: args.packageId});
    const openDefinition = await this.openDefDataService.getOpenDefinition({
      openDefinitionId: args.openDefinitionId,
    });
    if ([packageObj.$type, openDefinition.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinPackageOpenDefinitionResponse.fromPartial({
      package: packageObj,
      openDefinition,
    });
  }

  async deleteOpenDefFromPackage(
    args: JoinPackageOpenDefinitionRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_PACKAGE_OPEN_DEF_COLLECTION_NAME)
      .where("packageId", "==", args.packageId)
      .where("openDefinitionId", "==", args.openDefinitionId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_PACKAGE_OPEN_DEF_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }

  async createPackage(args: {
    packageData: Partial<Package>;
  }): Promise<Package | AppError> {
    const parser = getDataParsers({schema: PACKAGE_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.packageData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedPackageData = WritePackageRequest.fromPartial(
      parser.sanitize({
        ...args.packageData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const packageRef = await this.db
      .collection(PACKAGE_COLLECTION_NAME)
      .add(WritePackageRequest.toJSON(sanitizedPackageData) as DocumentData);
    const packageObj = await this.getPackage({packageId: packageRef.id});
    if (!packageObj)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return packageObj;
  }

  async updatePackageFields(args: {
    id: string;
    packageData: Partial<Package>;
  }): Promise<Package | AppError> {
    const packageObj = await this.getPackage({packageId: args.id});
    if (!packageObj) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: PACKAGE_COLLECTION_NAME, id: args.id},
      });
    }
    const parser = getDataParsers({
      schema: PACKAGE_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.packageData),
    });
    const validationErrors = parser.validate(args.packageData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedPackageData = WritePackageRequest.fromPartial(
      parser.sanitize({
        ...args.packageData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(PACKAGE_COLLECTION_NAME)
      .doc(args.id)
      .update(WritePackageRequest.toJSON(sanitizedPackageData) as DocumentData);
    const updatedPackage = await this.getPackage({packageId: args.id});
    if (!updatedPackage)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedPackage;
  }
}
