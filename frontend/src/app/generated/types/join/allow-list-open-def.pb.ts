/* eslint-disable */
import { AllowList } from "../catalog/allow-list/allow-list.pb";
import { OpenDefinition } from "../catalog/open-definition/open-definition.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinAllowListOpenDefinitionRequest {
  $type: "join.JoinAllowListOpenDefinitionRequest";
  allowListId: string;
  openDefinitionId: string;
}

/** Next Id: 3 */
export interface JoinAllowListOpenDefinitionResponse {
  $type: "join.JoinAllowListOpenDefinitionResponse";
  allowList: AllowList | undefined;
  openDefinition: OpenDefinition | undefined;
}

function createBaseJoinAllowListOpenDefinitionRequest(): JoinAllowListOpenDefinitionRequest {
  return { $type: "join.JoinAllowListOpenDefinitionRequest", allowListId: "", openDefinitionId: "" };
}

export const JoinAllowListOpenDefinitionRequest = {
  $type: "join.JoinAllowListOpenDefinitionRequest" as const,

  fromJSON(object: any): JoinAllowListOpenDefinitionRequest {
    return {
      $type: JoinAllowListOpenDefinitionRequest.$type,
      allowListId: isSet(object.allowListId) ? String(object.allowListId) : "",
      openDefinitionId: isSet(object.openDefinitionId) ? String(object.openDefinitionId) : "",
    };
  },

  toJSON(message: JoinAllowListOpenDefinitionRequest): unknown {
    const obj: any = {};
    message.allowListId !== undefined && (obj.allowListId = message.allowListId);
    message.openDefinitionId !== undefined && (obj.openDefinitionId = message.openDefinitionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinAllowListOpenDefinitionRequest>, I>>(
    object: I,
  ): JoinAllowListOpenDefinitionRequest {
    const message = createBaseJoinAllowListOpenDefinitionRequest();
    message.allowListId = object.allowListId ?? "";
    message.openDefinitionId = object.openDefinitionId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinAllowListOpenDefinitionRequest.$type, JoinAllowListOpenDefinitionRequest);

function createBaseJoinAllowListOpenDefinitionResponse(): JoinAllowListOpenDefinitionResponse {
  return { $type: "join.JoinAllowListOpenDefinitionResponse", allowList: undefined, openDefinition: undefined };
}

export const JoinAllowListOpenDefinitionResponse = {
  $type: "join.JoinAllowListOpenDefinitionResponse" as const,

  fromJSON(object: any): JoinAllowListOpenDefinitionResponse {
    return {
      $type: JoinAllowListOpenDefinitionResponse.$type,
      allowList: isSet(object.allowList) ? AllowList.fromJSON(object.allowList) : undefined,
      openDefinition: isSet(object.openDefinition) ? OpenDefinition.fromJSON(object.openDefinition) : undefined,
    };
  },

  toJSON(message: JoinAllowListOpenDefinitionResponse): unknown {
    const obj: any = {};
    message.allowList !== undefined &&
      (obj.allowList = message.allowList ? AllowList.toJSON(message.allowList) : undefined);
    message.openDefinition !== undefined &&
      (obj.openDefinition = message.openDefinition ? OpenDefinition.toJSON(message.openDefinition) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinAllowListOpenDefinitionResponse>, I>>(
    object: I,
  ): JoinAllowListOpenDefinitionResponse {
    const message = createBaseJoinAllowListOpenDefinitionResponse();
    message.allowList = (object.allowList !== undefined && object.allowList !== null)
      ? AllowList.fromPartial(object.allowList)
      : undefined;
    message.openDefinition = (object.openDefinition !== undefined && object.openDefinition !== null)
      ? OpenDefinition.fromPartial(object.openDefinition)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinAllowListOpenDefinitionResponse.$type, JoinAllowListOpenDefinitionResponse);

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
