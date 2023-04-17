/* eslint-disable */
import { JobRole } from "../account/job-role/job-role.pb";
import { Target } from "../operation/target/target.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinTargetJobRoleRequest {
  $type: "join.JoinTargetJobRoleRequest";
  readonly targetId: string;
  readonly jobRoleId: string;
}

/** Next Id: 3 */
export interface JoinTargetJobRoleResponse {
  $type: "join.JoinTargetJobRoleResponse";
  readonly target: Target | undefined;
  readonly jobRole: JobRole | undefined;
}

function createBaseJoinTargetJobRoleRequest(): JoinTargetJobRoleRequest {
  return { $type: "join.JoinTargetJobRoleRequest", targetId: "", jobRoleId: "" };
}

export const JoinTargetJobRoleRequest = {
  $type: "join.JoinTargetJobRoleRequest" as const,

  fromJSON(object: any): JoinTargetJobRoleRequest {
    return {
      $type: JoinTargetJobRoleRequest.$type,
      targetId: isSet(object.targetId) ? String(object.targetId) : "",
      jobRoleId: isSet(object.jobRoleId) ? String(object.jobRoleId) : "",
    };
  },

  toJSON(message: JoinTargetJobRoleRequest): unknown {
    const obj: any = {};
    message.targetId !== undefined && (obj.targetId = message.targetId);
    message.jobRoleId !== undefined && (obj.jobRoleId = message.jobRoleId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTargetJobRoleRequest>, I>>(object: I): JoinTargetJobRoleRequest {
    const message = createBaseJoinTargetJobRoleRequest() as any;
    message.targetId = object.targetId ?? "";
    message.jobRoleId = object.jobRoleId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinTargetJobRoleRequest.$type, JoinTargetJobRoleRequest);

function createBaseJoinTargetJobRoleResponse(): JoinTargetJobRoleResponse {
  return { $type: "join.JoinTargetJobRoleResponse", target: undefined, jobRole: undefined };
}

export const JoinTargetJobRoleResponse = {
  $type: "join.JoinTargetJobRoleResponse" as const,

  fromJSON(object: any): JoinTargetJobRoleResponse {
    return {
      $type: JoinTargetJobRoleResponse.$type,
      target: isSet(object.target) ? Target.fromJSON(object.target) : undefined,
      jobRole: isSet(object.jobRole) ? JobRole.fromJSON(object.jobRole) : undefined,
    };
  },

  toJSON(message: JoinTargetJobRoleResponse): unknown {
    const obj: any = {};
    message.target !== undefined && (obj.target = message.target ? Target.toJSON(message.target) : undefined);
    message.jobRole !== undefined && (obj.jobRole = message.jobRole ? JobRole.toJSON(message.jobRole) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTargetJobRoleResponse>, I>>(object: I): JoinTargetJobRoleResponse {
    const message = createBaseJoinTargetJobRoleResponse() as any;
    message.target = (object.target !== undefined && object.target !== null)
      ? Target.fromPartial(object.target)
      : undefined;
    message.jobRole = (object.jobRole !== undefined && object.jobRole !== null)
      ? JobRole.fromPartial(object.jobRole)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinTargetJobRoleResponse.$type, JoinTargetJobRoleResponse);

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
