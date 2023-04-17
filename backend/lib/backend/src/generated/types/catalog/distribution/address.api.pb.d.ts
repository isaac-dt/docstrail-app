import { OutletAddress } from "./address.pb";
import { DistributionOutlet } from "./distribution.pb";
export declare const protobufPackage = "catalog.distribution";
/** Next Id: 7 */
export interface WriteOutletAddressRequest {
    $type: "catalog.distribution.WriteOutletAddressRequest";
    readonly street: string | undefined;
    readonly unit: string | undefined;
    readonly city: string | undefined;
    readonly zip: string | undefined;
    readonly countryCode: number | undefined;
    readonly distributionOutletId: string | undefined;
}
/** Next Id: 3 */
export interface GetOutletAddressResponse {
    $type: "catalog.distribution.GetOutletAddressResponse";
    readonly address: OutletAddress | undefined;
    readonly distributionOutlet: DistributionOutlet | undefined;
}
/** Next Id: 3 */
export interface ListOutletAddressResponse {
    $type: "catalog.distribution.ListOutletAddressResponse";
    readonly addresses: readonly OutletAddress[];
    readonly matchCount: number;
}
export declare const WriteOutletAddressRequest: {
    $type: "catalog.distribution.WriteOutletAddressRequest";
    fromJSON(object: any): WriteOutletAddressRequest;
    toJSON(message: WriteOutletAddressRequest): unknown;
    fromPartial<I extends {
        unit?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
        distributionOutletId?: string | undefined;
    } & {
        unit?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
        distributionOutletId?: string | undefined;
    } & { [K in Exclude<keyof I, "unit" | "$type" | "street" | "city" | "zip" | "countryCode" | "distributionOutletId">]: never; }>(object: I): WriteOutletAddressRequest;
};
export declare const GetOutletAddressResponse: {
    $type: "catalog.distribution.GetOutletAddressResponse";
    fromJSON(object: any): GetOutletAddressResponse;
    toJSON(message: GetOutletAddressResponse): unknown;
    fromPartial<I extends {
        address?: {
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
        distributionOutlet?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("./distribution.pb").DistributionMethod | undefined;
        } | undefined;
    } & {
        address?: ({
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
        } & { [K in Exclude<keyof I["address"], "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "street" | "city" | "zip" | "countryCode" | "distributionOutletId">]: never; }) | undefined;
        distributionOutlet?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("./distribution.pb").DistributionMethod | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("./distribution.pb").DistributionMethod | undefined;
        } & { [K_1 in Exclude<keyof I["distributionOutlet"], "id" | "createdAt" | "$type" | "updatedAt" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "address" | "$type" | "distributionOutlet">]: never; }>(object: I): GetOutletAddressResponse;
};
export declare const ListOutletAddressResponse: {
    $type: "catalog.distribution.ListOutletAddressResponse";
    fromJSON(object: any): ListOutletAddressResponse;
    toJSON(message: ListOutletAddressResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        addresses?: readonly {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            distributionOutletId?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        addresses?: (readonly {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            distributionOutletId?: string | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["addresses"][number], "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "street" | "city" | "zip" | "countryCode" | "distributionOutletId">]: never; })[] & { [K_1 in Exclude<keyof I["addresses"], "$type" | keyof readonly {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            distributionOutletId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "addresses">]: never; }>(object: I): ListOutletAddressResponse;
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
