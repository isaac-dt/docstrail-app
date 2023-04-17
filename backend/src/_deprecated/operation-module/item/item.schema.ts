import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const DELIVERY_ITEM_COLLECTION_NAME = "catalog-delivery-items";

/** Validation schema for the companies collection. */
export const DELIVERY_ITEM_COLLECTION_SCHEMA: CollectionSchema = {
  quantity: {
    description: "the quantity of items to deliver, with minimum of 1",
    pattern: (quantity: string) => validator.isInt(quantity, {min: 1}),
  },
  productId: {
    description: "product alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  orderId: {
    description: "order alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};
