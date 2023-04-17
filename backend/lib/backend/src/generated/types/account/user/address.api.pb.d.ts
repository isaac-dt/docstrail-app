import { UserAddress } from "./address.pb";
import { User } from "./user.pb";
export declare const protobufPackage = "account.user";
/** Next Id: 7 */
export interface WriteUserAddressRequest {
    $type: "account.user.WriteUserAddressRequest";
    readonly street: string | undefined;
    readonly unit: string | undefined;
    readonly city: string | undefined;
    readonly zip: string | undefined;
    readonly countryCode: number | undefined;
    readonly userId: string | undefined;
}
/** Next Id: 3 */
export interface GetUserAddressResponse {
    $type: "account.user.GetUserAddressResponse";
    readonly address: UserAddress | undefined;
    readonly user: User | undefined;
}
/** Next Id: 3 */
export interface ListUserAddressResponse {
    $type: "account.user.ListUserAddressResponse";
    readonly addresses: readonly UserAddress[];
    readonly matchCount: number;
}
export declare const WriteUserAddressRequest: {
    $type: "account.user.WriteUserAddressRequest";
    fromJSON(object: any): WriteUserAddressRequest;
    toJSON(message: WriteUserAddressRequest): unknown;
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
    } & { [K in Exclude<keyof I, "unit" | "$type" | "userId" | "street" | "city" | "zip" | "countryCode">]: never; }>(object: I): WriteUserAddressRequest;
};
export declare const GetUserAddressResponse: {
    $type: "account.user.GetUserAddressResponse";
    fromJSON(object: any): GetUserAddressResponse;
    toJSON(message: GetUserAddressResponse): unknown;
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
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("./user.pb").UserRole | undefined;
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
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("./user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("./user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "address" | "user" | "$type">]: never; }>(object: I): GetUserAddressResponse;
};
export declare const ListUserAddressResponse: {
    $type: "account.user.ListUserAddressResponse";
    fromJSON(object: any): ListUserAddressResponse;
    toJSON(message: ListUserAddressResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
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
    } & {
        matchCount?: number | undefined;
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
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "addresses">]: never; }>(object: I): ListUserAddressResponse;
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
