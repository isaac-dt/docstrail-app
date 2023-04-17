export declare const protobufPackage = "catalog.distribution";
/** Next Id: 3 */
export declare enum DistributionMethod {
    DELIVERY = "DELIVERY",
    PICK_UP = "PICK_UP",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function distributionMethodFromJSON(object: any): DistributionMethod;
export declare function distributionMethodToJSON(object: DistributionMethod): string;
/**
 * A full Description of a product distribution outlet.
 * Example: Amazon.com website, or Target at Canton GA.
 * Next Id: 10
 */
export interface DistributionOutlet {
    $type: "catalog.distribution.DistributionOutlet";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly companyId: string;
    readonly physicalAddressId: string;
    readonly webAddress: string | undefined;
    readonly customerServicePhoneNumber: string | undefined;
    readonly customerServiceEmail: string | undefined;
    readonly distributionMethod: DistributionMethod;
}
export declare const DistributionOutlet: {
    $type: "catalog.distribution.DistributionOutlet";
    fromJSON(object: any): DistributionOutlet;
    toJSON(message: DistributionOutlet): unknown;
    fromPartial<I extends {
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
    } & { [K in Exclude<keyof I, "id" | "createdAt" | "$type" | "updatedAt" | "webAddress" | "companyId" | "physicalAddressId" | "customerServicePhoneNumber" | "customerServiceEmail" | "distributionMethod">]: never; }>(object: I): DistributionOutlet;
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
