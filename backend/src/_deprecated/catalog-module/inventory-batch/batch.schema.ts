import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";
import {Currency} from "../../../generated/types/shared.pb";

/** Collection reference for firestore. */
export const INVENTORY_BATCH_COLLECTION_NAME = "catalog-inventory-batch";

/** Validation schema for the inventory batch collection. */
export const INVENTORY_BATCH_COLLECTION_SCHEMA: CollectionSchema = {
  quantity: {
    description: "quantity in the batch, as a positive integer",
    pattern: (count: string) => validator.isInt(count, {min: 0}),
    sanitize: (count: string) => validator.toInt(count),
  },
  productId: {
    description: "root alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  price: {
    description:
      "price following Price shared proto. Should contain: 'date', 'amount', and 'currency'",
    pattern: (price: any) => {
      const isDate = validator.isDate(price.date);
      const isAmount = validator.isFloat(price.amount);
      const isCurrency = Object.keys(Currency).includes(price.currency);
      return isDate && isAmount && isCurrency;
    },
    sanitize: (price: any) => ({
      date: validator.toDate(price.date),
      amount: validator.toFloat(price.amount),
    }),
  },
  date: {
    description: "date of batch acquisition",
    pattern: validator.isAlphanumeric,
    sanitize: (date: string) => validator.isDate(date),
  },
};
