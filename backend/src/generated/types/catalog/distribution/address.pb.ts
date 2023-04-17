/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "catalog.distribution";

/**
 * A physical address for a distribution outlet.
 * NextId: 10
 */
export interface OutletAddress {
  $type: "catalog.distribution.OutletAddress";
  readonly id: string;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;
  readonly street: string;
  readonly unit: string | undefined;
  readonly city: string;
  readonly zip: string;
  readonly countryCode: number | undefined;
  readonly distributionOutletId: string;
}

function createBaseOutletAddress(): OutletAddress {
  return {
    $type: "catalog.distribution.OutletAddress",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    street: "",
    unit: undefined,
    city: "",
    zip: "",
    countryCode: undefined,
    distributionOutletId: "",
  };
}

export const OutletAddress = {
  $type: "catalog.distribution.OutletAddress" as const,

  fromJSON(object: any): OutletAddress {
    return {
      $type: OutletAddress.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      street: isSet(object.street) ? String(object.street) : "",
      unit: isSet(object.unit) ? String(object.unit) : undefined,
      city: isSet(object.city) ? String(object.city) : "",
      zip: isSet(object.zip) ? String(object.zip) : "",
      countryCode: isSet(object.countryCode) ? Number(object.countryCode) : undefined,
      distributionOutletId: isSet(object.distributionOutletId) ? String(object.distributionOutletId) : "",
    };
  },

  toJSON(message: OutletAddress): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.street !== undefined && (obj.street = message.street);
    message.unit !== undefined && (obj.unit = message.unit);
    message.city !== undefined && (obj.city = message.city);
    message.zip !== undefined && (obj.zip = message.zip);
    message.countryCode !== undefined && (obj.countryCode = message.countryCode);
    message.distributionOutletId !== undefined && (obj.distributionOutletId = message.distributionOutletId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OutletAddress>, I>>(object: I): OutletAddress {
    const message = createBaseOutletAddress() as any;
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.street = object.street ?? "";
    message.unit = object.unit ?? undefined;
    message.city = object.city ?? "";
    message.zip = object.zip ?? "";
    message.countryCode = object.countryCode ?? undefined;
    message.distributionOutletId = object.distributionOutletId ?? "";
    return message;
  },
};

messageTypeRegistry.set(OutletAddress.$type, OutletAddress);

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
