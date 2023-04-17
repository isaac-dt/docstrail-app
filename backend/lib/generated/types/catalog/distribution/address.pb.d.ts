export declare const protobufPackage = "catalog.distribution";
/**
 * A physical address for a distribution outlet.
 * NextId: 10
 */
export interface OutletAddress {
    $type: "catalog.distribution.OutletAddress";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly street: string;
    readonly unit: string | undefined;
    readonly city: string;
    readonly zip: string;
    readonly countryCode: number | undefined;
    readonly distributionOutletId: string;
}
export declare const OutletAddress: {
    $type: "catalog.distribution.OutletAddress";
    fromJSON(object: any): OutletAddress;
    toJSON(message: OutletAddress): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        unit?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        street?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
        distributionOutletId?: string | undefined;
    } & {
        id?: string | undefined;
        unit?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        street?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
        distributionOutletId?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "street" | "city" | "zip" | "countryCode" | "distributionOutletId">]: never; }>(object: I): OutletAddress;
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
