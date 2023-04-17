/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "account.root";

/**
 * The most global construct; to which all global entities belong.
 * Next Id: 4
 */
export interface Root {
  $type: "account.root.Root";
  id: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

function createBaseRoot(): Root {
  return { $type: "account.root.Root", id: "", createdAt: undefined, updatedAt: undefined };
}

export const Root = {
  $type: "account.root.Root" as const,

  fromJSON(object: any): Root {
    return {
      $type: Root.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
    };
  },

  toJSON(message: Root): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Root>, I>>(object: I): Root {
    const message = createBaseRoot();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Root.$type, Root);

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
