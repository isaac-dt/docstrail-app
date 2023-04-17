/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { Price } from "../../shared.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "catalog.product";

/**
 * Details for a physically obtainable, specific product.
 * Example: deatils for a red pen with its amazon.com link.
 * Next Id: 11
 */
export interface Product {
  $type: "catalog.product.Product";
  readonly id: string;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;
  readonly name: string;
  readonly description: string;
  readonly webLink: string | undefined;
  readonly imageUrl: string | undefined;
  readonly distributionOutletId: string;
  readonly openDefinitionId: string;
  readonly price: Price | undefined;
}

function createBaseProduct(): Product {
  return {
    $type: "catalog.product.Product",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    name: "",
    description: "",
    webLink: undefined,
    imageUrl: undefined,
    distributionOutletId: "",
    openDefinitionId: "",
    price: undefined,
  };
}

export const Product = {
  $type: "catalog.product.Product" as const,

  fromJSON(object: any): Product {
    return {
      $type: Product.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      webLink: isSet(object.webLink) ? String(object.webLink) : undefined,
      imageUrl: isSet(object.imageUrl) ? String(object.imageUrl) : undefined,
      distributionOutletId: isSet(object.distributionOutletId) ? String(object.distributionOutletId) : "",
      openDefinitionId: isSet(object.openDefinitionId) ? String(object.openDefinitionId) : "",
      price: isSet(object.price) ? Price.fromJSON(object.price) : undefined,
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.webLink !== undefined && (obj.webLink = message.webLink);
    message.imageUrl !== undefined && (obj.imageUrl = message.imageUrl);
    message.distributionOutletId !== undefined && (obj.distributionOutletId = message.distributionOutletId);
    message.openDefinitionId !== undefined && (obj.openDefinitionId = message.openDefinitionId);
    message.price !== undefined && (obj.price = message.price ? Price.toJSON(message.price) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Product>, I>>(object: I): Product {
    const message = createBaseProduct() as any;
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.webLink = object.webLink ?? undefined;
    message.imageUrl = object.imageUrl ?? undefined;
    message.distributionOutletId = object.distributionOutletId ?? "";
    message.openDefinitionId = object.openDefinitionId ?? "";
    message.price = (object.price !== undefined && object.price !== null) ? Price.fromPartial(object.price) : undefined;
    return message;
  },
};

messageTypeRegistry.set(Product.$type, Product);

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
