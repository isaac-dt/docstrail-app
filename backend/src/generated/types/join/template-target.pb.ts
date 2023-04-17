/* eslint-disable */
import { Target } from "../operation/target/target.pb";
import { Template } from "../operation/template/template.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinTemplateTargetRequest {
  $type: "join.JoinTemplateTargetRequest";
  readonly templateId: string;
  readonly targetId: string;
}

/** Next Id: 3 */
export interface JoinTemplateTargetResponse {
  $type: "join.JoinTemplateTargetResponse";
  readonly template: Template | undefined;
  readonly target: Target | undefined;
}

function createBaseJoinTemplateTargetRequest(): JoinTemplateTargetRequest {
  return { $type: "join.JoinTemplateTargetRequest", templateId: "", targetId: "" };
}

export const JoinTemplateTargetRequest = {
  $type: "join.JoinTemplateTargetRequest" as const,

  fromJSON(object: any): JoinTemplateTargetRequest {
    return {
      $type: JoinTemplateTargetRequest.$type,
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      targetId: isSet(object.targetId) ? String(object.targetId) : "",
    };
  },

  toJSON(message: JoinTemplateTargetRequest): unknown {
    const obj: any = {};
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.targetId !== undefined && (obj.targetId = message.targetId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTemplateTargetRequest>, I>>(object: I): JoinTemplateTargetRequest {
    const message = createBaseJoinTemplateTargetRequest() as any;
    message.templateId = object.templateId ?? "";
    message.targetId = object.targetId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinTemplateTargetRequest.$type, JoinTemplateTargetRequest);

function createBaseJoinTemplateTargetResponse(): JoinTemplateTargetResponse {
  return { $type: "join.JoinTemplateTargetResponse", template: undefined, target: undefined };
}

export const JoinTemplateTargetResponse = {
  $type: "join.JoinTemplateTargetResponse" as const,

  fromJSON(object: any): JoinTemplateTargetResponse {
    return {
      $type: JoinTemplateTargetResponse.$type,
      template: isSet(object.template) ? Template.fromJSON(object.template) : undefined,
      target: isSet(object.target) ? Target.fromJSON(object.target) : undefined,
    };
  },

  toJSON(message: JoinTemplateTargetResponse): unknown {
    const obj: any = {};
    message.template !== undefined && (obj.template = message.template ? Template.toJSON(message.template) : undefined);
    message.target !== undefined && (obj.target = message.target ? Target.toJSON(message.target) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTemplateTargetResponse>, I>>(object: I): JoinTemplateTargetResponse {
    const message = createBaseJoinTemplateTargetResponse() as any;
    message.template = (object.template !== undefined && object.template !== null)
      ? Template.fromPartial(object.template)
      : undefined;
    message.target = (object.target !== undefined && object.target !== null)
      ? Target.fromPartial(object.target)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinTemplateTargetResponse.$type, JoinTemplateTargetResponse);

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
