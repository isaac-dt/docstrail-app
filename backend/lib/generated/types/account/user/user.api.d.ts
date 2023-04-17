import * as _m0 from "protobufjs/minimal";
import { Address } from "../address/address";
import { JobRole } from "../job-role/job-role";
import { User, UserRole } from "./user";
export declare const protobufPackage = "account.user";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 7
 */
export interface WriteUserRequest {
    firstName: string;
    lastName: string;
    birthMonth: number | undefined;
    email: string;
    roles: UserRole[];
    teamId: string;
}
/**
 * Used for fetching a single user.
 * Next Id: 4
 */
export interface GetUserResponse {
    user: User | undefined;
    addresses: Address[];
    jobRoles: JobRole[];
}
/**
 * Used for Listing users.
 * Next Id: 3
 */
export interface ListUserResponse {
    users: User[];
    count: number;
}
export declare const WriteUserRequest: {
    encode(message: WriteUserRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteUserRequest;
    fromJSON(object: any): WriteUserRequest;
    toJSON(message: WriteUserRequest): unknown;
    fromPartial<I extends {
        firstName?: string | undefined;
        lastName?: string | undefined;
        birthMonth?: number | undefined;
        email?: string | undefined;
        roles?: UserRole[] | undefined;
        teamId?: string | undefined;
    } & {
        firstName?: string | undefined;
        lastName?: string | undefined;
        birthMonth?: number | undefined;
        email?: string | undefined;
        roles?: (UserRole[] & UserRole[] & { [K in Exclude<keyof I["roles"], keyof UserRole[]>]: never; }) | undefined;
        teamId?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof WriteUserRequest>]: never; }>(object: I): WriteUserRequest;
};
export declare const GetUserResponse: {
    encode(message: GetUserResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetUserResponse;
    fromJSON(object: any): GetUserResponse;
    toJSON(message: GetUserResponse): unknown;
    fromPartial<I extends {
        user?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: UserRole[] | undefined;
            teamId?: string | undefined;
        } | undefined;
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
        jobRoles?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        }[] | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: UserRole[] | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: (UserRole[] & UserRole[] & { [K in Exclude<keyof I["user"]["roles"], keyof UserRole[]>]: never; }) | undefined;
            teamId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
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
        } & { [K_2 in Exclude<keyof I["addresses"][number], keyof Address>]: never; })[] & { [K_3 in Exclude<keyof I["addresses"], keyof {
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
        jobRoles?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        }[] & ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        } & { [K_4 in Exclude<keyof I["jobRoles"][number], keyof JobRole>]: never; })[] & { [K_5 in Exclude<keyof I["jobRoles"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof GetUserResponse>]: never; }>(object: I): GetUserResponse;
};
export declare const ListUserResponse: {
    encode(message: ListUserResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListUserResponse;
    fromJSON(object: any): ListUserResponse;
    toJSON(message: ListUserResponse): unknown;
    fromPartial<I extends {
        users?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: UserRole[] | undefined;
            teamId?: string | undefined;
        }[] | undefined;
        count?: number | undefined;
    } & {
        users?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: UserRole[] | undefined;
            teamId?: string | undefined;
        }[] & ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: UserRole[] | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: (UserRole[] & UserRole[] & { [K in Exclude<keyof I["users"][number]["roles"], keyof UserRole[]>]: never; }) | undefined;
            teamId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["users"][number], keyof User>]: never; })[] & { [K_2 in Exclude<keyof I["users"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: UserRole[] | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
        count?: number | undefined;
    } & { [K_3 in Exclude<keyof I, keyof ListUserResponse>]: never; }>(object: I): ListUserResponse;
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
