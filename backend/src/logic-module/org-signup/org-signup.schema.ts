import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";
import {UserRole} from "../../generated/types/account/user/user.pb";

/** Validation schema for the user signup api. */
export const USER_SIGNUP_SCHEMA: CollectionSchema = {
  userFullName: {
    description: "user full name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  email: {
    description: "user email",
    pattern: validator.isEmail,
  },
  photoUrl: {
    description: "photo of the user",
    isOptional: true,
    pattern: (data: any) => {
      if (data === undefined) return true;
      return validator.isAscii(data);
    },
  },
};

/**
 * Validation schema for the org signup api.
 * @deprecated Use {@link USER_SIGNUP_SCHEMA} instead.
 */
export const ORG_SIGNUP_SCHEMA: CollectionSchema = {
  clientName: {
    description: "client name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  userFullName: {
    description: "user full name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  email: {
    description: "user email",
    pattern: validator.isEmail,
  },
  userRole: {
    description: "the role of the user",
    pattern: (role: any) => {
      return Object.values(UserRole).includes(role);
    },
  },
  photoUrl: {
    description: "photo of the user",
    isOptional: true,
    pattern: (data: any) => {
      if (data === undefined) return true;
      return validator.isAscii(data);
    },
  },
};
