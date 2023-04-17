import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {
  CORE_DEFINITION_COLLECTION_NAME,
  CORE_DEFINITION_COLLECTION_SCHEMA,
  JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_NAME,
} from "./core-def.schema";
import {CoreDefinition} from "../../../generated/types/catalog/core-definition/core-definition.pb";
import {WriteCoreDefinitionRequest} from "../../../generated/types/catalog/core-definition/core-definition.api.pb";
import {JoinCoreDefDistOutletRequest} from "../../../generated/types/join/core-def-dist-outlet.pb";
import {CoreDefinitionSharedService} from "./core-def.shared";

/**
 * Manages operations on core definition data.
 */
@Injectable()
export class CoreDefinitionDataService {
  readonly db = getFirestore();

  constructor(
    private readonly coreDefinitionSharedService: CoreDefinitionSharedService
  ) {}

  async getCoreDefinition(args: {
    coreDefinitionId: string;
  }): Promise<CoreDefinition | AppError> {
    const coreDefSnap = await this.db
      .collection(CORE_DEFINITION_COLLECTION_NAME)
      .doc(args.coreDefinitionId)
      .get();
    const coreDef: Partial<CoreDefinition> | undefined = coreDefSnap.data();
    if (!coreDef) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: CORE_DEFINITION_COLLECTION_NAME,
          id: args.coreDefinitionId,
        },
      });
    }
    return CoreDefinition.fromPartial({...coreDef, id: coreDefSnap.id});
  }

  async getCoreDefOfDitributionOutlet(args: {
    distOutletId: string;
  }): Promise<readonly CoreDefinition[]> {
    const data = await this.db
      .collection(JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_NAME)
      .where("distributionOutletId", "==", args.distOutletId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinCoreDefDistOutletRequest.fromPartial({
        ...(doc.data() as Partial<JoinCoreDefDistOutletRequest>),
      })
    );
    const coreDefIds = joins.map((join) => join.coreDefinitionId);
    const coreDefs =
      await this.coreDefinitionSharedService.getCoreDefinitionsFromIds({
        coreDefIds,
      });
    return coreDefs;
  }

  async createCoreDefinition(args: {
    coreDefData: Partial<CoreDefinition>;
  }): Promise<CoreDefinition | AppError> {
    const parser = getDataParsers({schema: CORE_DEFINITION_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.coreDefData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedCoreDefData = WriteCoreDefinitionRequest.fromPartial(
      parser.sanitize({
        ...args.coreDefData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const coreDefRef = await this.db
      .collection(CORE_DEFINITION_COLLECTION_NAME)
      .add(
        WriteCoreDefinitionRequest.toJSON(sanitizedCoreDefData) as DocumentData
      );
    const coreDef = await this.getCoreDefinition({
      coreDefinitionId: coreDefRef.id,
    });
    if (!coreDef) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return coreDef;
  }

  async updateCoreDefinitionFields(args: {
    coreDefinitionId: string;
    coreDefinitionData: WriteCoreDefinitionRequest;
  }): Promise<CoreDefinition | AppError> {
    const coreDef = await this.getCoreDefinition({
      coreDefinitionId: args.coreDefinitionId,
    });
    if (!coreDef) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: CORE_DEFINITION_COLLECTION_NAME,
          id: args.coreDefinitionId,
        },
      });
    }
    const parser = getDataParsers({
      schema: CORE_DEFINITION_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.coreDefinitionData),
    });
    const validationErrors = parser.validate(args.coreDefinitionData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedCoreDefData = WriteCoreDefinitionRequest.fromPartial(
      parser.sanitize({
        ...args.coreDefinitionData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(CORE_DEFINITION_COLLECTION_NAME)
      .doc(args.coreDefinitionId)
      .update(
        WriteCoreDefinitionRequest.toJSON(sanitizedCoreDefData) as DocumentData
      );
    const updatedCoreDef = await this.getCoreDefinition({
      coreDefinitionId: args.coreDefinitionId,
    });
    if (!updatedCoreDef)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedCoreDef;
  }
}
