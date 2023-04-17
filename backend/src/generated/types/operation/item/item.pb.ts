/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "operation.item";

/**
 * An item which is delivered via an order.
 * Next Id: 7
 */
export interface DeliveryItem {
  $type: "operation.item.DeliveryItem";
  readonly id: string;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;
  readonly quantity: number | undefined;
  readonly productId: string;
  readonly orderId: string;
}

function createBaseDeliveryItem(): DeliveryItem {
  return {
    $type: "operation.item.DeliveryItem",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    quantity: undefined,
    productId: "",
    orderId: "",
  };
}

export const DeliveryItem = {
  $type: "operation.item.DeliveryItem" as const,

  fromJSON(object: any): DeliveryItem {
    return {
      $type: DeliveryItem.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      quantity: isSet(object.quantity) ? Number(object.quantity) : undefined,
      productId: isSet(object.productId) ? String(object.productId) : "",
      orderId: isSet(object.orderId) ? String(object.orderId) : "",
    };
  },

  toJSON(message: DeliveryItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.quantity !== undefined && (obj.quantity = message.quantity);
    message.productId !== undefined && (obj.productId = message.productId);
    message.orderId !== undefined && (obj.orderId = message.orderId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeliveryItem>, I>>(object: I): DeliveryItem {
    const message = createBaseDeliveryItem() as any;
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.quantity = object.quantity ?? undefined;
    message.productId = object.productId ?? "";
    message.orderId = object.orderId ?? "";
    return message;
  },
};

messageTypeRegistry.set(DeliveryItem.$type, DeliveryItem);

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
