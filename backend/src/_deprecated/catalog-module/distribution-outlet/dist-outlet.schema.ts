import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";
import {DistributionMethod} from "../../../generated/types/catalog/distribution/distribution.pb";

/** Collection reference for firestore. */
export const DIST_OUTLET_COLLECTION_NAME = "catalog-distribution-outlets";

/** Validation schema for the distribution outlet collection. */
export const DIST_OUTLET_COLLECTION_SCHEMA: CollectionSchema = {
  name: {
    description: "distribution outlet name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  companyId: {
    description: "company alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  physicalAddressId: {
    description: "physical address alphanumeric id",
    pattern: validator.isAlphanumeric,
    sanitize: (addressId: string) =>
      validator.trim(addressId.toLocaleLowerCase()),
  },
  webAddress: {
    description: "web address as URL",
    pattern: validator.isURL,
  },
  customerServicePhoneNumber: {
    isOptional: true,
    description: "phone number of the customer service, with format '+NUMBERS'",
    pattern: (number: any) => {
      if (number === undefined) return true;
      return validator.isMobilePhone(number);
    },
  },
  customerServiceEmail: {
    isOptional: true,
    description: "email of the customer service",
    pattern: (email: any) => {
      if (email === undefined) return true;
      return validator.isEmail(email);
    },
    sanitize: (email: string) =>
      validator.normalizeEmail(email, {all_lowercase: true}),
  },
  dsitributionMethod: {
    description: `distribution method as one of ${Object.keys(
      DistributionMethod
    )}`,
    pattern: Object.keys(DistributionMethod).includes,
  },
};
