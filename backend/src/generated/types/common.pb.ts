/* eslint-disable */
import { messageTypeRegistry } from "./typeRegistry";

export const protobufPackage = "common";

/**
 * Codified app errors.
 * Next Id: 3
 */
export enum ErrorCode {
  INVALID_DATA = "INVALID_DATA",
  NOT_FOUND_IN_DB = "NOT_FOUND_IN_DB",
  DUPLICATE_ENTRY = "DUPLICATE_ENTRY",
  MISSING_PERMISSION = "MISSING_PERMISSION",
  UNKNOWN = "UNKNOWN",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function errorCodeFromJSON(object: any): ErrorCode {
  switch (object) {
    case 0:
    case "INVALID_DATA":
      return ErrorCode.INVALID_DATA;
    case 1:
    case "NOT_FOUND_IN_DB":
      return ErrorCode.NOT_FOUND_IN_DB;
    case 2:
    case "DUPLICATE_ENTRY":
      return ErrorCode.DUPLICATE_ENTRY;
    case 3:
    case "MISSING_PERMISSION":
      return ErrorCode.MISSING_PERMISSION;
    case 4:
    case "UNKNOWN":
      return ErrorCode.UNKNOWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ErrorCode.UNRECOGNIZED;
  }
}

export function errorCodeToJSON(object: ErrorCode): string {
  switch (object) {
    case ErrorCode.INVALID_DATA:
      return "INVALID_DATA";
    case ErrorCode.NOT_FOUND_IN_DB:
      return "NOT_FOUND_IN_DB";
    case ErrorCode.DUPLICATE_ENTRY:
      return "DUPLICATE_ENTRY";
    case ErrorCode.MISSING_PERMISSION:
      return "MISSING_PERMISSION";
    case ErrorCode.UNKNOWN:
      return "UNKNOWN";
    case ErrorCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Structure for JSON https responses.
 * Next Id: 4
 */
export interface JsonResponse {
  $type: "common.JsonResponse";
  readonly data: any | undefined;
  readonly error: AppError | undefined;
}

/**
 * App Error structure.
 * Next Id: 3
 */
export interface AppError {
  $type: "common.AppError";
  readonly details: any | undefined;
  readonly errorCode: ErrorCode;
}

/**
 * The data stored in JWT auth token.
 * Next Id: 3
 */
export interface AuthData {
  $type: "common.AuthData";
  readonly user: JwtUserData | undefined;
}

export interface JwtUserData {
  $type: "common.JwtUserData";
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly isEmailVerified: boolean;
}

function createBaseJsonResponse(): JsonResponse {
  return { $type: "common.JsonResponse", data: undefined, error: undefined };
}

export const JsonResponse = {
  $type: "common.JsonResponse" as const,

  fromJSON(object: any): JsonResponse {
    return {
      $type: JsonResponse.$type,
      data: isSet(object?.data) ? object.data : undefined,
      error: isSet(object.error) ? AppError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: JsonResponse): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    message.error !== undefined && (obj.error = message.error ? AppError.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JsonResponse>, I>>(object: I): JsonResponse {
    const message = createBaseJsonResponse() as any;
    message.data = object.data ?? undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? AppError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(JsonResponse.$type, JsonResponse);

function createBaseAppError(): AppError {
  return { $type: "common.AppError", details: undefined, errorCode: ErrorCode.INVALID_DATA };
}

export const AppError = {
  $type: "common.AppError" as const,

  fromJSON(object: any): AppError {
    return {
      $type: AppError.$type,
      details: isSet(object?.details) ? object.details : undefined,
      errorCode: isSet(object.errorCode) ? errorCodeFromJSON(object.errorCode) : ErrorCode.INVALID_DATA,
    };
  },

  toJSON(message: AppError): unknown {
    const obj: any = {};
    message.details !== undefined && (obj.details = message.details);
    message.errorCode !== undefined && (obj.errorCode = errorCodeToJSON(message.errorCode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AppError>, I>>(object: I): AppError {
    const message = createBaseAppError() as any;
    message.details = object.details ?? undefined;
    message.errorCode = object.errorCode ?? ErrorCode.INVALID_DATA;
    return message;
  },
};

messageTypeRegistry.set(AppError.$type, AppError);

function createBaseAuthData(): AuthData {
  return { $type: "common.AuthData", user: undefined };
}

export const AuthData = {
  $type: "common.AuthData" as const,

  fromJSON(object: any): AuthData {
    return { $type: AuthData.$type, user: isSet(object.user) ? JwtUserData.fromJSON(object.user) : undefined };
  },

  toJSON(message: AuthData): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? JwtUserData.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthData>, I>>(object: I): AuthData {
    const message = createBaseAuthData() as any;
    message.user = (object.user !== undefined && object.user !== null)
      ? JwtUserData.fromPartial(object.user)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(AuthData.$type, AuthData);

function createBaseJwtUserData(): JwtUserData {
  return { $type: "common.JwtUserData", id: "", email: "", fullName: "", isEmailVerified: false };
}

export const JwtUserData = {
  $type: "common.JwtUserData" as const,

  fromJSON(object: any): JwtUserData {
    return {
      $type: JwtUserData.$type,
      id: isSet(object.id) ? String(object.id) : "",
      email: isSet(object.email) ? String(object.email) : "",
      fullName: isSet(object.fullName) ? String(object.fullName) : "",
      isEmailVerified: isSet(object.isEmailVerified) ? Boolean(object.isEmailVerified) : false,
    };
  },

  toJSON(message: JwtUserData): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.email !== undefined && (obj.email = message.email);
    message.fullName !== undefined && (obj.fullName = message.fullName);
    message.isEmailVerified !== undefined && (obj.isEmailVerified = message.isEmailVerified);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JwtUserData>, I>>(object: I): JwtUserData {
    const message = createBaseJwtUserData() as any;
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.fullName = object.fullName ?? "";
    message.isEmailVerified = object.isEmailVerified ?? false;
    return message;
  },
};

messageTypeRegistry.set(JwtUserData.$type, JwtUserData);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
