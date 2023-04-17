import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {AllowList} from "../../../generated/types/catalog/allow-list/allow-list.pb";
import {
  ALLOW_LIST_COLLECTION_NAME,
  ALLOW_LIST_COLLECTION_SCHEMA,
  JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_NAME,
} from "./allow-list.schema";
import {WriteAllowListRequest} from "../../../generated/types/catalog/allow-list/allow-list.api.pb";
import {
  JoinAllowListOpenDefinitionRequest,
  JoinAllowListOpenDefinitionResponse,
} from "../../../generated/types/join/allow-list-open-def.pb";
import {OpenDefinitionDataService} from "../open-definition/open-definition.data";

/** Allow List data service. */
@Injectable()
export class AllowListDataService {
  readonly db = getFirestore();

  constructor(private readonly openDefDataService: OpenDefinitionDataService) {}

  async getAllowList(args: {
    allowListId: string;
  }): Promise<AllowList | AppError> {
    const allowListSnap = await this.db
      .collection(ALLOW_LIST_COLLECTION_NAME)
      .doc(args.allowListId)
      .get();
    const allowList: Partial<AllowList> | undefined = allowListSnap.data();
    if (!allowList) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: ALLOW_LIST_COLLECTION_NAME, id: args.allowListId},
      });
    }
    return AllowList.fromPartial({...allowList, id: allowListSnap.id});
  }

  async createAllowList(args: {
    allowListData: Partial<AllowList>;
  }): Promise<AllowList | AppError> {
    const parser = getDataParsers({schema: ALLOW_LIST_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.allowListData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedAllowListData = WriteAllowListRequest.fromPartial(
      parser.sanitize({
        ...args.allowListData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const allowListRef = await this.db
      .collection(ALLOW_LIST_COLLECTION_NAME)
      .add(
        WriteAllowListRequest.toJSON(sanitizedAllowListData) as DocumentData
      );
    const allowList = await this.getAllowList({allowListId: allowListRef.id});
    if (!allowList) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return allowList;
  }

  async addOpenDefToAllowList(
    args: JoinAllowListOpenDefinitionRequest
  ): Promise<JoinAllowListOpenDefinitionResponse | AppError> {
    const openDefs = await this.openDefDataService.getOpenDefsOfAllowList({
      allowListId: args.allowListId,
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
      .collection(JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_NAME)
      .add(JoinAllowListOpenDefinitionRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const allowList = await this.getAllowList({allowListId: args.allowListId});
    const openDefinition = await this.openDefDataService.getOpenDefinition({
      openDefinitionId: args.openDefinitionId,
    });
    if ([allowList.$type, openDefinition.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinAllowListOpenDefinitionResponse.fromPartial({
      allowList,
      openDefinition,
    });
  }

  async deleteOpenDefFromAllowList(
    args: JoinAllowListOpenDefinitionRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_NAME)
      .where("openDefinitionId", "==", args.openDefinitionId)
      .where("allowListId", "==", args.allowListId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }
}
