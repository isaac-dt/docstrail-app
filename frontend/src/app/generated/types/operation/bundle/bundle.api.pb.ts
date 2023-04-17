/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { Template } from "../template/template.pb";
import { Bundle } from "./bundle.pb";

export const protobufPackage = "operation.bundle";

/** Next Id: 5 */
export interface WriteBundleRequest {
  $type: "operation.bundle.WriteBundleRequest";
  name: string | undefined;
  description: string | undefined;
  parent?: { $case: "clientId"; clientId: string } | { $case: "rootId"; rootId: string };
}

/** Next Id: 3 */
export interface GetBundleResponse {
  $type: "operation.bundle.GetBundleResponse";
  bundle: Bundle | undefined;
  templates: Template[];
}

/** Next Id: 3 */
export interface ListBundleResponse {
  $type: "operation.bundle.ListBundleResponse";
  bundles: Bundle[];
  matchCount: number;
}

function createBaseWriteBundleRequest(): WriteBundleRequest {
  return { $type: "operation.bundle.WriteBundleRequest", name: undefined, description: undefined, parent: undefined };
}

export const WriteBundleRequest = {
  $type: "operation.bundle.WriteBundleRequest" as const,

  fromJSON(object: any): WriteBundleRequest {
    return {
      $type: WriteBundleRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      parent: isSet(object.clientId)
        ? { $case: "clientId", clientId: String(object.clientId) }
        : isSet(object.rootId)
        ? { $case: "rootId", rootId: String(object.rootId) }
        : undefined,
    };
  },

  toJSON(message: WriteBundleRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.parent?.$case === "clientId" && (obj.clientId = message.parent?.clientId);
    message.parent?.$case === "rootId" && (obj.rootId = message.parent?.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteBundleRequest>, I>>(object: I): WriteBundleRequest {
    const message = createBaseWriteBundleRequest();
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    if (
      object.parent?.$case === "clientId" && object.parent?.clientId !== undefined && object.parent?.clientId !== null
    ) {
      message.parent = { $case: "clientId", clientId: object.parent.clientId };
    }
    if (object.parent?.$case === "rootId" && object.parent?.rootId !== undefined && object.parent?.rootId !== null) {
      message.parent = { $case: "rootId", rootId: object.parent.rootId };
    }
    return message;
  },
};

messageTypeRegistry.set(WriteBundleRequest.$type, WriteBundleRequest);

function createBaseGetBundleResponse(): GetBundleResponse {
  return { $type: "operation.bundle.GetBundleResponse", bundle: undefined, templates: [] };
}

export const GetBundleResponse = {
  $type: "operation.bundle.GetBundleResponse" as const,

  fromJSON(object: any): GetBundleResponse {
    return {
      $type: GetBundleResponse.$type,
      bundle: isSet(object.bundle) ? Bundle.fromJSON(object.bundle) : undefined,
      templates: Array.isArray(object?.templates) ? object.templates.map((e: any) => Template.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetBundleResponse): unknown {
    const obj: any = {};
    message.bundle !== undefined && (obj.bundle = message.bundle ? Bundle.toJSON(message.bundle) : undefined);
    if (message.templates) {
      obj.templates = message.templates.map((e) => e ? Template.toJSON(e) : undefined);
    } else {
      obj.templates = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBundleResponse>, I>>(object: I): GetBundleResponse {
    const message = createBaseGetBundleResponse();
    message.bundle = (object.bundle !== undefined && object.bundle !== null)
      ? Bundle.fromPartial(object.bundle)
      : undefined;
    message.templates = object.templates?.map((e) => Template.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetBundleResponse.$type, GetBundleResponse);

function createBaseListBundleResponse(): ListBundleResponse {
  return { $type: "operation.bundle.ListBundleResponse", bundles: [], matchCount: 0 };
}

export const ListBundleResponse = {
  $type: "operation.bundle.ListBundleResponse" as const,

  fromJSON(object: any): ListBundleResponse {
    return {
      $type: ListBundleResponse.$type,
      bundles: Array.isArray(object?.bundles) ? object.bundles.map((e: any) => Bundle.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListBundleResponse): unknown {
    const obj: any = {};
    if (message.bundles) {
      obj.bundles = message.bundles.map((e) => e ? Bundle.toJSON(e) : undefined);
    } else {
      obj.bundles = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListBundleResponse>, I>>(object: I): ListBundleResponse {
    const message = createBaseListBundleResponse();
    message.bundles = object.bundles?.map((e) => Bundle.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListBundleResponse.$type, ListBundleResponse);

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
