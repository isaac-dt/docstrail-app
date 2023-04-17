/* eslint-disable */
import { OpenDefinition } from "../../catalog/open-definition/open-definition.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { Package } from "./package.pb";

export const protobufPackage = "operation.package";

/** Next Id: 5 */
export interface WritePackageRequest {
  $type: "operation.package.WritePackageRequest";
  name: string | undefined;
  description: string | undefined;
  parent?: { $case: "clientId"; clientId: string } | { $case: "rootId"; rootId: string };
}

/** Next Id: 4 */
export interface GetPackageResponse {
  $type: "operation.package.GetPackageResponse";
  package: Package | undefined;
  openDefinitions: OpenDefinition[];
}

/** Next Id: 3 */
export interface ListPackagesResponse {
  $type: "operation.package.ListPackagesResponse";
  packages: Package[];
  matchCount: number;
}

function createBaseWritePackageRequest(): WritePackageRequest {
  return { $type: "operation.package.WritePackageRequest", name: undefined, description: undefined, parent: undefined };
}

export const WritePackageRequest = {
  $type: "operation.package.WritePackageRequest" as const,

  fromJSON(object: any): WritePackageRequest {
    return {
      $type: WritePackageRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      parent: isSet(object.clientId)
        ? { $case: "clientId", clientId: String(object.clientId) }
        : isSet(object.rootId)
        ? { $case: "rootId", rootId: String(object.rootId) }
        : undefined,
    };
  },

  toJSON(message: WritePackageRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.parent?.$case === "clientId" && (obj.clientId = message.parent?.clientId);
    message.parent?.$case === "rootId" && (obj.rootId = message.parent?.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WritePackageRequest>, I>>(object: I): WritePackageRequest {
    const message = createBaseWritePackageRequest();
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

messageTypeRegistry.set(WritePackageRequest.$type, WritePackageRequest);

function createBaseGetPackageResponse(): GetPackageResponse {
  return { $type: "operation.package.GetPackageResponse", package: undefined, openDefinitions: [] };
}

export const GetPackageResponse = {
  $type: "operation.package.GetPackageResponse" as const,

  fromJSON(object: any): GetPackageResponse {
    return {
      $type: GetPackageResponse.$type,
      package: isSet(object.package) ? Package.fromJSON(object.package) : undefined,
      openDefinitions: Array.isArray(object?.openDefinitions)
        ? object.openDefinitions.map((e: any) => OpenDefinition.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetPackageResponse): unknown {
    const obj: any = {};
    message.package !== undefined && (obj.package = message.package ? Package.toJSON(message.package) : undefined);
    if (message.openDefinitions) {
      obj.openDefinitions = message.openDefinitions.map((e) => e ? OpenDefinition.toJSON(e) : undefined);
    } else {
      obj.openDefinitions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPackageResponse>, I>>(object: I): GetPackageResponse {
    const message = createBaseGetPackageResponse();
    message.package = (object.package !== undefined && object.package !== null)
      ? Package.fromPartial(object.package)
      : undefined;
    message.openDefinitions = object.openDefinitions?.map((e) => OpenDefinition.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetPackageResponse.$type, GetPackageResponse);

function createBaseListPackagesResponse(): ListPackagesResponse {
  return { $type: "operation.package.ListPackagesResponse", packages: [], matchCount: 0 };
}

export const ListPackagesResponse = {
  $type: "operation.package.ListPackagesResponse" as const,

  fromJSON(object: any): ListPackagesResponse {
    return {
      $type: ListPackagesResponse.$type,
      packages: Array.isArray(object?.packages) ? object.packages.map((e: any) => Package.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListPackagesResponse): unknown {
    const obj: any = {};
    if (message.packages) {
      obj.packages = message.packages.map((e) => e ? Package.toJSON(e) : undefined);
    } else {
      obj.packages = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListPackagesResponse>, I>>(object: I): ListPackagesResponse {
    const message = createBaseListPackagesResponse();
    message.packages = object.packages?.map((e) => Package.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListPackagesResponse.$type, ListPackagesResponse);

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
