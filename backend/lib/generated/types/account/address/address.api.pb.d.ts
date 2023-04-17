import { User } from "../user/user.pb";
import { Address } from "./address.pb";
export declare const protobufPackage = "account.address";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 2
 */
export interface WriteAddressRequest {
    $type: "account.address.WriteAddressRequest";
    readonly street: string | undefined;
    readonly unit: string | undefined;
    readonly city: string | undefined;
    readonly zip: string | undefined;
    readonly countryCode: number | undefined;
    readonly userId: string | undefined;
}
/**
 * Used for fetching a single address.
 * Next Id: 3
 */
export interface GetAddressResponse {
    $type: "account.address.GetAddressResponse";
    readonly address: Address | undefined;
    readonly user: User | undefined;
}
/**
 * Used for Listing addresses.
 * Next Id: 3
 */
export interface ListAddressResponse {
    $type: "account.address.ListAddressResponse";
    readonly addresses: readonly Address[];
    readonly matchCount: number;
}
export declare const WriteAddressRequest: {
    $type: "account.address.WriteAddressRequest";
    fromJSON(object: any): WriteAddressRequest;
    toJSON(message: WriteAddressRequest): unknown;
    fromPartial<I extends {
        unit?: string | undefined;
        userId?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
    } & {
        unit?: string | undefined;
        userId?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
    } & { [K in Exclude<keyof I, "unit" | "$type" | "userId" | "street" | "city" | "zip" | "countryCode">]: never; }>(object: I): WriteAddressRequest;
};
export declare const GetAddressResponse: {
    $type: "account.address.GetAddressResponse";
    fromJSON(object: any): GetAddressResponse;
    toJSON(message: GetAddressResponse): unknown;
    fromPartial<I extends {
        address?: {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
        } | undefined;
        user?: {
            id?: string | undefined;
            email?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            role?: import("../user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } | undefined;
    } & {
        address?: ({
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
        } & { [K in Exclude<keyof I["address"], "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "userId" | "street" | "city" | "zip" | "countryCode">]: never; }) | undefined;
        user?: ({
            id?: string | undefined;
            email?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            role?: import("../user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            role?: import("../user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["user"], "id" | "email" | "createdAt" | "$type" | "updatedAt" | "firstName" | "lastName" | "birthMonth" | "role" | "teamId">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "address" | "user" | "$type">]: never; }>(object: I): GetAddressResponse;
};
export declare const ListAddressResponse: {
    $type: "account.address.ListAddressResponse";
    fromJSON(object: any): ListAddressResponse;
    toJSON(message: ListAddressResponse): unknown;
    fromPartial<I extends {
        addresses?: readonly {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
        }[] | undefined;
        matchCount?: number | undefined;
    } & {
        addresses?: (readonly {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["addresses"][number], "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "userId" | "street" | "city" | "zip" | "countryCode">]: never; })[] & { [K_1 in Exclude<keyof I["addresses"], "$type" | keyof readonly {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
        }[]>]: never; }) | undefined;
        matchCount?: number | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "addresses" | "matchCount">]: never; }>(object: I): ListAddressResponse;
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
