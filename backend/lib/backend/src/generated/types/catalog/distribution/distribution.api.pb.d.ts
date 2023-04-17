import { CoreDefinition } from "../core-definition/core-definition.pb";
import { Product } from "../product/product.pb";
import { OutletAddress } from "./address.pb";
import { Company } from "./company.pb";
import { DistributionMethod, DistributionOutlet } from "./distribution.pb";
export declare const protobufPackage = "catalog.distribution";
/** Next Id: 8 */
export interface WriteDistributionOutletRequest {
    $type: "catalog.distribution.WriteDistributionOutletRequest";
    readonly name: string | undefined;
    readonly companyId: string | undefined;
    readonly physicalAddressId: string | undefined;
    readonly webAddress: string | undefined;
    readonly customerServicePhoneNumber: string | undefined;
    readonly customerServiceEmail: string | undefined;
    readonly distributionMethod: DistributionMethod;
}
/** Next Id: 7 */
export interface GetDistributionOutletResponse {
    $type: "catalog.distribution.GetDistributionOutletResponse";
    readonly distributionOutlet: DistributionOutlet | undefined;
    readonly company: Company | undefined;
    readonly physicalAddress: OutletAddress | undefined;
    readonly coreDefinitions: readonly CoreDefinition[];
    readonly products: readonly Product[];
}
/** Next Id: 3 */
export interface ListDistributionOutletResponse {
    $type: "catalog.distribution.ListDistributionOutletResponse";
    readonly distributionOutlets: readonly DistributionOutlet[];
    readonly matchCount: number;
}
export declare const WriteDistributionOutletRequest: {
    $type: "catalog.distribution.WriteDistributionOutletRequest";
    fromJSON(object: any): WriteDistributionOutletRequest;
    toJSON(message: WriteDistributionOutletRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        webAddress?: string | undefined;
        companyId?: string | undefined;
        physicalAddressId?: string | undefined;
        customerServicePhoneNumber?: string | undefined;
        customerServiceEmail?: string | undefined;
        distributionMethod?: DistributionMethod | undefined;
    } & {
        name?: string | undefined;
        webAddress?: string | undefined;
        companyId?: string | undefined;
        physicalAddressId?: string | undefined;
        customerServicePhoneNumber?: string | undefined;
        customerServiceEmail?: string | undefined;
        distributionMethod?: DistributionMethod | undefined;
    } & { [K in Exclude<keyof I, "name" | "$type" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; }>(object: I): WriteDistributionOutletRequest;
};
export declare const GetDistributionOutletResponse: {
    $type: "catalog.distribution.GetDistributionOutletResponse";
    fromJSON(object: any): GetDistributionOutletResponse;
    toJSON(message: GetDistributionOutletResponse): unknown;
    fromPartial<I extends {
        coreDefinitions?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] | undefined;
        company?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
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
            distributionMethod?: DistributionMethod | undefined;
        } | undefined;
        physicalAddress?: {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            distributionOutletId?: string | undefined;
        } | undefined;
        products?: readonly {
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
        }[] | undefined;
    } & {
        coreDefinitions?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["coreDefinitions"][number], "id" | "name" | "description" | "createdAt" | "category" | "$type" | "updatedAt" | "rootId">]: never; })[] & { [K_1 in Exclude<keyof I["coreDefinitions"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
        company?: ({
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
        } & { [K_2 in Exclude<keyof I["company"], "id" | "createdAt" | "$type" | "updatedAt" | "rootId" | "legalName" | "webAddress">]: never; }) | undefined;
        distributionOutlet?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: DistributionMethod | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: DistributionMethod | undefined;
        } & { [K_3 in Exclude<keyof I["distributionOutlet"], "id" | "createdAt" | "$type" | "updatedAt" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; }) | undefined;
        physicalAddress?: ({
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
        } & { [K_4 in Exclude<keyof I["physicalAddress"], "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "street" | "city" | "zip" | "countryCode" | "distributionOutletId">]: never; }) | undefined;
        products?: (readonly {
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
        }[] & readonly ({
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
            } & { [K_5 in Exclude<keyof I["products"][number]["price"], "currency" | "date" | "$type" | "amount">]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["products"][number], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "openDefinitionId" | "distributionOutletId" | "webLink" | "price">]: never; })[] & { [K_7 in Exclude<keyof I["products"], "$type" | keyof readonly {
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
        }[]>]: never; }) | undefined;
    } & { [K_8 in Exclude<keyof I, "$type" | "coreDefinitions" | "company" | "distributionOutlet" | "physicalAddress" | "products">]: never; }>(object: I): GetDistributionOutletResponse;
};
export declare const ListDistributionOutletResponse: {
    $type: "catalog.distribution.ListDistributionOutletResponse";
    fromJSON(object: any): ListDistributionOutletResponse;
    toJSON(message: ListDistributionOutletResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        distributionOutlets?: readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: DistributionMethod | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        distributionOutlets?: (readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: DistributionMethod | undefined;
        }[] & readonly ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: DistributionMethod | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: DistributionMethod | undefined;
        } & { [K in Exclude<keyof I["distributionOutlets"][number], "id" | "createdAt" | "$type" | "updatedAt" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; })[] & { [K_1 in Exclude<keyof I["distributionOutlets"], "$type" | keyof readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: DistributionMethod | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "distributionOutlets">]: never; }>(object: I): ListDistributionOutletResponse;
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
