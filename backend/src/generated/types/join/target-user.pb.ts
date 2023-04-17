/* eslint-disable */
import { User } from "../account/user/user.pb";
import { Target } from "../operation/target/target.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinTargetUserRequest {
  $type: "join.JoinTargetUserRequest";
  readonly targetId: string;
  readonly userId: string;
}

/** Next Id: 3 */
export interface JoinTargetUserResponse {
  $type: "join.JoinTargetUserResponse";
  readonly target: Target | undefined;
  readonly user: User | undefined;
}

function createBaseJoinTargetUserRequest(): JoinTargetUserRequest {
  return { $type: "join.JoinTargetUserRequest", targetId: "", userId: "" };
}

export const JoinTargetUserRequest = {
  $type: "join.JoinTargetUserRequest" as const,

  fromJSON(object: any): JoinTargetUserRequest {
    return {
      $type: JoinTargetUserRequest.$type,
      targetId: isSet(object.targetId) ? String(object.targetId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(message: JoinTargetUserRequest): unknown {
    const obj: any = {};
    message.targetId !== undefined && (obj.targetId = message.targetId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTargetUserRequest>, I>>(object: I): JoinTargetUserRequest {
    const message = createBaseJoinTargetUserRequest() as any;
    message.targetId = object.targetId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinTargetUserRequest.$type, JoinTargetUserRequest);

function createBaseJoinTargetUserResponse(): JoinTargetUserResponse {
  return { $type: "join.JoinTargetUserResponse", target: undefined, user: undefined };
}

export const JoinTargetUserResponse = {
  $type: "join.JoinTargetUserResponse" as const,

  fromJSON(object: any): JoinTargetUserResponse {
    return {
      $type: JoinTargetUserResponse.$type,
      target: isSet(object.target) ? Target.fromJSON(object.target) : undefined,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: JoinTargetUserResponse): unknown {
    const obj: any = {};
    message.target !== undefined && (obj.target = message.target ? Target.toJSON(message.target) : undefined);
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTargetUserResponse>, I>>(object: I): JoinTargetUserResponse {
    const message = createBaseJoinTargetUserResponse() as any;
    message.target = (object.target !== undefined && object.target !== null)
      ? Target.fromPartial(object.target)
      : undefined;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinTargetUserResponse.$type, JoinTargetUserResponse);

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
