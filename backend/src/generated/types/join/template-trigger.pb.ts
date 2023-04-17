/* eslint-disable */
import { Template } from "../operation/template/template.pb";
import { Trigger } from "../operation/trigger/trigger.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinTemplateTriggerRequest {
  $type: "join.JoinTemplateTriggerRequest";
  readonly templateId: string;
  readonly triggerId: string;
}

/** Next Id: 3 */
export interface JoinTemplateTriggerResponse {
  $type: "join.JoinTemplateTriggerResponse";
  readonly template: Template | undefined;
  readonly trigger: Trigger | undefined;
}

function createBaseJoinTemplateTriggerRequest(): JoinTemplateTriggerRequest {
  return { $type: "join.JoinTemplateTriggerRequest", templateId: "", triggerId: "" };
}

export const JoinTemplateTriggerRequest = {
  $type: "join.JoinTemplateTriggerRequest" as const,

  fromJSON(object: any): JoinTemplateTriggerRequest {
    return {
      $type: JoinTemplateTriggerRequest.$type,
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      triggerId: isSet(object.triggerId) ? String(object.triggerId) : "",
    };
  },

  toJSON(message: JoinTemplateTriggerRequest): unknown {
    const obj: any = {};
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.triggerId !== undefined && (obj.triggerId = message.triggerId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTemplateTriggerRequest>, I>>(object: I): JoinTemplateTriggerRequest {
    const message = createBaseJoinTemplateTriggerRequest() as any;
    message.templateId = object.templateId ?? "";
    message.triggerId = object.triggerId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinTemplateTriggerRequest.$type, JoinTemplateTriggerRequest);

function createBaseJoinTemplateTriggerResponse(): JoinTemplateTriggerResponse {
  return { $type: "join.JoinTemplateTriggerResponse", template: undefined, trigger: undefined };
}

export const JoinTemplateTriggerResponse = {
  $type: "join.JoinTemplateTriggerResponse" as const,

  fromJSON(object: any): JoinTemplateTriggerResponse {
    return {
      $type: JoinTemplateTriggerResponse.$type,
      template: isSet(object.template) ? Template.fromJSON(object.template) : undefined,
      trigger: isSet(object.trigger) ? Trigger.fromJSON(object.trigger) : undefined,
    };
  },

  toJSON(message: JoinTemplateTriggerResponse): unknown {
    const obj: any = {};
    message.template !== undefined && (obj.template = message.template ? Template.toJSON(message.template) : undefined);
    message.trigger !== undefined && (obj.trigger = message.trigger ? Trigger.toJSON(message.trigger) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTemplateTriggerResponse>, I>>(object: I): JoinTemplateTriggerResponse {
    const message = createBaseJoinTemplateTriggerResponse() as any;
    message.template = (object.template !== undefined && object.template !== null)
      ? Template.fromPartial(object.template)
      : undefined;
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? Trigger.fromPartial(object.trigger)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinTemplateTriggerResponse.$type, JoinTemplateTriggerResponse);

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
