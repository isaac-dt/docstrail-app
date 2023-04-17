import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {
  getFirestore,
  FieldValue,
  DocumentData,
  FieldPath,
} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {OpenDefinition} from "../../../generated/types/catalog/open-definition/open-definition.pb";
import {
  OPEN_DEFINITION_COLLECTION_NAME,
  OPEN_DEFINITION_COLLECTION_SCHEMA,
} from "./open-definition.schema";
import {WriteOpenDefinitionRequest} from "../../../generated/types/catalog/open-definition/open-definition.api.pb";
import {JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_NAME} from "../allow-list/allow-list.schema";
import {JoinAllowListOpenDefinitionRequest} from "../../../generated/types/join/allow-list-open-def.pb";
import {JOIN_PACKAGE_OPEN_DEF_COLLECTION_NAME} from "../../operation-module/package/package.schema";
import {JoinPackageOpenDefinitionRequest} from "../../../generated/types/join/package-open-def.pb";

/**
 * Manages operations on open definition data.
 */
@Injectable()
export class OpenDefinitionDataService {
  readonly db = getFirestore();

  async getOpenDefinition(args: {
    openDefinitionId: string;
  }): Promise<OpenDefinition | AppError> {
    const openDefSnap = await this.db
      .collection(OPEN_DEFINITION_COLLECTION_NAME)
      .doc(args.openDefinitionId)
      .get();
    const openDef: Partial<OpenDefinition> | undefined = openDefSnap.data();
    if (!openDef) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: OPEN_DEFINITION_COLLECTION_NAME,
          id: args.openDefinitionId,
        },
      });
    }
    return OpenDefinition.fromPartial({...openDef, id: openDefSnap.id});
  }

  async getOpenDefsFromIds(args: {
    openDefIds: string[];
  }): Promise<readonly OpenDefinition[]> {
    const data = await this.db
      .collection(OPEN_DEFINITION_COLLECTION_NAME)
      .where(FieldPath.documentId(), "in", args.openDefIds)
      .get();
    const openDefs = data.docs.map((doc) =>
      OpenDefinition.fromPartial({
        ...(doc.data() as Partial<OpenDefinition>),
        id: doc.id,
      })
    );
    return openDefs;
  }

  async getOpenDefsOfAllowList(args: {
    allowListId: string;
  }): Promise<readonly OpenDefinition[]> {
    const data = await this.db
      .collection(JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_NAME)
      .where("allowListId", "==", args.allowListId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinAllowListOpenDefinitionRequest.fromPartial({
        ...(doc.data() as Partial<JoinAllowListOpenDefinitionRequest>),
      })
    );
    const openDefIds = joins.map((join) => join.openDefinitionId);
    const openDefs = await this.getOpenDefsFromIds({
      openDefIds,
    });
    return openDefs;
  }

  async getOpenDefsOfPackage(args: {
    packageId: string;
  }): Promise<readonly OpenDefinition[]> {
    const data = await this.db
      .collection(JOIN_PACKAGE_OPEN_DEF_COLLECTION_NAME)
      .where("packageId", "==", args.packageId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinPackageOpenDefinitionRequest.fromPartial({
        ...(doc.data() as Partial<JoinPackageOpenDefinitionRequest>),
      })
    );
    const openDefIds = joins.map((join) => join.openDefinitionId);
    const openDefs = await this.getOpenDefsFromIds({
      openDefIds,
    });
    return openDefs;
  }

  async createOpenDefinition(args: {
    openDefData: Partial<OpenDefinition>;
  }): Promise<OpenDefinition | AppError> {
    const parser = getDataParsers({schema: OPEN_DEFINITION_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.openDefData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedOpenDefData = WriteOpenDefinitionRequest.fromPartial(
      parser.sanitize({
        ...args.openDefData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const openDefRef = await this.db
      .collection(OPEN_DEFINITION_COLLECTION_NAME)
      .add(
        WriteOpenDefinitionRequest.toJSON(sanitizedOpenDefData) as DocumentData
      );
    const openDef = await this.getOpenDefinition({
      openDefinitionId: openDefRef.id,
    });
    if (!openDef) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return openDef;
  }

  async updateOpenDefinitionFields(args: {
    openDefinitionId: string;
    openDefinitionData: WriteOpenDefinitionRequest;
  }): Promise<OpenDefinition | AppError> {
    const openDef = await this.getOpenDefinition({
      openDefinitionId: args.openDefinitionId,
    });
    if (!openDef) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: OPEN_DEFINITION_COLLECTION_NAME,
          id: args.openDefinitionId,
        },
      });
    }
    const parser = getDataParsers({
      schema: OPEN_DEFINITION_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.openDefinitionData),
    });
    const validationErrors = parser.validate(args.openDefinitionData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedOpenDefData = WriteOpenDefinitionRequest.fromPartial(
      parser.sanitize({
        ...args.openDefinitionData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(OPEN_DEFINITION_COLLECTION_NAME)
      .doc(args.openDefinitionId)
      .update(
        WriteOpenDefinitionRequest.toJSON(sanitizedOpenDefData) as DocumentData
      );
    const updatedOpenDef = await this.getOpenDefinition({
      openDefinitionId: args.openDefinitionId,
    });
    if (!updatedOpenDef)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedOpenDef;
  }
}
