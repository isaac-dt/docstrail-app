/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { Price } from "../../shared.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "catalog.inventory";

/**
 * Represents a single purchase order for an inventory.
 * Next Id: 4
 */
export interface InventoryBatch {
  $type: "catalog.inventory.InventoryBatch";
  readonly id: string;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;
  readonly date: Date | undefined;
  readonly productId: string;
  readonly quatity: number;
  readonly price: Price | undefined;
}

function createBaseInventoryBatch(): InventoryBatch {
  return {
    $type: "catalog.inventory.InventoryBatch",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    date: undefined,
    productId: "",
    quatity: 0,
    price: undefined,
  };
}

export const InventoryBatch = {
  $type: "catalog.inventory.InventoryBatch" as const,

  fromJSON(object: any): InventoryBatch {
    return {
      $type: InventoryBatch.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      productId: isSet(object.productId) ? String(object.productId) : "",
      quatity: isSet(object.quatity) ? Number(object.quatity) : 0,
      price: isSet(object.price) ? Price.fromJSON(object.price) : undefined,
    };
  },

  toJSON(message: InventoryBatch): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.date !== undefined && (obj.date = message.date.toISOString());
    message.productId !== undefined && (obj.productId = message.productId);
    message.quatity !== undefined && (obj.quatity = Math.round(message.quatity));
    message.price !== undefined && (obj.price = message.price ? Price.toJSON(message.price) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InventoryBatch>, I>>(object: I): InventoryBatch {
    const message = createBaseInventoryBatch() as any;
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.date = object.date ?? undefined;
    message.productId = object.productId ?? "";
    message.quatity = object.quatity ?? 0;
    message.price = (object.price !== undefined && object.price !== null) ? Price.fromPartial(object.price) : undefined;
    return message;
  },
};

messageTypeRegistry.set(InventoryBatch.$type, InventoryBatch);

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
