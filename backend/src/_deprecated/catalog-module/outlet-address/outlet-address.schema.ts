import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const OUTLET_ADDRESS_COLLECTION_NAME = "catalog-outlet-addresses";

/** Validation schema for the outlet addresses collection. */
export const OUTLET_ADDRESS_COLLECTION_SCHEMA: CollectionSchema = {
  distribution_outlet_id: {
    description: "distribution outlet Id",
    pattern: validator.isAscii,
  },
  street: {
    description: "street address with no special characters",
    pattern: (street: string) => RegExp(/^[^<>%$]*$/).test(street),
    sanitize: (street: string) => validator.trim(street.toLocaleLowerCase()),
  },
  unit: {
    isOptional: true,
    description: "unit number",
    pattern: (unit: string) => {
      if (unit === undefined) return true;
      return validator.isInt(unit, {allow_leading_zeroes: true});
    },
  },
  city: {
    description: "city name using [a-z ,.'-]",
    pattern: (city: string) => RegExp(/^[a-z ,.'-]+$/i).test(city),
    sanitize: (city: string) => validator.trim(city.toLocaleLowerCase()),
  },
  zip: {
    description: "5 digit zip code",
    pattern: (zip: string) =>
      validator.isInt(zip, {allow_leading_zeroes: true}) &&
      zip.trim().length === 5,
    sanitize: (zip: string) => validator.trim(zip),
  },
  countryCode: {
    description: "country numeric code",
    pattern: (countryCode: string) =>
      validator.isInt(countryCode, {allow_leading_zeroes: true}),
  },
};
