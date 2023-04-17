/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { Price } from "../../shared.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { Product } from "../product/product.pb";
import { InventoryBatch } from "./batch.pb";

export const protobufPackage = "catalog.inventory";

/** Next Id: 5 */
export interface WriteInventoryBatchRequest {
  $type: "catalog.inventory.WriteInventoryBatchRequest";
  date: Date | undefined;
  productId: string | undefined;
  quatity: number | undefined;
  price: Price | undefined;
}

/** Next Id: 3 */
export interface GetInventoryBatchResponse {
  $type: "catalog.inventory.GetInventoryBatchResponse";
  product: Product | undefined;
  inventoryBatch: InventoryBatch | undefined;
}

/** Next Id: 3 */
export interface ListInventoryBatchResponse {
  $type: "catalog.inventory.ListInventoryBatchResponse";
  inventoryBatches: InventoryBatch[];
  matchCount: number;
}

function createBaseWriteInventoryBatchRequest(): WriteInventoryBatchRequest {
  return {
    $type: "catalog.inventory.WriteInventoryBatchRequest",
    date: undefined,
    productId: undefined,
    quatity: undefined,
    price: undefined,
  };
}

export const WriteInventoryBatchRequest = {
  $type: "catalog.inventory.WriteInventoryBatchRequest" as const,

  fromJSON(object: any): WriteInventoryBatchRequest {
    return {
      $type: WriteInventoryBatchRequest.$type,
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      productId: isSet(object.productId) ? String(object.productId) : undefined,
      quatity: isSet(object.quatity) ? Number(object.quatity) : undefined,
      price: isSet(object.price) ? Price.fromJSON(object.price) : undefined,
    };
  },

  toJSON(message: WriteInventoryBatchRequest): unknown {
    const obj: any = {};
    message.date !== undefined && (obj.date = message.date.toISOString());
    message.productId !== undefined && (obj.productId = message.productId);
    message.quatity !== undefined && (obj.quatity = message.quatity);
    message.price !== undefined && (obj.price = message.price ? Price.toJSON(message.price) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteInventoryBatchRequest>, I>>(object: I): WriteInventoryBatchRequest {
    const message = createBaseWriteInventoryBatchRequest();
    message.date = object.date ?? undefined;
    message.productId = object.productId ?? undefined;
    message.quatity = object.quatity ?? undefined;
    message.price = (object.price !== undefined && object.price !== null) ? Price.fromPartial(object.price) : undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteInventoryBatchRequest.$type, WriteInventoryBatchRequest);

function createBaseGetInventoryBatchResponse(): GetInventoryBatchResponse {
  return { $type: "catalog.inventory.GetInventoryBatchResponse", product: undefined, inventoryBatch: undefined };
}

export const GetInventoryBatchResponse = {
  $type: "catalog.inventory.GetInventoryBatchResponse" as const,

  fromJSON(object: any): GetInventoryBatchResponse {
    return {
      $type: GetInventoryBatchResponse.$type,
      product: isSet(object.product) ? Product.fromJSON(object.product) : undefined,
      inventoryBatch: isSet(object.inventoryBatch) ? InventoryBatch.fromJSON(object.inventoryBatch) : undefined,
    };
  },

  toJSON(message: GetInventoryBatchResponse): unknown {
    const obj: any = {};
    message.product !== undefined && (obj.product = message.product ? Product.toJSON(message.product) : undefined);
    message.inventoryBatch !== undefined &&
      (obj.inventoryBatch = message.inventoryBatch ? InventoryBatch.toJSON(message.inventoryBatch) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetInventoryBatchResponse>, I>>(object: I): GetInventoryBatchResponse {
    const message = createBaseGetInventoryBatchResponse();
    message.product = (object.product !== undefined && object.product !== null)
      ? Product.fromPartial(object.product)
      : undefined;
    message.inventoryBatch = (object.inventoryBatch !== undefined && object.inventoryBatch !== null)
      ? InventoryBatch.fromPartial(object.inventoryBatch)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetInventoryBatchResponse.$type, GetInventoryBatchResponse);

function createBaseListInventoryBatchResponse(): ListInventoryBatchResponse {
  return { $type: "catalog.inventory.ListInventoryBatchResponse", inventoryBatches: [], matchCount: 0 };
}

export const ListInventoryBatchResponse = {
  $type: "catalog.inventory.ListInventoryBatchResponse" as const,

  fromJSON(object: any): ListInventoryBatchResponse {
    return {
      $type: ListInventoryBatchResponse.$type,
      inventoryBatches: Array.isArray(object?.inventoryBatches)
        ? object.inventoryBatches.map((e: any) => InventoryBatch.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListInventoryBatchResponse): unknown {
    const obj: any = {};
    if (message.inventoryBatches) {
      obj.inventoryBatches = message.inventoryBatches.map((e) => e ? InventoryBatch.toJSON(e) : undefined);
    } else {
      obj.inventoryBatches = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListInventoryBatchResponse>, I>>(object: I): ListInventoryBatchResponse {
    const message = createBaseListInventoryBatchResponse();
    message.inventoryBatches = object.inventoryBatches?.map((e) => InventoryBatch.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListInventoryBatchResponse.$type, ListInventoryBatchResponse);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
