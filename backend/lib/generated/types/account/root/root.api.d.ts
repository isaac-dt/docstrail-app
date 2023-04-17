import * as _m0 from "protobufjs/minimal";
import { Client } from "../client/client";
import { JobRole } from "../job-role/job-role";
import { Root } from "./root";
export declare const protobufPackage = "account.root";
/**
 * Used for fetching a single root.
 * Next Id: 4
 */
export interface GetRootResponse {
    root: Root | undefined;
    clients: Client[];
    jobRoles: JobRole[];
}
export declare const GetRootResponse: {
    encode(message: GetRootResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetRootResponse;
    fromJSON(object: any): GetRootResponse;
    toJSON(message: GetRootResponse): unknown;
    fromPartial<I extends {
        root?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        clients?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            rootId?: string | undefined;
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
        root?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["root"], keyof Root>]: never; }) | undefined;
        clients?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            rootId?: string | undefined;
        }[] & ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            rootId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["clients"][number], keyof Client>]: never; })[] & { [K_2 in Exclude<keyof I["clients"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            rootId?: string | undefined;
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
        } & { [K_3 in Exclude<keyof I["jobRoles"][number], keyof JobRole>]: never; })[] & { [K_4 in Exclude<keyof I["jobRoles"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof GetRootResponse>]: never; }>(object: I): GetRootResponse;
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
