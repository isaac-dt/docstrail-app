/* eslint-disable */
import { JobRole } from "../account/job-role/job-role.pb";
import { User } from "../account/user/user.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinUserJobRoleRequest {
  $type: "join.JoinUserJobRoleRequest";
  readonly userId: string;
  readonly jobRoleId: string;
}

/** Next Id: 3 */
export interface JoinUserJobRoleResponse {
  $type: "join.JoinUserJobRoleResponse";
  readonly jobRole: JobRole | undefined;
  readonly user: User | undefined;
}

function createBaseJoinUserJobRoleRequest(): JoinUserJobRoleRequest {
  return { $type: "join.JoinUserJobRoleRequest", userId: "", jobRoleId: "" };
}

export const JoinUserJobRoleRequest = {
  $type: "join.JoinUserJobRoleRequest" as const,

  fromJSON(object: any): JoinUserJobRoleRequest {
    return {
      $type: JoinUserJobRoleRequest.$type,
      userId: isSet(object.userId) ? String(object.userId) : "",
      jobRoleId: isSet(object.jobRoleId) ? String(object.jobRoleId) : "",
    };
  },

  toJSON(message: JoinUserJobRoleRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.jobRoleId !== undefined && (obj.jobRoleId = message.jobRoleId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinUserJobRoleRequest>, I>>(object: I): JoinUserJobRoleRequest {
    const message = createBaseJoinUserJobRoleRequest() as any;
    message.userId = object.userId ?? "";
    message.jobRoleId = object.jobRoleId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinUserJobRoleRequest.$type, JoinUserJobRoleRequest);

function createBaseJoinUserJobRoleResponse(): JoinUserJobRoleResponse {
  return { $type: "join.JoinUserJobRoleResponse", jobRole: undefined, user: undefined };
}

export const JoinUserJobRoleResponse = {
  $type: "join.JoinUserJobRoleResponse" as const,

  fromJSON(object: any): JoinUserJobRoleResponse {
    return {
      $type: JoinUserJobRoleResponse.$type,
      jobRole: isSet(object.jobRole) ? JobRole.fromJSON(object.jobRole) : undefined,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: JoinUserJobRoleResponse): unknown {
    const obj: any = {};
    message.jobRole !== undefined && (obj.jobRole = message.jobRole ? JobRole.toJSON(message.jobRole) : undefined);
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinUserJobRoleResponse>, I>>(object: I): JoinUserJobRoleResponse {
    const message = createBaseJoinUserJobRoleResponse() as any;
    message.jobRole = (object.jobRole !== undefined && object.jobRole !== null)
      ? JobRole.fromPartial(object.jobRole)
      : undefined;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinUserJobRoleResponse.$type, JoinUserJobRoleResponse);

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
