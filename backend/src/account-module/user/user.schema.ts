import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";
import {UserRole} from "../../generated/types/account/user/user.pb";

/** Collection reference for firestore. */
export const USER_COLLECTION_NAME = "account-users";

/** Validation schema for the users collection. */
export const USER_COLLECTION_SCHEMA: CollectionSchema = {
  id: {
    description: "user alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  email: {
    description: "user email",
    pattern: validator.isEmail,
  },
  photoUrl: {
    description: "user photo url",
    isOptional: true,
    pattern: (data: any) => {
      if (data === undefined) return true;
      return validator.isAscii(data);
    },
  },
  // birthDay: {
  //   isOptional: true,
  //   description: `day as integer from 1 to 31`,
  //   pattern: (day?: string) => {
  //     if (day === undefined) return true;
  //     return validator.isInt(day, {min: 1, max: 31});
  //   },
  // },
  // birthMonth: {
  //   isOptional: true,
  //   description: "month as integer from 1 to 12",
  //   pattern: (month?: string) => {
  //     if (month === undefined) return true;
  //     return validator.isInt(month, {min: 1, max: 12});
  //   },
  // },
  fullName: {
    description: "full user name using [a-z ,.'-]",
    pattern: (fullName: string) => RegExp(/^[a-z ,.'-]+$/i).test(fullName),
    sanitize: (fullName: string) =>
      validator.trim(fullName.toLocaleLowerCase()),
  },
  role: {
    description: "the role of the user",
    pattern: (role: any) => {
      return Object.values(UserRole).includes(role);
    },
  },
  teamId: {
    description: "team alphanumeric id",
    isOptional: true,
    pattern: (data: any) => {
      if (data === undefined || data === "") return true;
      return validator.isAlphanumeric(data);
    },
    sanitize: (data: any) => {
      if (data === "") return undefined;
      return data;
    },
  },
};

/** Join collection between user and jobRole.  */
export const JOIN_USER_JOB_ROLE_COLLECTION_NAME = "account-join-user-job-role";
/** Validation schema for Join collection between user and jobRole.  */
export const JOIN_USER_JOB_ROLE_COLLECTION_SCHEMA: CollectionSchema = {
  jobRoleId: {
    description: "job role alphanumeric id",
    pattern: validator.isAlphanumeric,
    sanitize: (jobRoleId: string) =>
      validator.trim(jobRoleId.toLocaleLowerCase()),
  },
  userId: {
    description: "user alphanumeric id",
    pattern: validator.isAlphanumeric,
    sanitize: (userId: string) => validator.trim(userId.toLocaleLowerCase()),
  },
};
