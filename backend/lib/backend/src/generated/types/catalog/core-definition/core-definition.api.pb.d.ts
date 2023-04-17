import { DistributionOutlet } from "../distribution/distribution.pb";
import { CoreDefinition, CoreDefinitionCategory } from "./core-definition.pb";
export declare const protobufPackage = "catalog.core_definition";
/** Next Id: 5 */
export interface WriteCoreDefinitionRequest {
    $type: "catalog.core_definition.WriteCoreDefinitionRequest";
    readonly name: string | undefined;
    readonly description: string | undefined;
    readonly category: CoreDefinitionCategory;
    readonly rootId: string | undefined;
}
/** Next Id: 3 */
export interface GetCoreDefinitionResponse {
    $type: "catalog.core_definition.GetCoreDefinitionResponse";
    readonly coreDefinition: CoreDefinition | undefined;
    readonly distributionOutlets: readonly DistributionOutlet[];
}
/** Next Id: 3 */
export interface ListCoreDefinitionResponse {
    $type: "catalog.core_definition.ListCoreDefinitionResponse";
    readonly coreDefinitions: readonly CoreDefinition[];
    readonly matchCount: number;
}
export declare const WriteCoreDefinitionRequest: {
    $type: "catalog.core_definition.WriteCoreDefinitionRequest";
    fromJSON(object: any): WriteCoreDefinitionRequest;
    toJSON(message: WriteCoreDefinitionRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        description?: string | undefined;
        category?: CoreDefinitionCategory | undefined;
        rootId?: string | undefined;
    } & {
        name?: string | undefined;
        description?: string | undefined;
        category?: CoreDefinitionCategory | undefined;
        rootId?: string | undefined;
    } & { [K in Exclude<keyof I, "name" | "description" | "category" | "$type" | "rootId">]: never; }>(object: I): WriteCoreDefinitionRequest;
};
export declare const GetCoreDefinitionResponse: {
    $type: "catalog.core_definition.GetCoreDefinitionResponse";
    fromJSON(object: any): GetCoreDefinitionResponse;
    toJSON(message: GetCoreDefinitionResponse): unknown;
    fromPartial<I extends {
        coreDefinition?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
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
            distributionMethod?: import("../distribution/distribution.pb").DistributionMethod | undefined;
        }[] | undefined;
    } & {
        coreDefinition?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K in Exclude<keyof I["coreDefinition"], "id" | "name" | "description" | "createdAt" | "category" | "$type" | "updatedAt" | "rootId">]: never; }) | undefined;
        distributionOutlets?: (readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("../distribution/distribution.pb").DistributionMethod | undefined;
        }[] & readonly ({
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
        } & { [K_1 in Exclude<keyof I["distributionOutlets"][number], "id" | "createdAt" | "$type" | "updatedAt" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; })[] & { [K_2 in Exclude<keyof I["distributionOutlets"], "$type" | keyof readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("../distribution/distribution.pb").DistributionMethod | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "$type" | "coreDefinition" | "distributionOutlets">]: never; }>(object: I): GetCoreDefinitionResponse;
};
export declare const ListCoreDefinitionResponse: {
    $type: "catalog.core_definition.ListCoreDefinitionResponse";
    fromJSON(object: any): ListCoreDefinitionResponse;
    toJSON(message: ListCoreDefinitionResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        coreDefinitions?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        coreDefinitions?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K in Exclude<keyof I["coreDefinitions"][number], "id" | "name" | "description" | "createdAt" | "category" | "$type" | "updatedAt" | "rootId">]: never; })[] & { [K_1 in Exclude<keyof I["coreDefinitions"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "coreDefinitions">]: never; }>(object: I): ListCoreDefinitionResponse;
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
