import { Price } from "../../shared.pb";
export declare const protobufPackage = "catalog.product";
/**
 * Details for a physically obtainable, specific product.
 * Example: deatils for a red pen with its amazon.com link.
 * Next Id: 11
 */
export interface Product {
    $type: "catalog.product.Product";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly name: string;
    readonly description: string;
    readonly webLink: string | undefined;
    readonly imageUrl: string | undefined;
    readonly distributionOutletId: string;
    readonly openDefinitionId: string;
    readonly price: Price | undefined;
}
export declare const Product: {
    $type: "catalog.product.Product";
    fromJSON(object: any): Product;
    toJSON(message: Product): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        imageUrl?: string | undefined;
        distributionOutletId?: string | undefined;
        webLink?: string | undefined;
        openDefinitionId?: string | undefined;
        price?: {
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        imageUrl?: string | undefined;
        distributionOutletId?: string | undefined;
        webLink?: string | undefined;
        openDefinitionId?: string | undefined;
        price?: ({
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } & {
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } & { [K in Exclude<keyof I["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "distributionOutletId" | "webLink" | "openDefinitionId" | "price">]: never; }>(object: I): Product;
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
