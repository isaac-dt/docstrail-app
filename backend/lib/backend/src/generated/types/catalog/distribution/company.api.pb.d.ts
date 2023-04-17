import { Company } from "./company.pb";
import { DistributionOutlet } from "./distribution.pb";
export declare const protobufPackage = "catalog.distribution";
/** Next Id: 4 */
export interface WriteCompanyRequest {
    $type: "catalog.distribution.WriteCompanyRequest";
    readonly rootId: string | undefined;
    readonly legalName: string | undefined;
    readonly webAddress: string | undefined;
}
/** Next Id: 3 */
export interface GetCompanyResponse {
    $type: "catalog.distribution.GetCompanyResponse";
    readonly company: Company | undefined;
    readonly distributionOutlets: readonly DistributionOutlet[];
}
/** Next Id: 3 */
export interface ListCompanyResponse {
    $type: "catalog.distribution.ListCompanyResponse";
    readonly companies: readonly Company[];
    readonly matchCount: number;
}
export declare const WriteCompanyRequest: {
    $type: "catalog.distribution.WriteCompanyRequest";
    fromJSON(object: any): WriteCompanyRequest;
    toJSON(message: WriteCompanyRequest): unknown;
    fromPartial<I extends {
        rootId?: string | undefined;
        legalName?: string | undefined;
        webAddress?: string | undefined;
    } & {
        rootId?: string | undefined;
        legalName?: string | undefined;
        webAddress?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "rootId" | "legalName" | "webAddress">]: never; }>(object: I): WriteCompanyRequest;
};
export declare const GetCompanyResponse: {
    $type: "catalog.distribution.GetCompanyResponse";
    fromJSON(object: any): GetCompanyResponse;
    toJSON(message: GetCompanyResponse): unknown;
    fromPartial<I extends {
        company?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        } | undefined;
        distributionOutlets?: readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("./distribution.pb").DistributionMethod | undefined;
        }[] | undefined;
    } & {
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
        } & { [K in Exclude<keyof I["company"], "id" | "createdAt" | "$type" | "updatedAt" | "rootId" | "legalName" | "webAddress">]: never; }) | undefined;
        distributionOutlets?: (readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("./distribution.pb").DistributionMethod | undefined;
        }[] & readonly ({
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
        } & { [K_1 in Exclude<keyof I["distributionOutlets"][number], "id" | "createdAt" | "$type" | "updatedAt" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; })[] & { [K_2 in Exclude<keyof I["distributionOutlets"], "$type" | keyof readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("./distribution.pb").DistributionMethod | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "$type" | "company" | "distributionOutlets">]: never; }>(object: I): GetCompanyResponse;
};
export declare const ListCompanyResponse: {
    $type: "catalog.distribution.ListCompanyResponse";
    fromJSON(object: any): ListCompanyResponse;
    toJSON(message: ListCompanyResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        companies?: readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        companies?: (readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["companies"][number], "id" | "createdAt" | "$type" | "updatedAt" | "rootId" | "legalName" | "webAddress">]: never; })[] & { [K_1 in Exclude<keyof I["companies"], "$type" | keyof readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "companies">]: never; }>(object: I): ListCompanyResponse;
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
