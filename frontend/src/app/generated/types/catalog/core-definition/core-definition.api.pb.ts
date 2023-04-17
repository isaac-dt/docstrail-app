/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { DistributionOutlet } from "../distribution/distribution.pb";
import {
  CoreDefinition,
  CoreDefinitionCategory,
  coreDefinitionCategoryFromJSON,
  coreDefinitionCategoryToJSON,
} from "./core-definition.pb";

export const protobufPackage = "catalog.core_definition";

/** Next Id: 5 */
export interface WriteCoreDefinitionRequest {
  $type: "catalog.core_definition.WriteCoreDefinitionRequest";
  name: string | undefined;
  description: string | undefined;
  category: CoreDefinitionCategory;
  rootId: string | undefined;
}

/** Next Id: 3 */
export interface GetCoreDefinitionResponse {
  $type: "catalog.core_definition.GetCoreDefinitionResponse";
  coreDefinition: CoreDefinition | undefined;
  distributionOutlets: DistributionOutlet[];
}

/** Next Id: 3 */
export interface ListCoreDefinitionResponse {
  $type: "catalog.core_definition.ListCoreDefinitionResponse";
  coreDefinitions: CoreDefinition[];
  matchCount: number;
}

function createBaseWriteCoreDefinitionRequest(): WriteCoreDefinitionRequest {
  return {
    $type: "catalog.core_definition.WriteCoreDefinitionRequest",
    name: undefined,
    description: undefined,
    category: CoreDefinitionCategory.OFFICE,
    rootId: undefined,
  };
}

export const WriteCoreDefinitionRequest = {
  $type: "catalog.core_definition.WriteCoreDefinitionRequest" as const,

  fromJSON(object: any): WriteCoreDefinitionRequest {
    return {
      $type: WriteCoreDefinitionRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      category: isSet(object.category)
        ? coreDefinitionCategoryFromJSON(object.category)
        : CoreDefinitionCategory.OFFICE,
      rootId: isSet(object.rootId) ? String(object.rootId) : undefined,
    };
  },

  toJSON(message: WriteCoreDefinitionRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.category !== undefined && (obj.category = coreDefinitionCategoryToJSON(message.category));
    message.rootId !== undefined && (obj.rootId = message.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteCoreDefinitionRequest>, I>>(object: I): WriteCoreDefinitionRequest {
    const message = createBaseWriteCoreDefinitionRequest();
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.category = object.category ?? CoreDefinitionCategory.OFFICE;
    message.rootId = object.rootId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteCoreDefinitionRequest.$type, WriteCoreDefinitionRequest);

function createBaseGetCoreDefinitionResponse(): GetCoreDefinitionResponse {
  return {
    $type: "catalog.core_definition.GetCoreDefinitionResponse",
    coreDefinition: undefined,
    distributionOutlets: [],
  };
}

export const GetCoreDefinitionResponse = {
  $type: "catalog.core_definition.GetCoreDefinitionResponse" as const,

  fromJSON(object: any): GetCoreDefinitionResponse {
    return {
      $type: GetCoreDefinitionResponse.$type,
      coreDefinition: isSet(object.coreDefinition) ? CoreDefinition.fromJSON(object.coreDefinition) : undefined,
      distributionOutlets: Array.isArray(object?.distributionOutlets)
        ? object.distributionOutlets.map((e: any) => DistributionOutlet.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetCoreDefinitionResponse): unknown {
    const obj: any = {};
    message.coreDefinition !== undefined &&
      (obj.coreDefinition = message.coreDefinition ? CoreDefinition.toJSON(message.coreDefinition) : undefined);
    if (message.distributionOutlets) {
      obj.distributionOutlets = message.distributionOutlets.map((e) => e ? DistributionOutlet.toJSON(e) : undefined);
    } else {
      obj.distributionOutlets = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCoreDefinitionResponse>, I>>(object: I): GetCoreDefinitionResponse {
    const message = createBaseGetCoreDefinitionResponse();
    message.coreDefinition = (object.coreDefinition !== undefined && object.coreDefinition !== null)
      ? CoreDefinition.fromPartial(object.coreDefinition)
      : undefined;
    message.distributionOutlets = object.distributionOutlets?.map((e) => DistributionOutlet.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetCoreDefinitionResponse.$type, GetCoreDefinitionResponse);

function createBaseListCoreDefinitionResponse(): ListCoreDefinitionResponse {
  return { $type: "catalog.core_definition.ListCoreDefinitionResponse", coreDefinitions: [], matchCount: 0 };
}

export const ListCoreDefinitionResponse = {
  $type: "catalog.core_definition.ListCoreDefinitionResponse" as const,

  fromJSON(object: any): ListCoreDefinitionResponse {
    return {
      $type: ListCoreDefinitionResponse.$type,
      coreDefinitions: Array.isArray(object?.coreDefinitions)
        ? object.coreDefinitions.map((e: any) => CoreDefinition.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListCoreDefinitionResponse): unknown {
    const obj: any = {};
    if (message.coreDefinitions) {
      obj.coreDefinitions = message.coreDefinitions.map((e) => e ? CoreDefinition.toJSON(e) : undefined);
    } else {
      obj.coreDefinitions = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCoreDefinitionResponse>, I>>(object: I): ListCoreDefinitionResponse {
    const message = createBaseListCoreDefinitionResponse();
    message.coreDefinitions = object.coreDefinitions?.map((e) => CoreDefinition.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListCoreDefinitionResponse.$type, ListCoreDefinitionResponse);

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
