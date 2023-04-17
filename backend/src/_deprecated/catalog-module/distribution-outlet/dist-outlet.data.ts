import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {DistributionOutlet} from "../../../generated/types/catalog/distribution/distribution.pb";
import {
  DIST_OUTLET_COLLECTION_NAME,
  DIST_OUTLET_COLLECTION_SCHEMA,
} from "./dist-outlet.schema";
import {WriteDistributionOutletRequest} from "../../../generated/types/catalog/distribution/distribution.api.pb";
import {JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_NAME} from "../core-definition/core-def.schema";
import {
  JoinCoreDefDistOutletRequest,
  JoinCoreDefDistOutletResponse,
} from "../../../generated/types/join/core-def-dist-outlet.pb";
import {Product} from "../../../generated/types/catalog/product/product.pb";
import {PRODUCT_COLLECTION_NAME} from "../product/product.schema";
import {DistributionOutletSharedService} from "./dist-outlet.shared";
import {CoreDefinitionDataService} from "../core-definition/core-def.data";

/**
 * Manages operations on distribution outlet data.
 */
@Injectable()
export class DistributionOutletDataService {
  readonly db = getFirestore();

  constructor(
    private readonly distributionOutletSharedService: DistributionOutletSharedService,
    private readonly coreDefDataService: CoreDefinitionDataService
  ) {}

  async getDistOutlet(args: {
    distOutletId: string;
  }): Promise<DistributionOutlet | AppError> {
    const distOutletSnap = await this.db
      .collection(DIST_OUTLET_COLLECTION_NAME)
      .doc(args.distOutletId)
      .get();
    const distOutlet: Partial<DistributionOutlet> | undefined =
      distOutletSnap.data();
    if (!distOutlet) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: DIST_OUTLET_COLLECTION_NAME,
          id: args.distOutletId,
        },
      });
    }
    return DistributionOutlet.fromPartial({
      ...distOutlet,
      id: distOutletSnap.id,
    });
  }

  async getDistributionOutletsOfCoreDef(args: {
    coreDefinitionId: string;
  }): Promise<readonly DistributionOutlet[]> {
    const data = await this.db
      .collection(JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_NAME)
      .where("CoreDefinitionId", "==", args.coreDefinitionId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinCoreDefDistOutletRequest.fromPartial({
        ...(doc.data() as Partial<JoinCoreDefDistOutletRequest>),
      })
    );
    const distOutletIds = joins.map((join) => join.distributionOutletId);
    const distOutlets =
      await this.distributionOutletSharedService.getDistOutletsFromIds({
        distOutletIds: distOutletIds,
      });
    return distOutlets;
  }

  async getProducts(args: {distOutletId: string}): Promise<readonly Product[]> {
    const data = await this.db
      .collection(PRODUCT_COLLECTION_NAME)
      .where("distributionOutletId", "==", args.distOutletId)
      .get();
    const products = data.docs.map((doc) =>
      Product.fromPartial({
        ...(doc.data() as Partial<Product>),
        id: doc.id,
      })
    );
    return products;
  }

  async addCoreDefToDistOutlet(
    args: JoinCoreDefDistOutletRequest
  ): Promise<JoinCoreDefDistOutletResponse | AppError> {
    const coreDefs =
      await this.coreDefDataService.getCoreDefOfDitributionOutlet({
        distOutletId: args.distributionOutletId,
      });
    const duplicateCoreDef = coreDefs.find(
      (coreDef) => coreDef.id === args.coreDefinitionId
    );
    if (duplicateCoreDef) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_NAME)
      .add(JoinCoreDefDistOutletRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const distOutlet = await this.getDistOutlet({
      distOutletId: args.distributionOutletId,
    });
    const coreDef = await this.coreDefDataService.getCoreDefinition({
      coreDefinitionId: args.coreDefinitionId,
    });
    if ([distOutlet.$type, coreDef.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinCoreDefDistOutletResponse.fromPartial({
      distributionOutlet: distOutlet,
      coreDefinition: coreDef,
    });
  }

  async deleteCoreDefFromDistOutlet(
    args: JoinCoreDefDistOutletRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_NAME)
      .where("coreDefinitionId", "==", args.coreDefinitionId)
      .where("distributionOutletId", "==", args.distributionOutletId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }

  async createDistOutlet(args: {
    distOutletData: Partial<DistributionOutlet>;
  }): Promise<DistributionOutlet | AppError> {
    const parser = getDataParsers({schema: DIST_OUTLET_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.distOutletData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedDistOutletData = WriteDistributionOutletRequest.fromPartial(
      parser.sanitize({
        ...args.distOutletData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const distOutletRef = await this.db
      .collection(DIST_OUTLET_COLLECTION_NAME)
      .add(
        WriteDistributionOutletRequest.toJSON(
          sanitizedDistOutletData
        ) as DocumentData
      );
    const distOutlet = await this.getDistOutlet({
      distOutletId: distOutletRef.id,
    });
    if (!distOutlet)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return distOutlet;
  }

  async updateDistOutletFields(args: {
    distOutletId: string;
    distOutletData: WriteDistributionOutletRequest;
  }): Promise<DistributionOutlet | AppError> {
    const distOutlet = await this.getDistOutlet({
      distOutletId: args.distOutletId,
    });
    if (!distOutlet) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: DIST_OUTLET_COLLECTION_NAME,
          id: args.distOutletId,
        },
      });
    }
    const parser = getDataParsers({
      schema: DIST_OUTLET_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.distOutletData),
    });
    const validationErrors = parser.validate(args.distOutletData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedDistOutletDefData =
      WriteDistributionOutletRequest.fromPartial(
        parser.sanitize({
          ...args.distOutletData,
          updatedAt: timestamp,
        })
      );
    await this.db
      .collection(DIST_OUTLET_COLLECTION_NAME)
      .doc(args.distOutletId)
      .update(
        WriteDistributionOutletRequest.toJSON(
          sanitizedDistOutletDefData
        ) as DocumentData
      );
    const updatedDistOutlet = await this.getDistOutlet({
      distOutletId: args.distOutletId,
    });
    if (!updatedDistOutlet)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedDistOutlet;
  }
}
