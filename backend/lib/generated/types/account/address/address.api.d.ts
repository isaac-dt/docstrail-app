import * as _m0 from "protobufjs/minimal";
import { User } from "../user/user";
import { Address } from "./address";
export declare const protobufPackage = "account.address";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 2
 */
export interface WriteAddressRequest {
    street: string;
    unit: string | undefined;
    city: string;
    zip: string;
    countryCode: number | undefined;
    userId: string;
}
/**
 * Used for fetching a single address.
 * Next Id: 3
 */
export interface GetAddressResponse {
    address: Address | undefined;
    user: User | undefined;
}
/**
 * Used for Listing addresses.
 * Next Id: 3
 */
export interface ListAddressResponse {
    addresses: Address[];
    count: number;
}
export declare const WriteAddressRequest: {
    encode(message: WriteAddressRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteAddressRequest;
    fromJSON(object: any): WriteAddressRequest;
    toJSON(message: WriteAddressRequest): unknown;
    fromPartial<I extends {
        street?: string | undefined;
        unit?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
        userId?: string | undefined;
    } & {
        street?: string | undefined;
        unit?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
        userId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof WriteAddressRequest>]: never; }>(object: I): WriteAddressRequest;
};
export declare const GetAddressResponse: {
    encode(message: GetAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetAddressResponse;
    fromJSON(object: any): GetAddressResponse;
    toJSON(message: GetAddressResponse): unknown;
    fromPartial<I extends {
        address?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            unit?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            userId?: string | undefined;
        } | undefined;
        user?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: import("../user/user").UserRole[] | undefined;
            teamId?: string | undefined;
        } | undefined;
    } & {
        address?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            unit?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            userId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            unit?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            userId?: string | undefined;
        } & { [K in Exclude<keyof I["address"], keyof Address>]: never; }) | undefined;
        user?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: import("../user/user").UserRole[] | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: (import("../user/user").UserRole[] & import("../user/user").UserRole[] & { [K_1 in Exclude<keyof I["user"]["roles"], keyof import("../user/user").UserRole[]>]: never; }) | undefined;
            teamId?: string | undefined;
        } & { [K_2 in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof GetAddressResponse>]: never; }>(object: I): GetAddressResponse;
};
export declare const ListAddressResponse: {
    encode(message: ListAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListAddressResponse;
    fromJSON(object: any): ListAddressResponse;
    toJSON(message: ListAddressResponse): unknown;
    fromPartial<I extends {
        addresses?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            unit?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            userId?: string | undefined;
        }[] | undefined;
        count?: number | undefined;
    } & {
        addresses?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            unit?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            userId?: string | undefined;
        }[] & ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            unit?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            userId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            unit?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            userId?: string | undefined;
        } & { [K in Exclude<keyof I["addresses"][number], keyof Address>]: never; })[] & { [K_1 in Exclude<keyof I["addresses"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            street?: string | undefined;
            unit?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
            userId?: string | undefined;
        }[]>]: never; }) | undefined;
        count?: number | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ListAddressResponse>]: never; }>(object: I): ListAddressResponse;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
