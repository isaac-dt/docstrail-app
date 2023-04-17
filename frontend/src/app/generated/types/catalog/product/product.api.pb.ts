/* eslint-disable */
import { Price } from "../../shared.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { CoreDefinition } from "../core-definition/core-definition.pb";
import { DistributionOutlet } from "../distribution/distribution.pb";
import { InventoryBatch } from "../inventory/batch.pb";
import { OpenDefinition } from "../open-definition/open-definition.pb";
import { Product } from "./product.pb";

export const protobufPackage = "catalog.product";

/** Next Id: 8 */
export interface WriteProductRequest {
  $type: "catalog.product.WriteProductRequest";
  name: string | undefined;
  description: string | undefined;
  webLink: string | undefined;
  imageUrl: string | undefined;
  distributionOutletId: string | undefined;
  openDefinitionId: string | undefined;
  price: Price | undefined;
}

/** Next Id: 5 */
export interface GetProductResponse {
  $type: "catalog.product.GetProductResponse";
  product: Product | undefined;
  openDefinition: OpenDefinition | undefined;
  coreDefinition: CoreDefinition | undefined;
  distributionOutlet: DistributionOutlet | undefined;
  inventoryBatches: InventoryBatch[];
}

/** Next Id: 3 */
export interface ListProductResponse {
  $type: "catalog.product.ListProductResponse";
  products: Product | undefined;
  matchCount: number;
}

function createBaseWriteProductRequest(): WriteProductRequest {
  return {
    $type: "catalog.product.WriteProductRequest",
    name: undefined,
    description: undefined,
    webLink: undefined,
    imageUrl: undefined,
    distributionOutletId: undefined,
    openDefinitionId: undefined,
    price: undefined,
  };
}

export const WriteProductRequest = {
  $type: "catalog.product.WriteProductRequest" as const,

  fromJSON(object: any): WriteProductRequest {
    return {
      $type: WriteProductRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      webLink: isSet(object.webLink) ? String(object.webLink) : undefined,
      imageUrl: isSet(object.imageUrl) ? String(object.imageUrl) : undefined,
      distributionOutletId: isSet(object.distributionOutletId) ? String(object.distributionOutletId) : undefined,
      openDefinitionId: isSet(object.openDefinitionId) ? String(object.openDefinitionId) : undefined,
      price: isSet(object.price) ? Price.fromJSON(object.price) : undefined,
    };
  },

  toJSON(message: WriteProductRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.webLink !== undefined && (obj.webLink = message.webLink);
    message.imageUrl !== undefined && (obj.imageUrl = message.imageUrl);
    message.distributionOutletId !== undefined && (obj.distributionOutletId = message.distributionOutletId);
    message.openDefinitionId !== undefined && (obj.openDefinitionId = message.openDefinitionId);
    message.price !== undefined && (obj.price = message.price ? Price.toJSON(message.price) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteProductRequest>, I>>(object: I): WriteProductRequest {
    const message = createBaseWriteProductRequest();
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.webLink = object.webLink ?? undefined;
    message.imageUrl = object.imageUrl ?? undefined;
    message.distributionOutletId = object.distributionOutletId ?? undefined;
    message.openDefinitionId = object.openDefinitionId ?? undefined;
    message.price = (object.price !== undefined && object.price !== null) ? Price.fromPartial(object.price) : undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteProductRequest.$type, WriteProductRequest);

function createBaseGetProductResponse(): GetProductResponse {
  return {
    $type: "catalog.product.GetProductResponse",
    product: undefined,
    openDefinition: undefined,
    coreDefinition: undefined,
    distributionOutlet: undefined,
    inventoryBatches: [],
  };
}

export const GetProductResponse = {
  $type: "catalog.product.GetProductResponse" as const,

  fromJSON(object: any): GetProductResponse {
    return {
      $type: GetProductResponse.$type,
      product: isSet(object.product) ? Product.fromJSON(object.product) : undefined,
      openDefinition: isSet(object.openDefinition) ? OpenDefinition.fromJSON(object.openDefinition) : undefined,
      coreDefinition: isSet(object.coreDefinition) ? CoreDefinition.fromJSON(object.coreDefinition) : undefined,
      distributionOutlet: isSet(object.distributionOutlet)
        ? DistributionOutlet.fromJSON(object.distributionOutlet)
        : undefined,
      inventoryBatches: Array.isArray(object?.inventoryBatches)
        ? object.inventoryBatches.map((e: any) => InventoryBatch.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetProductResponse): unknown {
    const obj: any = {};
    message.product !== undefined && (obj.product = message.product ? Product.toJSON(message.product) : undefined);
    message.openDefinition !== undefined &&
      (obj.openDefinition = message.openDefinition ? OpenDefinition.toJSON(message.openDefinition) : undefined);
    message.coreDefinition !== undefined &&
      (obj.coreDefinition = message.coreDefinition ? CoreDefinition.toJSON(message.coreDefinition) : undefined);
    message.distributionOutlet !== undefined && (obj.distributionOutlet = message.distributionOutlet
      ? DistributionOutlet.toJSON(message.distributionOutlet)
      : undefined);
    if (message.inventoryBatches) {
      obj.inventoryBatches = message.inventoryBatches.map((e) => e ? InventoryBatch.toJSON(e) : undefined);
    } else {
      obj.inventoryBatches = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProductResponse>, I>>(object: I): GetProductResponse {
    const message = createBaseGetProductResponse();
    message.product = (object.product !== undefined && object.product !== null)
      ? Product.fromPartial(object.product)
      : undefined;
    message.openDefinition = (object.openDefinition !== undefined && object.openDefinition !== null)
      ? OpenDefinition.fromPartial(object.openDefinition)
      : undefined;
    message.coreDefinition = (object.coreDefinition !== undefined && object.coreDefinition !== null)
      ? CoreDefinition.fromPartial(object.coreDefinition)
      : undefined;
    message.distributionOutlet = (object.distributionOutlet !== undefined && object.distributionOutlet !== null)
      ? DistributionOutlet.fromPartial(object.distributionOutlet)
      : undefined;
    message.inventoryBatches = object.inventoryBatches?.map((e) => InventoryBatch.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetProductResponse.$type, GetProductResponse);

function createBaseListProductResponse(): ListProductResponse {
  return { $type: "catalog.product.ListProductResponse", products: undefined, matchCount: 0 };
}

export const ListProductResponse = {
  $type: "catalog.product.ListProductResponse" as const,

  fromJSON(object: any): ListProductResponse {
    return {
      $type: ListProductResponse.$type,
      products: isSet(object.products) ? Product.fromJSON(object.products) : undefined,
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListProductResponse): unknown {
    const obj: any = {};
    message.products !== undefined && (obj.products = message.products ? Product.toJSON(message.products) : undefined);
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListProductResponse>, I>>(object: I): ListProductResponse {
    const message = createBaseListProductResponse();
    message.products = (object.products !== undefined && object.products !== null)
      ? Product.fromPartial(object.products)
      : undefined;
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListProductResponse.$type, ListProductResponse);

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
