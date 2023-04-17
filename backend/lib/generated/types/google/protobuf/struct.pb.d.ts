export declare const protobufPackage = "google.protobuf";
/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 *  The JSON representation for `NullValue` is JSON `null`.
 */
export declare enum NullValue {
    /** NULL_VALUE - Null value. */
    NULL_VALUE = "NULL_VALUE",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function nullValueFromJSON(object: any): NullValue;
export declare function nullValueToJSON(object: NullValue): string;
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
    readonly fields: Map<string, any | undefined>;
}
export interface Struct_FieldsEntry {
    $type: "google.protobuf.Struct.FieldsEntry";
    readonly key: string;
    readonly value: any | undefined;
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
    kind?: {
        $case: "nullValue";
        nullValue: NullValue;
    } | {
        $case: "numberValue";
        numberValue: number;
    } | {
        $case: "stringValue";
        stringValue: string;
    } | {
        $case: "boolValue";
        boolValue: boolean;
    } | {
        $case: "structValue";
        structValue: {
            readonly [key: string]: any;
        } | undefined;
    } | {
        $case: "listValue";
        listValue: ReadonlyArray<any> | undefined;
    };
}
/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValue {
    $type: "google.protobuf.ListValue";
    /** Repeated field of dynamically typed values. */
    readonly values: readonly any[];
}
export declare const Struct: any;
export declare const Struct_FieldsEntry: {
    $type: "google.protobuf.Struct.FieldsEntry";
    fromJSON(object: any): Struct_FieldsEntry;
    toJSON(message: Struct_FieldsEntry): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: any;
    } & {
        key?: string | undefined;
        value?: any;
    } & { [K in Exclude<keyof I, "key" | "value" | "$type">]: never; }>(object: I): Struct_FieldsEntry;
};
export declare const Value: {
    $type: "google.protobuf.Value";
    fromJSON(object: any): Value;
    toJSON(message: Value): unknown;
    fromPartial<I extends {
        kind?: ({
            nullValue?: NullValue | undefined;
        } & {
            $case: "nullValue";
        }) | ({
            numberValue?: number | undefined;
        } & {
            $case: "numberValue";
        }) | ({
            stringValue?: string | undefined;
        } & {
            $case: "stringValue";
        }) | ({
            boolValue?: boolean | undefined;
        } & {
            $case: "boolValue";
        }) | ({
            structValue?: {
                [x: string]: any;
                [x: number]: any;
            } | undefined;
        } & {
            $case: "structValue";
        }) | ({
            listValue?: readonly any[] | undefined;
        } & {
            $case: "listValue";
        }) | undefined;
    } & {
        kind?: ({
            nullValue?: NullValue | undefined;
        } & {
            $case: "nullValue";
        } & {
            nullValue?: NullValue | undefined;
            $case: "nullValue";
        } & { [K in Exclude<keyof I["kind"], "nullValue" | "$type" | "$case">]: never; }) | ({
            numberValue?: number | undefined;
        } & {
            $case: "numberValue";
        } & {
            numberValue?: number | undefined;
            $case: "numberValue";
        } & { [K_1 in Exclude<keyof I["kind"], "numberValue" | "$type" | "$case">]: never; }) | ({
            stringValue?: string | undefined;
        } & {
            $case: "stringValue";
        } & {
            stringValue?: string | undefined;
            $case: "stringValue";
        } & { [K_2 in Exclude<keyof I["kind"], "stringValue" | "$type" | "$case">]: never; }) | ({
            boolValue?: boolean | undefined;
        } & {
            $case: "boolValue";
        } & {
            boolValue?: boolean | undefined;
            $case: "boolValue";
        } & { [K_3 in Exclude<keyof I["kind"], "boolValue" | "$type" | "$case">]: never; }) | ({
            structValue?: {
                [x: string]: any;
                [x: number]: any;
            } | undefined;
        } & {
            $case: "structValue";
        } & {
            structValue?: ({
                [x: string]: any;
                [x: number]: any;
            } & {
                [x: string]: any;
                [x: number]: any;
            } & { [K_4 in Exclude<keyof I["kind"]["structValue"], string | number>]: never; }) | undefined;
            $case: "structValue";
        } & { [K_5 in Exclude<keyof I["kind"], "structValue" | "$type" | "$case">]: never; }) | ({
            listValue?: readonly any[] | undefined;
        } & {
            $case: "listValue";
        } & {
            listValue?: (readonly any[] & readonly any[] & { [K_6 in Exclude<keyof I["kind"]["listValue"], "$type" | keyof readonly any[]>]: never; }) | undefined;
            $case: "listValue";
        } & { [K_7 in Exclude<keyof I["kind"], "listValue" | "$type" | "$case">]: never; }) | undefined;
    } & { [K_8 in Exclude<keyof I, "$type" | "kind">]: never; }>(object: I): Value;
    wrap(value: any): Value;
    unwrap(message: Value): string | number | boolean | Object | null | Array<any> | undefined;
};
export declare const ListValue: {
    $type: "google.protobuf.ListValue";
    fromJSON(object: any): ListValue;
    toJSON(message: ListValue): unknown;
    fromPartial<I extends {
        values?: readonly any[] | undefined;
    } & {
        values?: (readonly any[] & readonly any[] & { [K in Exclude<keyof I["values"], "$type" | keyof readonly any[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "values" | "$type">]: never; }>(object: I): ListValue;
    wrap(value: ReadonlyArray<any> | undefined): ListValue;
    unwrap(message: any): Array<any>;
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
