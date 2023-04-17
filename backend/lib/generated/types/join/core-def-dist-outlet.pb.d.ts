import { CoreDefinition } from "../catalog/core-definition/core-definition.pb";
import { DistributionOutlet } from "../catalog/distribution/distribution.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinCoreDefDistOutletRequest {
    $type: "join.JoinCoreDefDistOutletRequest";
    readonly coreDefinitionId: string;
    readonly distributionOutletId: string;
}
/** Next Id: 3 */
export interface JoinCoreDefDistOutletResponse {
    $type: "join.JoinCoreDefDistOutletResponse";
    readonly coreDefinition: CoreDefinition | undefined;
    readonly distributionOutlet: DistributionOutlet | undefined;
}
export declare const JoinCoreDefDistOutletRequest: {
    $type: "join.JoinCoreDefDistOutletRequest";
    fromJSON(object: any): JoinCoreDefDistOutletRequest;
    toJSON(message: JoinCoreDefDistOutletRequest): unknown;
    fromPartial<I extends {
        coreDefinitionId?: string | undefined;
        distributionOutletId?: string | undefined;
    } & {
        coreDefinitionId?: string | undefined;
        distributionOutletId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "coreDefinitionId" | "distributionOutletId">]: never; }>(object: I): JoinCoreDefDistOutletRequest;
};
export declare const JoinCoreDefDistOutletResponse: {
    $type: "join.JoinCoreDefDistOutletResponse";
    fromJSON(object: any): JoinCoreDefDistOutletResponse;
    toJSON(message: JoinCoreDefDistOutletResponse): unknown;
    fromPartial<I extends {
        coreDefinition?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../catalog/core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
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
            distributionMethod?: import("../catalog/distribution/distribution.pb").DistributionMethod | undefined;
        } | undefined;
    } & {
        coreDefinition?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../catalog/core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../catalog/core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K in Exclude<keyof I["coreDefinition"], "id" | "name" | "description" | "createdAt" | "category" | "$type" | "updatedAt" | "rootId">]: never; }) | undefined;
        distributionOutlet?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("../catalog/distribution/distribution.pb").DistributionMethod | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            webAddress?: string | undefined;
            companyId?: string | undefined;
            physicalAddressId?: string | undefined;
            customerServicePhoneNumber?: string | undefined;
            customerServiceEmail?: string | undefined;
            distributionMethod?: import("../catalog/distribution/distribution.pb").DistributionMethod | undefined;
        } & { [K_1 in Exclude<keyof I["distributionOutlet"], "id" | "createdAt" | "$type" | "updatedAt" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "coreDefinition" | "distributionOutlet">]: never; }>(object: I): JoinCoreDefDistOutletResponse;
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
