/* eslint-disable */
import { InventoryBatch } from "../../catalog/inventory/batch.pb";
import { Product } from "../../catalog/product/product.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { DeliveryItem } from "./item.pb";

export const protobufPackage = "operation.bundle";

/** Next Id: 4 */
export interface WriteDeliveryItemRequest {
  $type: "operation.bundle.WriteDeliveryItemRequest";
  readonly quantity: number | undefined;
  readonly productId: string | undefined;
  readonly orderId: string | undefined;
}

/** Next Id: 4 */
export interface GetDeliveryItemResponse {
  $type: "operation.bundle.GetDeliveryItemResponse";
  readonly bundle: DeliveryItem | undefined;
  readonly product: Product | undefined;
  readonly inventoryBatch: InventoryBatch | undefined;
}

/** Next Id: 3 */
export interface ListDeliveryItemResponse {
  $type: "operation.bundle.ListDeliveryItemResponse";
  readonly deliveryItems: readonly DeliveryItem[];
  readonly matchCount: number;
}

function createBaseWriteDeliveryItemRequest(): WriteDeliveryItemRequest {
  return {
    $type: "operation.bundle.WriteDeliveryItemRequest",
    quantity: undefined,
    productId: undefined,
    orderId: undefined,
  };
}

export const WriteDeliveryItemRequest = {
  $type: "operation.bundle.WriteDeliveryItemRequest" as const,

  fromJSON(object: any): WriteDeliveryItemRequest {
    return {
      $type: WriteDeliveryItemRequest.$type,
      quantity: isSet(object.quantity) ? Number(object.quantity) : undefined,
      productId: isSet(object.productId) ? String(object.productId) : undefined,
      orderId: isSet(object.orderId) ? String(object.orderId) : undefined,
    };
  },

  toJSON(message: WriteDeliveryItemRequest): unknown {
    const obj: any = {};
    message.quantity !== undefined && (obj.quantity = message.quantity);
    message.productId !== undefined && (obj.productId = message.productId);
    message.orderId !== undefined && (obj.orderId = message.orderId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteDeliveryItemRequest>, I>>(object: I): WriteDeliveryItemRequest {
    const message = createBaseWriteDeliveryItemRequest() as any;
    message.quantity = object.quantity ?? undefined;
    message.productId = object.productId ?? undefined;
    message.orderId = object.orderId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteDeliveryItemRequest.$type, WriteDeliveryItemRequest);

function createBaseGetDeliveryItemResponse(): GetDeliveryItemResponse {
  return {
    $type: "operation.bundle.GetDeliveryItemResponse",
    bundle: undefined,
    product: undefined,
    inventoryBatch: undefined,
  };
}

export const GetDeliveryItemResponse = {
  $type: "operation.bundle.GetDeliveryItemResponse" as const,

  fromJSON(object: any): GetDeliveryItemResponse {
    return {
      $type: GetDeliveryItemResponse.$type,
      bundle: isSet(object.bundle) ? DeliveryItem.fromJSON(object.bundle) : undefined,
      product: isSet(object.product) ? Product.fromJSON(object.product) : undefined,
      inventoryBatch: isSet(object.inventoryBatch) ? InventoryBatch.fromJSON(object.inventoryBatch) : undefined,
    };
  },

  toJSON(message: GetDeliveryItemResponse): unknown {
    const obj: any = {};
    message.bundle !== undefined && (obj.bundle = message.bundle ? DeliveryItem.toJSON(message.bundle) : undefined);
    message.product !== undefined && (obj.product = message.product ? Product.toJSON(message.product) : undefined);
    message.inventoryBatch !== undefined &&
      (obj.inventoryBatch = message.inventoryBatch ? InventoryBatch.toJSON(message.inventoryBatch) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDeliveryItemResponse>, I>>(object: I): GetDeliveryItemResponse {
    const message = createBaseGetDeliveryItemResponse() as any;
    message.bundle = (object.bundle !== undefined && object.bundle !== null)
      ? DeliveryItem.fromPartial(object.bundle)
      : undefined;
    message.product = (object.product !== undefined && object.product !== null)
      ? Product.fromPartial(object.product)
      : undefined;
    message.inventoryBatch = (object.inventoryBatch !== undefined && object.inventoryBatch !== null)
      ? InventoryBatch.fromPartial(object.inventoryBatch)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetDeliveryItemResponse.$type, GetDeliveryItemResponse);

function createBaseListDeliveryItemResponse(): ListDeliveryItemResponse {
  return { $type: "operation.bundle.ListDeliveryItemResponse", deliveryItems: [], matchCount: 0 };
}

export const ListDeliveryItemResponse = {
  $type: "operation.bundle.ListDeliveryItemResponse" as const,

  fromJSON(object: any): ListDeliveryItemResponse {
    return {
      $type: ListDeliveryItemResponse.$type,
      deliveryItems: Array.isArray(object?.deliveryItems)
        ? object.deliveryItems.map((e: any) => DeliveryItem.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListDeliveryItemResponse): unknown {
    const obj: any = {};
    if (message.deliveryItems) {
      obj.deliveryItems = message.deliveryItems.map((e) => e ? DeliveryItem.toJSON(e) : undefined);
    } else {
      obj.deliveryItems = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListDeliveryItemResponse>, I>>(object: I): ListDeliveryItemResponse {
    const message = createBaseListDeliveryItemResponse() as any;
    message.deliveryItems = object.deliveryItems?.map((e) => DeliveryItem.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListDeliveryItemResponse.$type, ListDeliveryItemResponse);

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
