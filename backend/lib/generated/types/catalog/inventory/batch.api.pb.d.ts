import { Price } from "../../shared.pb";
import { Product } from "../product/product.pb";
import { InventoryBatch } from "./batch.pb";
export declare const protobufPackage = "catalog.inventory";
/** Next Id: 5 */
export interface WriteInventoryBatchRequest {
    $type: "catalog.inventory.WriteInventoryBatchRequest";
    readonly date: Date | undefined;
    readonly productId: string | undefined;
    readonly quatity: number | undefined;
    readonly price: Price | undefined;
}
/** Next Id: 3 */
export interface GetInventoryBatchResponse {
    $type: "catalog.inventory.GetInventoryBatchResponse";
    readonly product: Product | undefined;
    readonly inventoryBatch: InventoryBatch | undefined;
}
/** Next Id: 3 */
export interface ListInventoryBatchResponse {
    $type: "catalog.inventory.ListInventoryBatchResponse";
    readonly inventoryBatches: readonly InventoryBatch[];
    readonly matchCount: number;
}
export declare const WriteInventoryBatchRequest: {
    $type: "catalog.inventory.WriteInventoryBatchRequest";
    fromJSON(object: any): WriteInventoryBatchRequest;
    toJSON(message: WriteInventoryBatchRequest): unknown;
    fromPartial<I extends {
        date?: Date | undefined;
        price?: {
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } | undefined;
        productId?: string | undefined;
        quatity?: number | undefined;
    } & {
        date?: Date | undefined;
        price?: ({
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } & {
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } & { [K in Exclude<keyof I["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
        productId?: string | undefined;
        quatity?: number | undefined;
    } & { [K_1 in Exclude<keyof I, "date" | "$type" | "price" | "productId" | "quatity">]: never; }>(object: I): WriteInventoryBatchRequest;
};
export declare const GetInventoryBatchResponse: {
    $type: "catalog.inventory.GetInventoryBatchResponse";
    fromJSON(object: any): GetInventoryBatchResponse;
    toJSON(message: GetInventoryBatchResponse): unknown;
    fromPartial<I extends {
        product?: {
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
        } | undefined;
        inventoryBatch?: {
            id?: string | undefined;
            date?: Date | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            price?: {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        } | undefined;
    } & {
        product?: ({
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
            } & { [K in Exclude<keyof I["product"]["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["product"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "distributionOutletId" | "webLink" | "openDefinitionId" | "price">]: never; }) | undefined;
        inventoryBatch?: ({
            id?: string | undefined;
            date?: Date | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            price?: {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        } & {
            id?: string | undefined;
            date?: Date | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            price?: ({
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } & {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } & { [K_2 in Exclude<keyof I["inventoryBatch"]["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        } & { [K_3 in Exclude<keyof I["inventoryBatch"], "id" | "date" | "createdAt" | "$type" | "updatedAt" | "price" | "productId" | "quatity">]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "$type" | "product" | "inventoryBatch">]: never; }>(object: I): GetInventoryBatchResponse;
};
export declare const ListInventoryBatchResponse: {
    $type: "catalog.inventory.ListInventoryBatchResponse";
    fromJSON(object: any): ListInventoryBatchResponse;
    toJSON(message: ListInventoryBatchResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        inventoryBatches?: readonly {
            id?: string | undefined;
            date?: Date | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            price?: {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        inventoryBatches?: (readonly {
            id?: string | undefined;
            date?: Date | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            price?: {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        }[] & readonly ({
            id?: string | undefined;
            date?: Date | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            price?: {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        } & {
            id?: string | undefined;
            date?: Date | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            price?: ({
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } & {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } & { [K in Exclude<keyof I["inventoryBatches"][number]["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        } & { [K_1 in Exclude<keyof I["inventoryBatches"][number], "id" | "date" | "createdAt" | "$type" | "updatedAt" | "price" | "productId" | "quatity">]: never; })[] & { [K_2 in Exclude<keyof I["inventoryBatches"], "$type" | keyof readonly {
            id?: string | undefined;
            date?: Date | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            price?: {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "$type" | "matchCount" | "inventoryBatches">]: never; }>(object: I): ListInventoryBatchResponse;
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
