/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { Bundle } from "../bundle/bundle.pb";
import { Package } from "../package/package.pb";
import { Target } from "../target/target.pb";
import { Trigger } from "../trigger/trigger.pb";
import { Template } from "./template.pb";

export const protobufPackage = "operation.template";

/** Next Id: 5 */
export interface WriteTemplateRequest {
  $type: "operation.template.WriteTemplateRequest";
  name: string | undefined;
  description: string | undefined;
  bundleId: string | undefined;
}

/** Next Id: 6 */
export interface GetTemplateResponse {
  $type: "operation.template.GetTemplateResponse";
  template: Template | undefined;
  bundle: Bundle | undefined;
  packages: Package[];
  triggers: Trigger[];
  targets: Target[];
}

/** Next Id: 3 */
export interface ListTemplateResponse {
  $type: "operation.template.ListTemplateResponse";
  templates: Template[];
  matchCount: number;
}

function createBaseWriteTemplateRequest(): WriteTemplateRequest {
  return {
    $type: "operation.template.WriteTemplateRequest",
    name: undefined,
    description: undefined,
    bundleId: undefined,
  };
}

export const WriteTemplateRequest = {
  $type: "operation.template.WriteTemplateRequest" as const,

  fromJSON(object: any): WriteTemplateRequest {
    return {
      $type: WriteTemplateRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      bundleId: isSet(object.bundleId) ? String(object.bundleId) : undefined,
    };
  },

  toJSON(message: WriteTemplateRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.bundleId !== undefined && (obj.bundleId = message.bundleId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteTemplateRequest>, I>>(object: I): WriteTemplateRequest {
    const message = createBaseWriteTemplateRequest();
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.bundleId = object.bundleId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteTemplateRequest.$type, WriteTemplateRequest);

function createBaseGetTemplateResponse(): GetTemplateResponse {
  return {
    $type: "operation.template.GetTemplateResponse",
    template: undefined,
    bundle: undefined,
    packages: [],
    triggers: [],
    targets: [],
  };
}

export const GetTemplateResponse = {
  $type: "operation.template.GetTemplateResponse" as const,

  fromJSON(object: any): GetTemplateResponse {
    return {
      $type: GetTemplateResponse.$type,
      template: isSet(object.template) ? Template.fromJSON(object.template) : undefined,
      bundle: isSet(object.bundle) ? Bundle.fromJSON(object.bundle) : undefined,
      packages: Array.isArray(object?.packages) ? object.packages.map((e: any) => Package.fromJSON(e)) : [],
      triggers: Array.isArray(object?.triggers) ? object.triggers.map((e: any) => Trigger.fromJSON(e)) : [],
      targets: Array.isArray(object?.targets) ? object.targets.map((e: any) => Target.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetTemplateResponse): unknown {
    const obj: any = {};
    message.template !== undefined && (obj.template = message.template ? Template.toJSON(message.template) : undefined);
    message.bundle !== undefined && (obj.bundle = message.bundle ? Bundle.toJSON(message.bundle) : undefined);
    if (message.packages) {
      obj.packages = message.packages.map((e) => e ? Package.toJSON(e) : undefined);
    } else {
      obj.packages = [];
    }
    if (message.triggers) {
      obj.triggers = message.triggers.map((e) => e ? Trigger.toJSON(e) : undefined);
    } else {
      obj.triggers = [];
    }
    if (message.targets) {
      obj.targets = message.targets.map((e) => e ? Target.toJSON(e) : undefined);
    } else {
      obj.targets = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTemplateResponse>, I>>(object: I): GetTemplateResponse {
    const message = createBaseGetTemplateResponse();
    message.template = (object.template !== undefined && object.template !== null)
      ? Template.fromPartial(object.template)
      : undefined;
    message.bundle = (object.bundle !== undefined && object.bundle !== null)
      ? Bundle.fromPartial(object.bundle)
      : undefined;
    message.packages = object.packages?.map((e) => Package.fromPartial(e)) || [];
    message.triggers = object.triggers?.map((e) => Trigger.fromPartial(e)) || [];
    message.targets = object.targets?.map((e) => Target.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetTemplateResponse.$type, GetTemplateResponse);

function createBaseListTemplateResponse(): ListTemplateResponse {
  return { $type: "operation.template.ListTemplateResponse", templates: [], matchCount: 0 };
}

export const ListTemplateResponse = {
  $type: "operation.template.ListTemplateResponse" as const,

  fromJSON(object: any): ListTemplateResponse {
    return {
      $type: ListTemplateResponse.$type,
      templates: Array.isArray(object?.templates) ? object.templates.map((e: any) => Template.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListTemplateResponse): unknown {
    const obj: any = {};
    if (message.templates) {
      obj.templates = message.templates.map((e) => e ? Template.toJSON(e) : undefined);
    } else {
      obj.templates = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListTemplateResponse>, I>>(object: I): ListTemplateResponse {
    const message = createBaseListTemplateResponse();
    message.templates = object.templates?.map((e) => Template.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListTemplateResponse.$type, ListTemplateResponse);

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
