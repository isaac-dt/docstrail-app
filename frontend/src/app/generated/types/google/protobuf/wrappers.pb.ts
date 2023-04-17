/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "google.protobuf";

/**
 * Wrapper message for `double`.
 *
 * The JSON representation for `DoubleValue` is JSON number.
 */
export interface DoubleValue {
  $type: "google.protobuf.DoubleValue";
  /** The double value. */
  value: number;
}

/**
 * Wrapper message for `float`.
 *
 * The JSON representation for `FloatValue` is JSON number.
 */
export interface FloatValue {
  $type: "google.protobuf.FloatValue";
  /** The float value. */
  value: number;
}

/**
 * Wrapper message for `int64`.
 *
 * The JSON representation for `Int64Value` is JSON string.
 */
export interface Int64Value {
  $type: "google.protobuf.Int64Value";
  /** The int64 value. */
  value: number;
}

/**
 * Wrapper message for `uint64`.
 *
 * The JSON representation for `UInt64Value` is JSON string.
 */
export interface UInt64Value {
  $type: "google.protobuf.UInt64Value";
  /** The uint64 value. */
  value: number;
}

/**
 * Wrapper message for `int32`.
 *
 * The JSON representation for `Int32Value` is JSON number.
 */
export interface Int32Value {
  $type: "google.protobuf.Int32Value";
  /** The int32 value. */
  value: number;
}

/**
 * Wrapper message for `uint32`.
 *
 * The JSON representation for `UInt32Value` is JSON number.
 */
export interface UInt32Value {
  $type: "google.protobuf.UInt32Value";
  /** The uint32 value. */
  value: number;
}

/**
 * Wrapper message for `bool`.
 *
 * The JSON representation for `BoolValue` is JSON `true` and `false`.
 */
export interface BoolValue {
  $type: "google.protobuf.BoolValue";
  /** The bool value. */
  value: boolean;
}

/**
 * Wrapper message for `string`.
 *
 * The JSON representation for `StringValue` is JSON string.
 */
export interface StringValue {
  $type: "google.protobuf.StringValue";
  /** The string value. */
  value: string;
}

/**
 * Wrapper message for `bytes`.
 *
 * The JSON representation for `BytesValue` is JSON string.
 */
export interface BytesValue {
  $type: "google.protobuf.BytesValue";
  /** The bytes value. */
  value: Buffer;
}

function createBaseDoubleValue(): DoubleValue {
  return { $type: "google.protobuf.DoubleValue", value: 0 };
}

export const DoubleValue = {
  $type: "google.protobuf.DoubleValue" as const,

  fromJSON(object: any): DoubleValue {
    return { $type: DoubleValue.$type, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: DoubleValue): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DoubleValue>, I>>(object: I): DoubleValue {
    const message = createBaseDoubleValue();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(DoubleValue.$type, DoubleValue);

function createBaseFloatValue(): FloatValue {
  return { $type: "google.protobuf.FloatValue", value: 0 };
}

export const FloatValue = {
  $type: "google.protobuf.FloatValue" as const,

  fromJSON(object: any): FloatValue {
    return { $type: FloatValue.$type, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: FloatValue): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FloatValue>, I>>(object: I): FloatValue {
    const message = createBaseFloatValue();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(FloatValue.$type, FloatValue);

function createBaseInt64Value(): Int64Value {
  return { $type: "google.protobuf.Int64Value", value: 0 };
}

export const Int64Value = {
  $type: "google.protobuf.Int64Value" as const,

  fromJSON(object: any): Int64Value {
    return { $type: Int64Value.$type, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: Int64Value): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Int64Value>, I>>(object: I): Int64Value {
    const message = createBaseInt64Value();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Int64Value.$type, Int64Value);

function createBaseUInt64Value(): UInt64Value {
  return { $type: "google.protobuf.UInt64Value", value: 0 };
}

export const UInt64Value = {
  $type: "google.protobuf.UInt64Value" as const,

  fromJSON(object: any): UInt64Value {
    return { $type: UInt64Value.$type, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: UInt64Value): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UInt64Value>, I>>(object: I): UInt64Value {
    const message = createBaseUInt64Value();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UInt64Value.$type, UInt64Value);

function createBaseInt32Value(): Int32Value {
  return { $type: "google.protobuf.Int32Value", value: 0 };
}

export const Int32Value = {
  $type: "google.protobuf.Int32Value" as const,

  fromJSON(object: any): Int32Value {
    return { $type: Int32Value.$type, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: Int32Value): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Int32Value>, I>>(object: I): Int32Value {
    const message = createBaseInt32Value();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(Int32Value.$type, Int32Value);

function createBaseUInt32Value(): UInt32Value {
  return { $type: "google.protobuf.UInt32Value", value: 0 };
}

export const UInt32Value = {
  $type: "google.protobuf.UInt32Value" as const,

  fromJSON(object: any): UInt32Value {
    return { $type: UInt32Value.$type, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: UInt32Value): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UInt32Value>, I>>(object: I): UInt32Value {
    const message = createBaseUInt32Value();
    message.value = object.value ?? 0;
    return message;
  },
};

messageTypeRegistry.set(UInt32Value.$type, UInt32Value);

function createBaseBoolValue(): BoolValue {
  return { $type: "google.protobuf.BoolValue", value: false };
}

export const BoolValue = {
  $type: "google.protobuf.BoolValue" as const,

  fromJSON(object: any): BoolValue {
    return { $type: BoolValue.$type, value: isSet(object.value) ? Boolean(object.value) : false };
  },

  toJSON(message: BoolValue): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BoolValue>, I>>(object: I): BoolValue {
    const message = createBaseBoolValue();
    message.value = object.value ?? false;
    return message;
  },
};

messageTypeRegistry.set(BoolValue.$type, BoolValue);

function createBaseStringValue(): StringValue {
  return { $type: "google.protobuf.StringValue", value: "" };
}

export const StringValue = {
  $type: "google.protobuf.StringValue" as const,

  fromJSON(object: any): StringValue {
    return { $type: StringValue.$type, value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: StringValue): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StringValue>, I>>(object: I): StringValue {
    const message = createBaseStringValue();
    message.value = object.value ?? "";
    return message;
  },
};

messageTypeRegistry.set(StringValue.$type, StringValue);

function createBaseBytesValue(): BytesValue {
  return { $type: "google.protobuf.BytesValue", value: Buffer.alloc(0) };
}

export const BytesValue = {
  $type: "google.protobuf.BytesValue" as const,

  fromJSON(object: any): BytesValue {
    return {
      $type: BytesValue.$type,
      value: isSet(object.value) ? Buffer.from(bytesFromBase64(object.value)) : Buffer.alloc(0),
    };
  },

  toJSON(message: BytesValue): unknown {
    const obj: any = {};
    message.value !== undefined &&
      (obj.value = base64FromBytes(message.value !== undefined ? message.value : Buffer.alloc(0)));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BytesValue>, I>>(object: I): BytesValue {
    const message = createBaseBytesValue();
    message.value = object.value ?? Buffer.alloc(0);
    return message;
  },
};

messageTypeRegistry.set(BytesValue.$type, BytesValue);

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
