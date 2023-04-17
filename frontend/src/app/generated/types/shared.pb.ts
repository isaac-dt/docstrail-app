/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "./typeRegistry";

export const protobufPackage = "shared";

/**
 * Allowed monetary currencies.
 * Next Id: 1
 */
export enum Currency {
  USD = "USD",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function currencyFromJSON(object: any): Currency {
  switch (object) {
    case 0:
    case "USD":
      return Currency.USD;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Currency.UNRECOGNIZED;
  }
}

export function currencyToJSON(object: Currency): string {
  switch (object) {
    case Currency.USD:
      return "USD";
    case Currency.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The price of a product
 * Next Id: 4
 */
export interface Price {
  $type: "shared.Price";
  date: Date | undefined;
  amount: number;
  currency: Currency;
}

function createBasePrice(): Price {
  return { $type: "shared.Price", date: undefined, amount: 0, currency: Currency.USD };
}

export const Price = {
  $type: "shared.Price" as const,

  fromJSON(object: any): Price {
    return {
      $type: Price.$type,
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      currency: isSet(object.currency) ? currencyFromJSON(object.currency) : Currency.USD,
    };
  },

  toJSON(message: Price): unknown {
    const obj: any = {};
    message.date !== undefined && (obj.date = message.date.toISOString());
    message.amount !== undefined && (obj.amount = message.amount);
    message.currency !== undefined && (obj.currency = currencyToJSON(message.currency));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Price>, I>>(object: I): Price {
    const message = createBasePrice();
    message.date = object.date ?? undefined;
    message.amount = object.amount ?? 0;
    message.currency = object.currency ?? Currency.USD;
    return message;
  },
};

messageTypeRegistry.set(Price.$type, Price);

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
