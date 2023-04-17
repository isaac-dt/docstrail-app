import { Price } from "../../shared.pb";
export declare const protobufPackage = "catalog.inventory";
/**
 * Represents a single purchase order for an inventory.
 * Next Id: 4
 */
export interface InventoryBatch {
    $type: "catalog.inventory.InventoryBatch";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly date: Date | undefined;
    readonly productId: string;
    readonly quatity: number;
    readonly price: Price | undefined;
}
export declare const InventoryBatch: {
    $type: "catalog.inventory.InventoryBatch";
    fromJSON(object: any): InventoryBatch;
    toJSON(message: InventoryBatch): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        date?: Date | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        productId?: string | undefined;
        price?: {
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } | undefined;
        quatity?: number | undefined;
    } & {
        id?: string | undefined;
        date?: Date | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        productId?: string | undefined;
        price?: ({
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } & {
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } & { [K in Exclude<keyof I["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
        quatity?: number | undefined;
    } & { [K_1 in Exclude<keyof I, "id" | "date" | "createdAt" | "$type" | "updatedAt" | "productId" | "price" | "quatity">]: never; }>(object: I): InventoryBatch;
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
