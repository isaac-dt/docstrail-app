/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "catalog.distribution";

/**
 * A full Description of a Company which is a product distributor.
 * Next Id: 7
 */
export interface Company {
  $type: "catalog.distribution.Company";
  id: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  rootId: string;
  legalName: string | undefined;
  webAddress: string | undefined;
}

function createBaseCompany(): Company {
  return {
    $type: "catalog.distribution.Company",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    rootId: "",
    legalName: undefined,
    webAddress: undefined,
  };
}

export const Company = {
  $type: "catalog.distribution.Company" as const,

  fromJSON(object: any): Company {
    return {
      $type: Company.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      rootId: isSet(object.rootId) ? String(object.rootId) : "",
      legalName: isSet(object.legalName) ? String(object.legalName) : undefined,
      webAddress: isSet(object.webAddress) ? String(object.webAddress) : undefined,
    };
  },

  toJSON(message: Company): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.rootId !== undefined && (obj.rootId = message.rootId);
    message.legalName !== undefined && (obj.legalName = message.legalName);
    message.webAddress !== undefined && (obj.webAddress = message.webAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Company>, I>>(object: I): Company {
    const message = createBaseCompany();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.rootId = object.rootId ?? "";
    message.legalName = object.legalName ?? undefined;
    message.webAddress = object.webAddress ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Company.$type, Company);

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
