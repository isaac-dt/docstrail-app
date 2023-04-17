import { Price } from "../../shared.pb";
import { CoreDefinition } from "../core-definition/core-definition.pb";
import { DistributionOutlet } from "../distribution/distribution.pb";
import { InventoryBatch } from "../inventory/batch.pb";
import { OpenDefinition } from "../open-definition/open-definition.pb";
import { Product } from "./product.pb";
export declare const protobufPackage = "catalog.product";
/** Next Id: 8 */
export interface WriteProductRequest {
    $type: "catalog.product.WriteProductRequest";
    readonly name: string | undefined;
    readonly description: string | undefined;
    readonly webLink: string | undefined;
    readonly imageUrl: string | undefined;
    readonly distributionOutletId: string | undefined;
    readonly openDefinitionId: string | undefined;
    readonly price: Price | undefined;
}
/** Next Id: 5 */
export interface GetProductResponse {
    $type: "catalog.product.GetProductResponse";
    readonly product: Product | undefined;
    readonly openDefinition: OpenDefinition | undefined;
    readonly coreDefinition: CoreDefinition | undefined;
    readonly distributionOutlet: DistributionOutlet | undefined;
    readonly inventoryBatches: readonly InventoryBatch[];
}
/** Next Id: 3 */
export interface ListProductResponse {
    $type: "catalog.product.ListProductResponse";
    readonly products: Product | undefined;
    readonly matchCount: number;
}
export declare const WriteProductRequest: {
    $type: "catalog.product.WriteProductRequest";
    fromJSON(object: any): WriteProductRequest;
    toJSON(message: WriteProductRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        description?: string | undefined;
        imageUrl?: string | undefined;
        openDefinitionId?: string | undefined;
        distributionOutletId?: string | undefined;
        webLink?: string | undefined;
        price?: {
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } | undefined;
    } & {
        name?: string | undefined;
        description?: string | undefined;
        imageUrl?: string | undefined;
        openDefinitionId?: string | undefined;
        distributionOutletId?: string | undefined;
        webLink?: string | undefined;
        price?: ({
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } & {
            currency?: import("../../shared.pb").Currency | undefined;
            date?: Date | undefined;
            amount?: number | undefined;
        } & { [K in Exclude<keyof I["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "name" | "description" | "$type" | "imageUrl" | "openDefinitionId" | "distributionOutletId" | "webLink" | "price">]: never; }>(object: I): WriteProductRequest;
};
export declare const GetProductResponse: {
    $type: "catalog.product.GetProductResponse";
    fromJSON(object: any): GetProductResponse;
    toJSON(message: GetProductResponse): unknown;
    fromPartial<I extends {
        openDefinition?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        } | undefined;
        coreDefinition?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } | undefined;
        distributionOutlet?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("../distribution/distribution.pb").DistributionMethod | undefined;
        } | undefined;
        product?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            openDefinitionId?: string | undefined;
            distributionOutletId?: string | undefined;
            webLink?: string | undefined;
            price?: {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } | undefined;
        } | undefined;
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
        openDefinition?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            } & {
                clientId?: string | undefined;
                $case: "clientId";
            } & { [K in Exclude<keyof I["openDefinition"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_1 in Exclude<keyof I["openDefinition"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["openDefinition"], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "coreDefinitionId" | "isTangible">]: never; }) | undefined;
        coreDefinition?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K_3 in Exclude<keyof I["coreDefinition"], "id" | "name" | "description" | "createdAt" | "category" | "$type" | "updatedAt" | "rootId">]: never; }) | undefined;
        distributionOutlet?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("../distribution/distribution.pb").DistributionMethod | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("../distribution/distribution.pb").DistributionMethod | undefined;
        } & { [K_4 in Exclude<keyof I["distributionOutlet"], "id" | "createdAt" | "$type" | "updatedAt" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; }) | undefined;
        product?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            openDefinitionId?: string | undefined;
            distributionOutletId?: string | undefined;
            webLink?: string | undefined;
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
            openDefinitionId?: string | undefined;
            distributionOutletId?: string | undefined;
            webLink?: string | undefined;
            price?: ({
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } & {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } & { [K_5 in Exclude<keyof I["product"]["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["product"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "openDefinitionId" | "distributionOutletId" | "webLink" | "price">]: never; }) | undefined;
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
            } & { [K_7 in Exclude<keyof I["inventoryBatches"][number]["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
            productId?: string | undefined;
            quatity?: number | undefined;
        } & { [K_8 in Exclude<keyof I["inventoryBatches"][number], "id" | "date" | "createdAt" | "$type" | "updatedAt" | "price" | "productId" | "quatity">]: never; })[] & { [K_9 in Exclude<keyof I["inventoryBatches"], "$type" | keyof readonly {
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
    } & { [K_10 in Exclude<keyof I, "$type" | "openDefinition" | "coreDefinition" | "distributionOutlet" | "product" | "inventoryBatches">]: never; }>(object: I): GetProductResponse;
};
export declare const ListProductResponse: {
    $type: "catalog.product.ListProductResponse";
    fromJSON(object: any): ListProductResponse;
    toJSON(message: ListProductResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        products?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            openDefinitionId?: string | undefined;
            distributionOutletId?: string | undefined;
            webLink?: string | undefined;
            price?: {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } | undefined;
        } | undefined;
    } & {
        matchCount?: number | undefined;
        products?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            openDefinitionId?: string | undefined;
            distributionOutletId?: string | undefined;
            webLink?: string | undefined;
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
            openDefinitionId?: string | undefined;
            distributionOutletId?: string | undefined;
            webLink?: string | undefined;
            price?: ({
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } & {
                currency?: import("../../shared.pb").Currency | undefined;
                date?: Date | undefined;
                amount?: number | undefined;
            } & { [K in Exclude<keyof I["products"]["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["products"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "openDefinitionId" | "distributionOutletId" | "webLink" | "price">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "products">]: never; }>(object: I): ListProductResponse;
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
