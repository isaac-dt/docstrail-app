import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {DeliveryItem} from "../../../generated/types/operation/item/item.pb";
import {
  DELIVERY_ITEM_COLLECTION_NAME,
  DELIVERY_ITEM_COLLECTION_SCHEMA,
} from "./item.schema";
import {WriteDeliveryItemRequest} from "../../../generated/types/operation/item/item.api.pb";

/** Delivery Item data service. */
@Injectable()
export class DeliveryItemDataService {
  readonly db = getFirestore();

  async getItem(args: {itemId: string}): Promise<DeliveryItem | AppError> {
    const itemSnap = await this.db
      .collection(DELIVERY_ITEM_COLLECTION_NAME)
      .doc(args.itemId)
      .get();
    const item: Partial<DeliveryItem> | undefined = itemSnap.data();
    if (!item) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: DELIVERY_ITEM_COLLECTION_NAME, id: args.itemId},
      });
    }
    return DeliveryItem.fromPartial({...item, id: itemSnap.id});
  }

  async getItemsOfOrder(args: {
    orderId: string;
  }): Promise<readonly DeliveryItem[]> {
    const data = await this.db
      .collection(DELIVERY_ITEM_COLLECTION_NAME)
      .where("orderId", "==", args.orderId)
      .get();
    const items = data.docs.map((doc) =>
      DeliveryItem.fromPartial({
        ...(doc.data() as Partial<DeliveryItem>),
        id: doc.id,
      })
    );
    return items;
  }

  async createItem(args: {
    itemData: Partial<DeliveryItem>;
  }): Promise<DeliveryItem | AppError> {
    const parser = getDataParsers({schema: DELIVERY_ITEM_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.itemData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedItemData = WriteDeliveryItemRequest.fromPartial(
      parser.sanitize({
        ...args.itemData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const itemRef = await this.db
      .collection(DELIVERY_ITEM_COLLECTION_NAME)
      .add(WriteDeliveryItemRequest.toJSON(sanitizedItemData) as DocumentData);
    const item = await this.getItem({itemId: itemRef.id});
    if (!item) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return item;
  }

  async updateItemFields(args: {
    itemId: string;
    itemData: Partial<DeliveryItem>;
  }): Promise<DeliveryItem | AppError> {
    const item = await this.getItem({itemId: args.itemId});
    if (!item) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: DELIVERY_ITEM_COLLECTION_NAME, id: args.itemId},
      });
    }
    const parser = getDataParsers({
      schema: DELIVERY_ITEM_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.itemData),
    });
    const validationErrors = parser.validate(args.itemData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedItemData = WriteDeliveryItemRequest.fromPartial(
      parser.sanitize({
        ...args.itemData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(DELIVERY_ITEM_COLLECTION_NAME)
      .doc(args.itemId)
      .update(
        WriteDeliveryItemRequest.toJSON(sanitizedItemData) as DocumentData
      );
    const updatedItem = await this.getItem({itemId: args.itemId});
    if (!updatedItem)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedItem;
  }
}
