import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {
  getFirestore,
  FieldValue,
  DocumentData,
  FieldPath,
} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {Trigger} from "../../../generated/types/operation/trigger/trigger.pb";
import {
  TRIGGER_COLLECTION_NAME,
  TRIGGER_COLLECTION_SCHEMA,
} from "./trigger.schema";
import {WriteTriggerRequest} from "../../../generated/types/operation/trigger/trigger.api.pb";
import {JOIN_TEMPLATE_TRIGGER_COLLECTION_NAME} from "../template/template.schema";
import {JoinTemplateTriggerRequest} from "../../../generated/types/join/template-trigger.pb";

/**
 * Manages operations on trigger data.
 */
@Injectable()
export class TriggerDataService {
  readonly db = getFirestore();

  async getTrigger(args: {triggerId: string}): Promise<Trigger | AppError> {
    const triggerSnap = await this.db
      .collection(TRIGGER_COLLECTION_NAME)
      .doc(args.triggerId)
      .get();
    const trigger: Partial<Trigger> | undefined = triggerSnap.data();
    if (!trigger)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: TRIGGER_COLLECTION_NAME, id: args.triggerId},
      });
    return Trigger.fromJSON({...trigger, id: triggerSnap.id});
  }

  async getTriggersFromIds(args: {
    triggerIds: string[];
  }): Promise<readonly Trigger[]> {
    const data = await this.db
      .collection(TRIGGER_COLLECTION_NAME)
      .where(FieldPath.documentId(), "in", args.triggerIds)
      .get();
    const triggers = data.docs.map((doc) =>
      Trigger.fromPartial({
        ...(doc.data() as Partial<Trigger>),
        id: doc.id,
      })
    );
    return triggers;
  }

  async getTriggersOfTemplate(args: {
    templateId: string;
  }): Promise<readonly Trigger[]> {
    const data = await this.db
      .collection(JOIN_TEMPLATE_TRIGGER_COLLECTION_NAME)
      .where("templateId", "==", args.templateId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinTemplateTriggerRequest.fromPartial({
        ...(doc.data() as Partial<JoinTemplateTriggerRequest>),
      })
    );
    const triggerIds = joins.map((join) => join.triggerId);
    const triggers = await this.getTriggersFromIds({
      triggerIds,
    });
    return triggers;
  }

  async createTrigger(args: {
    triggerData: Partial<Trigger>;
  }): Promise<Trigger | AppError> {
    const parser = getDataParsers({schema: TRIGGER_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.triggerData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedTriggerData = WriteTriggerRequest.fromPartial(
      parser.sanitize({
        ...args.triggerData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const triggerRef = await this.db
      .collection(TRIGGER_COLLECTION_NAME)
      .add(WriteTriggerRequest.toJSON(sanitizedTriggerData) as DocumentData);
    const trigger = await this.getTrigger({triggerId: triggerRef.id});
    if (!trigger) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return trigger;
  }

  async updateTriggerFields(args: {
    triggerId: string;
    triggerData: Partial<Trigger>;
  }): Promise<Trigger | AppError> {
    const trigger = await this.getTrigger({triggerId: args.triggerId});
    if (!trigger) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: TRIGGER_COLLECTION_NAME, id: args.triggerId},
      });
    }
    const parser = getDataParsers({
      schema: TRIGGER_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.triggerData),
    });
    const validationErrors = parser.validate(args.triggerData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedTriggerData = WriteTriggerRequest.fromPartial(
      parser.sanitize({
        ...args.triggerData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(TRIGGER_COLLECTION_NAME)
      .doc(args.triggerId)
      .update(WriteTriggerRequest.toJSON(sanitizedTriggerData) as DocumentData);
    const updatedTrigger = await this.getTrigger({triggerId: args.triggerId});
    if (!updatedTrigger)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedTrigger;
  }
}
