import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const TRIGGER_COLLECTION_NAME = "operation-trigger";

/** Validation schema for the trigger collection. */
export const TRIGGER_COLLECTION_SCHEMA: CollectionSchema = {
  expiresAt: {
    description: "expiration date of the trigger as a JS Date",
    pattern: validator.isDate,
    sanitize: (id: string) => validator.trim(id.toLocaleLowerCase()),
  },
  rootId: {
    description: "root id alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  name: {
    description: "trigger name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  description: {
    description: "description text in ascii",
    pattern: validator.isAscii,
    sanitize: validator.trim,
  },
  time: {
    description:
      "trigger time should follow proto oneof format. Include valid `cronSchedule` or `birthMonth`.",
    pattern: (time: any) => {
      switch (time?.$case) {
        case "cronSchedule": {
          return validator.isAscii(time.cronSchedule);
        }
        case "birthMonth": {
          return validator.isInt(time.birthMonth, {min: 1, max: 12});
        }
        default:
          return false;
      }
    },
  },
};
