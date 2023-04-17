/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "google.protobuf";

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 *  The JSON representation for `NullValue` is JSON `null`.
 */
export enum NullValue {
  /** NULL_VALUE - Null value. */
  NULL_VALUE = "NULL_VALUE",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function nullValueFromJSON(object: any): NullValue {
  switch (object) {
    case 0:
    case "NULL_VALUE":
      return NullValue.NULL_VALUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NullValue.UNRECOGNIZED;
  }
}

export function nullValueToJSON(object: NullValue): string {
  switch (object) {
    case NullValue.NULL_VALUE:
      return "NULL_VALUE";
    case NullValue.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 */
export interface Struct {
  $type: "google.protobuf.Struct";
  /** Unordered map of dynamically typed values. */
  fields: Map<string, any | undefined>;
}

export interface Struct_FieldsEntry {
  $type: "google.protobuf.Struct.FieldsEntry";
  key: string;
  value: any | undefined;
}

/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of that
 * variants, absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 */
export interface Value {
  $type: "google.protobuf.Value";
  kind?:
    | { $case: "nullValue"; nullValue: NullValue }
    | { $case: "numberValue"; numberValue: number }
    | { $case: "stringValue"; stringValue: string }
    | { $case: "boolValue"; boolValue: boolean }
    | { $case: "structValue"; structValue: { [key: string]: any } | undefined }
    | { $case: "listValue"; listValue: Array<any> | undefined };
}

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValue {
  $type: "google.protobuf.ListValue";
  /** Repeated field of dynamically typed values. */
  values: any[];
}

function createBaseStruct(): Struct {
  return { $type: "google.protobuf.Struct", fields: new Map() };
}

export const Struct = {
  $type: "google.protobuf.Struct" as const,

  fromJSON(object: any): Struct {
    return {
      $type: Struct.$type,
      fields: isObject(object.fields)
        ? Object.entries(object.fields).reduce<Map<string, any | undefined>>((acc, [key, value]) => {
          acc.set(key, value as any | undefined);
          return acc;
        }, new Map())
        : new Map(),
    };
  },

  toJSON(message: Struct): unknown {
    const obj: any = {};
    obj.fields = {};
    if (message.fields) {
      message.fields.forEach((v, k) => {
        obj.fields[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Struct>, I>>(object: I): Struct {
    const message = createBaseStruct();
    message.fields = (() => {
      const m = new Map();
      (object.fields as Map<string, any | undefined> ?? new Map()).forEach((value, key) => {
        if (value !== undefined) {
          m.set(key, value);
        }
      });
      return m;
    })();
    return message;
  },

  wrap(object: { [key: string]: any } | undefined): Struct {
    const struct = createBaseStruct();
    if (object !== undefined) {
      Object.keys(object).forEach((key) => {
        struct.fields[key] = object[key];
      });
    }
    return struct;
  },

  unwrap(message: Struct): { [key: string]: any } {
    const object: { [key: string]: any } = {};
    Object.keys(message.fields).forEach((key) => {
      object[key] = message.fields[key];
    });
    return object;
  },
};

messageTypeRegistry.set(Struct.$type, Struct);

function createBaseStruct_FieldsEntry(): Struct_FieldsEntry {
  return { $type: "google.protobuf.Struct.FieldsEntry", key: "", value: undefined };
}

export const Struct_FieldsEntry = {
  $type: "google.protobuf.Struct.FieldsEntry" as const,

  fromJSON(object: any): Struct_FieldsEntry {
    return {
      $type: Struct_FieldsEntry.$type,
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: Struct_FieldsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Struct_FieldsEntry>, I>>(object: I): Struct_FieldsEntry {
    const message = createBaseStruct_FieldsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Struct_FieldsEntry.$type, Struct_FieldsEntry);

function createBaseValue(): Value {
  return { $type: "google.protobuf.Value", kind: undefined };
}

export const Value = {
  $type: "google.protobuf.Value" as const,

  fromJSON(object: any): Value {
    return {
      $type: Value.$type,
      kind: isSet(object.nullValue)
        ? { $case: "nullValue", nullValue: nullValueFromJSON(object.nullValue) }
        : isSet(object.numberValue)
        ? { $case: "numberValue", numberValue: Number(object.numberValue) }
        : isSet(object.stringValue)
        ? { $case: "stringValue", stringValue: String(object.stringValue) }
        : isSet(object.boolValue)
        ? { $case: "boolValue", boolValue: Boolean(object.boolValue) }
        : isSet(object.structValue)
        ? { $case: "structValue", structValue: object.structValue }
        : isSet(object.listValue)
        ? { $case: "listValue", listValue: [...object.listValue] }
        : undefined,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    message.kind?.$case === "nullValue" &&
      (obj.nullValue = message.kind?.nullValue !== undefined ? nullValueToJSON(message.kind?.nullValue) : undefined);
    message.kind?.$case === "numberValue" && (obj.numberValue = message.kind?.numberValue);
    message.kind?.$case === "stringValue" && (obj.stringValue = message.kind?.stringValue);
    message.kind?.$case === "boolValue" && (obj.boolValue = message.kind?.boolValue);
    message.kind?.$case === "structValue" && (obj.structValue = message.kind?.structValue);
    message.kind?.$case === "listValue" && (obj.listValue = message.kind?.listValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Value>, I>>(object: I): Value {
    const message = createBaseValue();
    if (object.kind?.$case === "nullValue" && object.kind?.nullValue !== undefined && object.kind?.nullValue !== null) {
      message.kind = { $case: "nullValue", nullValue: object.kind.nullValue };
    }
    if (
      object.kind?.$case === "numberValue" &&
      object.kind?.numberValue !== undefined &&
      object.kind?.numberValue !== null
    ) {
      message.kind = { $case: "numberValue", numberValue: object.kind.numberValue };
    }
    if (
      object.kind?.$case === "stringValue" &&
      object.kind?.stringValue !== undefined &&
      object.kind?.stringValue !== null
    ) {
      message.kind = { $case: "stringValue", stringValue: object.kind.stringValue };
    }
    if (object.kind?.$case === "boolValue" && object.kind?.boolValue !== undefined && object.kind?.boolValue !== null) {
      message.kind = { $case: "boolValue", boolValue: object.kind.boolValue };
    }
    if (
      object.kind?.$case === "structValue" &&
      object.kind?.structValue !== undefined &&
      object.kind?.structValue !== null
    ) {
      message.kind = { $case: "structValue", structValue: object.kind.structValue };
    }
    if (object.kind?.$case === "listValue" && object.kind?.listValue !== undefined && object.kind?.listValue !== null) {
      message.kind = { $case: "listValue", listValue: object.kind.listValue };
    }
    return message;
  },

  wrap(value: any): Value {
    const result = createBaseValue();

    if (value === null) {
      result.kind = { $case: "nullValue", nullValue: NullValue.NULL_VALUE };
    } else if (typeof value === "boolean") {
      result.kind = { $case: "boolValue", boolValue: value };
    } else if (typeof value === "number") {
      result.kind = { $case: "numberValue", numberValue: value };
    } else if (typeof value === "string") {
      result.kind = { $case: "stringValue", stringValue: value };
    } else if (Array.isArray(value)) {
      result.kind = { $case: "listValue", listValue: value };
    } else if (typeof value === "object") {
      result.kind = { $case: "structValue", structValue: value };
    } else if (typeof value !== "undefined") {
      throw new Error("Unsupported any value type: " + typeof value);
    }

    return result;
  },

  unwrap(message: Value): string | number | boolean | Object | null | Array<any> | undefined {
    if (message.kind?.$case === "nullValue") {
      return null;
    } else if (message.kind?.$case === "numberValue") {
      return message.kind?.numberValue;
    } else if (message.kind?.$case === "stringValue") {
      return message.kind?.stringValue;
    } else if (message.kind?.$case === "boolValue") {
      return message.kind?.boolValue;
    } else if (message.kind?.$case === "structValue") {
      return message.kind?.structValue;
    } else if (message.kind?.$case === "listValue") {
      return message.kind?.listValue;
    } else {
      return undefined;
    }
  },
};

messageTypeRegistry.set(Value.$type, Value);

function createBaseListValue(): ListValue {
  return { $type: "google.protobuf.ListValue", values: [] };
}

export const ListValue = {
  $type: "google.protobuf.ListValue" as const,

  fromJSON(object: any): ListValue {
    return { $type: ListValue.$type, values: Array.isArray(object?.values) ? [...object.values] : [] };
  },

  toJSON(message: ListValue): unknown {
    const obj: any = {};
    if (message.values) {
      obj.values = message.values.map((e) => e);
    } else {
      obj.values = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListValue>, I>>(object: I): ListValue {
    const message = createBaseListValue();
    message.values = object.values?.map((e) => e) || [];
    return message;
  },

  wrap(value: Array<any> | undefined): ListValue {
    const result = createBaseListValue();

    result.values = value ?? [];

    return result;
  },

  unwrap(message: ListValue): Array<any> {
    return message.values;
  },
};

messageTypeRegistry.set(ListValue.$type, ListValue);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
