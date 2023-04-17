import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";
import {Currency} from "../../../generated/types/shared.pb";

/** Collection reference for firestore. */
export const PRODUCT_COLLECTION_NAME = "catalog-products";

/** Validation schema for the products collection. */
export const PRODUCT_COLLECTION_SCHEMA: CollectionSchema = {
  name: {
    description: "name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  description: {
    description: "description text in ascii",
    pattern: validator.isAscii,
    sanitize: validator.trim,
  },
  webLink: {
    description: "web link to produt as URL",
    pattern: validator.isURL,
  },
  imageUrl: {
    description: "web URL to the product image",
    pattern: validator.isURL,
  },
  distributionOutletId: {
    description: "distribution outlet alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  openDefinitionId: {
    description: "open definition alphanumeric id",
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
};
