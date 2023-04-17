import { InventoryBatch } from "../../catalog/inventory/batch.pb";
import { Product } from "../../catalog/product/product.pb";
import { DeliveryItem } from "./item.pb";
export declare const protobufPackage = "operation.bundle";
/** Next Id: 4 */
export interface WriteDeliveryItemRequest {
    $type: "operation.bundle.WriteDeliveryItemRequest";
    readonly quantity: number | undefined;
    readonly productId: string | undefined;
    readonly orderId: string | undefined;
}
/** Next Id: 4 */
export interface GetDeliveryItemResponse {
    $type: "operation.bundle.GetDeliveryItemResponse";
    readonly bundle: DeliveryItem | undefined;
    readonly product: Product | undefined;
    readonly inventoryBatch: InventoryBatch | undefined;
}
/** Next Id: 3 */
export interface ListDeliveryItemResponse {
    $type: "operation.bundle.ListDeliveryItemResponse";
    readonly deliveryItems: readonly DeliveryItem[];
    readonly matchCount: number;
}
export declare const WriteDeliveryItemRequest: {
    $type: "operation.bundle.WriteDeliveryItemRequest";
    fromJSON(object: any): WriteDeliveryItemRequest;
    toJSON(message: WriteDeliveryItemRequest): unknown;
    fromPartial<I extends {
        productId?: string | undefined;
        quantity?: number | undefined;
        orderId?: string | undefined;
    } & {
        productId?: string | undefined;
        quantity?: number | undefined;
        orderId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "productId" | "quantity" | "orderId">]: never; }>(object: I): WriteDeliveryItemRequest;
};
export declare const GetDeliveryItemResponse: {
    $type: "operation.bundle.GetDeliveryItemResponse";
    fromJSON(object: any): GetDeliveryItemResponse;
    toJSON(message: GetDeliveryItemResponse): unknown;
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
        bundle?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
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
        bundle?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        } & { [K_4 in Exclude<keyof I["bundle"], "id" | "createdAt" | "$type" | "updatedAt" | "productId" | "quantity" | "orderId">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "$type" | "product" | "inventoryBatch" | "bundle">]: never; }>(object: I): GetDeliveryItemResponse;
};
export declare const ListDeliveryItemResponse: {
    $type: "operation.bundle.ListDeliveryItemResponse";
    fromJSON(object: any): ListDeliveryItemResponse;
    toJSON(message: ListDeliveryItemResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        deliveryItems?: readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        deliveryItems?: (readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        } & { [K in Exclude<keyof I["deliveryItems"][number], "id" | "createdAt" | "$type" | "updatedAt" | "productId" | "quantity" | "orderId">]: never; })[] & { [K_1 in Exclude<keyof I["deliveryItems"], "$type" | keyof readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "deliveryItems">]: never; }>(object: I): ListDeliveryItemResponse;
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
