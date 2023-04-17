/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "operation.template";

/**
 * Aggregate of the information necessary for placing clone orders.
 * Next Id: 7
 */
export interface Template {
  $type: "operation.template.Template";
  id: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  name: string;
  description: string | undefined;
  bundleId: string;
}

function createBaseTemplate(): Template {
  return {
    $type: "operation.template.Template",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    name: "",
    description: undefined,
    bundleId: "",
  };
}

export const Template = {
  $type: "operation.template.Template" as const,

  fromJSON(object: any): Template {
    return {
      $type: Template.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      bundleId: isSet(object.bundleId) ? String(object.bundleId) : "",
    };
  },

  toJSON(message: Template): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.bundleId !== undefined && (obj.bundleId = message.bundleId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Template>, I>>(object: I): Template {
    const message = createBaseTemplate();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? undefined;
    message.bundleId = object.bundleId ?? "";
    return message;
  },
};

messageTypeRegistry.set(Template.$type, Template);

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
