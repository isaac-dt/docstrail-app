export declare const protobufPackage = "account.client";
/**
 * Company onboarded with Dimetrail.
 * Next Id: 6
 */
export interface Client {
    $type: "account.client.Client";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly name: string;
    readonly rootId: string;
}
export declare const Client: {
    $type: "account.client.Client";
    fromJSON(object: any): Client;
    toJSON(message: Client): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        name?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        rootId?: string | undefined;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        rootId?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "name" | "createdAt" | "$type" | "updatedAt" | "rootId">]: never; }>(object: I): Client;
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
