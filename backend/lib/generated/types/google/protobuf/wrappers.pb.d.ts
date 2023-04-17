/// <reference types="node" />
export declare const protobufPackage = "google.protobuf";
/**
 * Wrapper message for `double`.
 *
 * The JSON representation for `DoubleValue` is JSON number.
 */
export interface DoubleValue {
    $type: "google.protobuf.DoubleValue";
    /** The double value. */
    readonly value: number;
}
/**
 * Wrapper message for `float`.
 *
 * The JSON representation for `FloatValue` is JSON number.
 */
export interface FloatValue {
    $type: "google.protobuf.FloatValue";
    /** The float value. */
    readonly value: number;
}
/**
 * Wrapper message for `int64`.
 *
 * The JSON representation for `Int64Value` is JSON string.
 */
export interface Int64Value {
    $type: "google.protobuf.Int64Value";
    /** The int64 value. */
    readonly value: number;
}
/**
 * Wrapper message for `uint64`.
 *
 * The JSON representation for `UInt64Value` is JSON string.
 */
export interface UInt64Value {
    $type: "google.protobuf.UInt64Value";
    /** The uint64 value. */
    readonly value: number;
}
/**
 * Wrapper message for `int32`.
 *
 * The JSON representation for `Int32Value` is JSON number.
 */
export interface Int32Value {
    $type: "google.protobuf.Int32Value";
    /** The int32 value. */
    readonly value: number;
}
/**
 * Wrapper message for `uint32`.
 *
 * The JSON representation for `UInt32Value` is JSON number.
 */
export interface UInt32Value {
    $type: "google.protobuf.UInt32Value";
    /** The uint32 value. */
    readonly value: number;
}
/**
 * Wrapper message for `bool`.
 *
 * The JSON representation for `BoolValue` is JSON `true` and `false`.
 */
export interface BoolValue {
    $type: "google.protobuf.BoolValue";
    /** The bool value. */
    readonly value: boolean;
}
/**
 * Wrapper message for `string`.
 *
 * The JSON representation for `StringValue` is JSON string.
 */
export interface StringValue {
    $type: "google.protobuf.StringValue";
    /** The string value. */
    readonly value: string;
}
/**
 * Wrapper message for `bytes`.
 *
 * The JSON representation for `BytesValue` is JSON string.
 */
export interface BytesValue {
    $type: "google.protobuf.BytesValue";
    /** The bytes value. */
    readonly value: Buffer;
}
export declare const DoubleValue: {
    $type: "google.protobuf.DoubleValue";
    fromJSON(object: any): DoubleValue;
    toJSON(message: DoubleValue): unknown;
    fromPartial<I extends {
        value?: number | undefined;
    } & {
        value?: number | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): DoubleValue;
};
export declare const FloatValue: {
    $type: "google.protobuf.FloatValue";
    fromJSON(object: any): FloatValue;
    toJSON(message: FloatValue): unknown;
    fromPartial<I extends {
        value?: number | undefined;
    } & {
        value?: number | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): FloatValue;
};
export declare const Int64Value: {
    $type: "google.protobuf.Int64Value";
    fromJSON(object: any): Int64Value;
    toJSON(message: Int64Value): unknown;
    fromPartial<I extends {
        value?: number | undefined;
    } & {
        value?: number | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): Int64Value;
};
export declare const UInt64Value: {
    $type: "google.protobuf.UInt64Value";
    fromJSON(object: any): UInt64Value;
    toJSON(message: UInt64Value): unknown;
    fromPartial<I extends {
        value?: number | undefined;
    } & {
        value?: number | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): UInt64Value;
};
export declare const Int32Value: {
    $type: "google.protobuf.Int32Value";
    fromJSON(object: any): Int32Value;
    toJSON(message: Int32Value): unknown;
    fromPartial<I extends {
        value?: number | undefined;
    } & {
        value?: number | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): Int32Value;
};
export declare const UInt32Value: {
    $type: "google.protobuf.UInt32Value";
    fromJSON(object: any): UInt32Value;
    toJSON(message: UInt32Value): unknown;
    fromPartial<I extends {
        value?: number | undefined;
    } & {
        value?: number | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): UInt32Value;
};
export declare const BoolValue: {
    $type: "google.protobuf.BoolValue";
    fromJSON(object: any): BoolValue;
    toJSON(message: BoolValue): unknown;
    fromPartial<I extends {
        value?: boolean | undefined;
    } & {
        value?: boolean | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): BoolValue;
};
export declare const StringValue: {
    $type: "google.protobuf.StringValue";
    fromJSON(object: any): StringValue;
    toJSON(message: StringValue): unknown;
    fromPartial<I extends {
        value?: string | undefined;
    } & {
        value?: string | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): StringValue;
};
export declare const BytesValue: {
    $type: "google.protobuf.BytesValue";
    fromJSON(object: any): BytesValue;
    toJSON(message: BytesValue): unknown;
    fromPartial<I extends {
        value?: Buffer | undefined;
    } & {
        value?: Buffer | undefined;
    } & { [K in Exclude<keyof I, "value" | "$type">]: never; }>(object: I): BytesValue;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]>;
} & {
    $case: T["$case"];
} : T extends {} ? {
    [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never;
};
export {};
