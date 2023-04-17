/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "account.user";

/** Roles that a user can assume. */
export enum UserRole {
  UNKNOWN_ROLE = "UNKNOWN_ROLE",
  EMPLOYEE = "EMPLOYEE",
  ORG_ADMIN = "ORG_ADMIN",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function userRoleFromJSON(object: any): UserRole {
  switch (object) {
    case 0:
    case "UNKNOWN_ROLE":
      return UserRole.UNKNOWN_ROLE;
    case 1:
    case "EMPLOYEE":
      return UserRole.EMPLOYEE;
    case 2:
    case "ORG_ADMIN":
      return UserRole.ORG_ADMIN;
    case 3:
    case "SYSTEM_ADMIN":
      return UserRole.SYSTEM_ADMIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserRole.UNRECOGNIZED;
  }
}

export function userRoleToJSON(object: UserRole): string {
  switch (object) {
    case UserRole.UNKNOWN_ROLE:
      return "UNKNOWN_ROLE";
    case UserRole.EMPLOYEE:
      return "EMPLOYEE";
    case UserRole.ORG_ADMIN:
      return "ORG_ADMIN";
    case UserRole.SYSTEM_ADMIN:
      return "SYSTEM_ADMIN";
    case UserRole.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Individual user associated to a Dimetrail account. */
export interface User {
  $type: "account.user.User";
  readonly id: string;
  readonly fullName: string;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;
  readonly role: UserRole;
  readonly teamId: string | undefined;
  readonly photoUrl: string | undefined;
  readonly email: string;
}

function createBaseUser(): User {
  return {
    $type: "account.user.User",
    id: "",
    fullName: "",
    createdAt: undefined,
    updatedAt: undefined,
    role: UserRole.UNKNOWN_ROLE,
    teamId: undefined,
    photoUrl: undefined,
    email: "",
  };
}

export const User = {
  $type: "account.user.User" as const,

  fromJSON(object: any): User {
    return {
      $type: User.$type,
      id: isSet(object.id) ? String(object.id) : "",
      fullName: isSet(object.fullName) ? String(object.fullName) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      role: isSet(object.role) ? userRoleFromJSON(object.role) : UserRole.UNKNOWN_ROLE,
      teamId: isSet(object.teamId) ? String(object.teamId) : undefined,
      photoUrl: isSet(object.photoUrl) ? String(object.photoUrl) : undefined,
      email: isSet(object.email) ? String(object.email) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.fullName !== undefined && (obj.fullName = message.fullName);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.role !== undefined && (obj.role = userRoleToJSON(message.role));
    message.teamId !== undefined && (obj.teamId = message.teamId);
    message.photoUrl !== undefined && (obj.photoUrl = message.photoUrl);
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser() as any;
    message.id = object.id ?? "";
    message.fullName = object.fullName ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.role = object.role ?? UserRole.UNKNOWN_ROLE;
    message.teamId = object.teamId ?? undefined;
    message.photoUrl = object.photoUrl ?? undefined;
    message.email = object.email ?? "";
    return message;
  },
};

messageTypeRegistry.set(User.$type, User);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
