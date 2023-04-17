export declare const protobufPackage = "catalog.distribution";
/**
 * A full Description of a Company which is a product distributor.
 * Next Id: 7
 */
export interface Company {
    $type: "catalog.distribution.Company";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly rootId: string;
    readonly legalName: string | undefined;
    readonly webAddress: string | undefined;
}
export declare const Company: {
    $type: "catalog.distribution.Company";
    fromJSON(object: any): Company;
    toJSON(message: Company): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        rootId?: string | undefined;
        legalName?: string | undefined;
        webAddress?: string | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        rootId?: string | undefined;
        legalName?: string | undefined;
        webAddress?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "createdAt" | "$type" | "updatedAt" | "rootId" | "legalName" | "webAddress">]: never; }>(object: I): Company;
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
