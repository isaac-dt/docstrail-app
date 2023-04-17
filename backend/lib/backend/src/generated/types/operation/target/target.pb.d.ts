export declare const protobufPackage = "operation.target";
/**
 * Aggregate of the users associated to a Template.
 * Next Id: 6
 */
export interface Target {
    $type: "operation.target.Target";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly name: string | undefined;
    readonly clientId: string;
}
export declare const Target: {
    $type: "operation.target.Target";
    fromJSON(object: any): Target;
    toJSON(message: Target): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        name?: string | undefined;
        clientId?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        clientId?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, "id" | "name" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; }>(object: I): Target;
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
