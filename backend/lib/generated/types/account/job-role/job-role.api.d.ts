import * as _m0 from "protobufjs/minimal";
import { JobRole } from "./job-role";
export declare const protobufPackage = "account.job_role";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 4
 */
export interface WriteJobRoleRequest {
    name: string;
    clientId: string | undefined;
    rootId: string | undefined;
}
/**
 * Used for fetching a single job role.
 * Next Id: 2
 */
export interface GetJobRoleResponse {
    jobRole: JobRole | undefined;
}
/**
 * Used for Listing job roles.
 * Next Id: 3
 */
export interface ListJobRoleResponse {
    jobRoles: JobRole[];
    count: number;
}
export declare const WriteJobRoleRequest: {
    encode(message: WriteJobRoleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteJobRoleRequest;
    fromJSON(object: any): WriteJobRoleRequest;
    toJSON(message: WriteJobRoleRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        clientId?: string | undefined;
        rootId?: string | undefined;
    } & {
        name?: string | undefined;
        clientId?: string | undefined;
        rootId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof WriteJobRoleRequest>]: never; }>(object: I): WriteJobRoleRequest;
};
export declare const GetJobRoleResponse: {
    encode(message: GetJobRoleResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetJobRoleResponse;
    fromJSON(object: any): GetJobRoleResponse;
    toJSON(message: GetJobRoleResponse): unknown;
    fromPartial<I extends {
        jobRole?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        } | undefined;
    } & {
        jobRole?: ({
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
        } & { [K in Exclude<keyof I["jobRole"], keyof JobRole>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "jobRole">]: never; }>(object: I): GetJobRoleResponse;
};
export declare const ListJobRoleResponse: {
    encode(message: ListJobRoleResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListJobRoleResponse;
    fromJSON(object: any): ListJobRoleResponse;
    toJSON(message: ListJobRoleResponse): unknown;
    fromPartial<I extends {
        jobRoles?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        }[] | undefined;
        count?: number | undefined;
    } & {
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
        } & { [K in Exclude<keyof I["jobRoles"][number], keyof JobRole>]: never; })[] & { [K_1 in Exclude<keyof I["jobRoles"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
        count?: number | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ListJobRoleResponse>]: never; }>(object: I): ListJobRoleResponse;
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
