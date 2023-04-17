/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { CoreDefinition } from "../core-definition/core-definition.pb";
import { OpenDefinition } from "./open-definition.pb";

export const protobufPackage = "catalog.open_definition";

/** Next Id: 8 */
export interface WriteOpenDefinitionRequest {
  $type: "catalog.open_definition.WriteOpenDefinitionRequest";
  name: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  parent?: { $case: "clientId"; clientId: string } | { $case: "rootId"; rootId: string };
  coreDefinitionId: string | undefined;
  isTangible: boolean | undefined;
}

/** Next Id: 3 */
export interface GetOpenDefinitionResponse {
  $type: "catalog.open_definition.GetOpenDefinitionResponse";
  openDefinition: OpenDefinition | undefined;
  coreDefinition: CoreDefinition | undefined;
}

/** Next Id: 3 */
export interface ListOpenDefinitionResponse {
  $type: "catalog.open_definition.ListOpenDefinitionResponse";
  openDefinitions: OpenDefinition[];
  matchCount: number;
}

function createBaseWriteOpenDefinitionRequest(): WriteOpenDefinitionRequest {
  return {
    $type: "catalog.open_definition.WriteOpenDefinitionRequest",
    name: undefined,
    description: undefined,
    imageUrl: undefined,
    parent: undefined,
    coreDefinitionId: undefined,
    isTangible: undefined,
  };
}

export const WriteOpenDefinitionRequest = {
  $type: "catalog.open_definition.WriteOpenDefinitionRequest" as const,

  fromJSON(object: any): WriteOpenDefinitionRequest {
    return {
      $type: WriteOpenDefinitionRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      imageUrl: isSet(object.imageUrl) ? String(object.imageUrl) : undefined,
      parent: isSet(object.clientId)
        ? { $case: "clientId", clientId: String(object.clientId) }
        : isSet(object.rootId)
        ? { $case: "rootId", rootId: String(object.rootId) }
        : undefined,
      coreDefinitionId: isSet(object.coreDefinitionId) ? String(object.coreDefinitionId) : undefined,
      isTangible: isSet(object.isTangible) ? Boolean(object.isTangible) : undefined,
    };
  },

  toJSON(message: WriteOpenDefinitionRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.imageUrl !== undefined && (obj.imageUrl = message.imageUrl);
    message.parent?.$case === "clientId" && (obj.clientId = message.parent?.clientId);
    message.parent?.$case === "rootId" && (obj.rootId = message.parent?.rootId);
    message.coreDefinitionId !== undefined && (obj.coreDefinitionId = message.coreDefinitionId);
    message.isTangible !== undefined && (obj.isTangible = message.isTangible);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteOpenDefinitionRequest>, I>>(object: I): WriteOpenDefinitionRequest {
    const message = createBaseWriteOpenDefinitionRequest();
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.imageUrl = object.imageUrl ?? undefined;
    if (
      object.parent?.$case === "clientId" && object.parent?.clientId !== undefined && object.parent?.clientId !== null
    ) {
      message.parent = { $case: "clientId", clientId: object.parent.clientId };
    }
    if (object.parent?.$case === "rootId" && object.parent?.rootId !== undefined && object.parent?.rootId !== null) {
      message.parent = { $case: "rootId", rootId: object.parent.rootId };
    }
    message.coreDefinitionId = object.coreDefinitionId ?? undefined;
    message.isTangible = object.isTangible ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteOpenDefinitionRequest.$type, WriteOpenDefinitionRequest);

function createBaseGetOpenDefinitionResponse(): GetOpenDefinitionResponse {
  return {
    $type: "catalog.open_definition.GetOpenDefinitionResponse",
    openDefinition: undefined,
    coreDefinition: undefined,
  };
}

export const GetOpenDefinitionResponse = {
  $type: "catalog.open_definition.GetOpenDefinitionResponse" as const,

  fromJSON(object: any): GetOpenDefinitionResponse {
    return {
      $type: GetOpenDefinitionResponse.$type,
      openDefinition: isSet(object.openDefinition) ? OpenDefinition.fromJSON(object.openDefinition) : undefined,
      coreDefinition: isSet(object.coreDefinition) ? CoreDefinition.fromJSON(object.coreDefinition) : undefined,
    };
  },

  toJSON(message: GetOpenDefinitionResponse): unknown {
    const obj: any = {};
    message.openDefinition !== undefined &&
      (obj.openDefinition = message.openDefinition ? OpenDefinition.toJSON(message.openDefinition) : undefined);
    message.coreDefinition !== undefined &&
      (obj.coreDefinition = message.coreDefinition ? CoreDefinition.toJSON(message.coreDefinition) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOpenDefinitionResponse>, I>>(object: I): GetOpenDefinitionResponse {
    const message = createBaseGetOpenDefinitionResponse();
    message.openDefinition = (object.openDefinition !== undefined && object.openDefinition !== null)
      ? OpenDefinition.fromPartial(object.openDefinition)
      : undefined;
    message.coreDefinition = (object.coreDefinition !== undefined && object.coreDefinition !== null)
      ? CoreDefinition.fromPartial(object.coreDefinition)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetOpenDefinitionResponse.$type, GetOpenDefinitionResponse);

function createBaseListOpenDefinitionResponse(): ListOpenDefinitionResponse {
  return { $type: "catalog.open_definition.ListOpenDefinitionResponse", openDefinitions: [], matchCount: 0 };
}

export const ListOpenDefinitionResponse = {
  $type: "catalog.open_definition.ListOpenDefinitionResponse" as const,

  fromJSON(object: any): ListOpenDefinitionResponse {
    return {
      $type: ListOpenDefinitionResponse.$type,
      openDefinitions: Array.isArray(object?.openDefinitions)
        ? object.openDefinitions.map((e: any) => OpenDefinition.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListOpenDefinitionResponse): unknown {
    const obj: any = {};
    if (message.openDefinitions) {
      obj.openDefinitions = message.openDefinitions.map((e) => e ? OpenDefinition.toJSON(e) : undefined);
    } else {
      obj.openDefinitions = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListOpenDefinitionResponse>, I>>(object: I): ListOpenDefinitionResponse {
    const message = createBaseListOpenDefinitionResponse();
    message.openDefinitions = object.openDefinitions?.map((e) => OpenDefinition.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListOpenDefinitionResponse.$type, ListOpenDefinitionResponse);

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
