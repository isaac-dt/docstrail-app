export declare const protobufPackage = "operation.template";
/**
 * Aggregate of the information necessary for placing clone orders.
 * Next Id: 7
 */
export interface Template {
    $type: "operation.template.Template";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly name: string;
    readonly description: string | undefined;
    readonly bundleId: string;
}
export declare const Template: {
    $type: "operation.template.Template";
    fromJSON(object: any): Template;
    toJSON(message: Template): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        bundleId?: string | undefined;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        bundleId?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "bundleId">]: never; }>(object: I): Template;
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
