import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const TEMPLATE_COLLECTION_NAME = "operation-template";

/** Validation schema for the template collection. */
export const TEMPLATE_COLLECTION_SCHEMA: CollectionSchema = {
  bundleId: {
    description: "bundle id alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  name: {
    description: "template name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  description: {
    description: "description text in ascii",
    pattern: validator.isAscii,
    sanitize: validator.trim,
  },
};

/** Join collection between template and package.  */
export const JOIN_TEMPLATE_PACKAGE_COLLECTION_NAME = "join-template-package";
/** Validation schema for Join collection between template and package.  */
export const JOIN_TEMPLATE_PACKAGE_COLLECTION_SCHEMA: CollectionSchema = {
  templateId: {
    description: "template alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  packageId: {
    description: "package alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};

/** Join collection between template and trigger.  */
export const JOIN_TEMPLATE_TRIGGER_COLLECTION_NAME = "join-template-trigger";
/** Validation schema for Join collection between template and trigger.  */
export const JOIN_TEMPLATE_TRIGGER_COLLECTION_SCHEMA: CollectionSchema = {
  templateId: {
    description: "template alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  triggerId: {
    description: "trigger alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};

/** Join collection between template and target.  */
export const JOIN_TEMPLATE_TARGET_COLLECTION_NAME = "join-template-target";
/** Validation schema for Join collection between template and target.  */
export const JOIN_TEMPLATE_TARGET_COLLECTION_SCHEMA: CollectionSchema = {
  templateId: {
    description: "template alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  targetId: {
    description: "target alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};
