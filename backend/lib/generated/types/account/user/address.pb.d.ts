export declare const protobufPackage = "account.user";
/**
 * A physical residence address.
 * NextId: 10
 */
export interface UserAddress {
    $type: "account.user.UserAddress";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly street: string;
    readonly unit: string | undefined;
    readonly city: string;
    readonly zip: string;
    readonly countryCode: number | undefined;
    readonly userId: string;
}
export declare const UserAddress: {
    $type: "account.user.UserAddress";
    fromJSON(object: any): UserAddress;
    toJSON(message: UserAddress): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        unit?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        userId?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
    } & {
        id?: string | undefined;
        unit?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        userId?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
    } & { [K in Exclude<keyof I, "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "userId" | "street" | "city" | "zip" | "countryCode">]: never; }>(object: I): UserAddress;
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
