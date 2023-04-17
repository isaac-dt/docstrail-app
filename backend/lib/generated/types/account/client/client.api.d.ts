import * as _m0 from "protobufjs/minimal";
import { JobRole } from "../job-role/job-role";
import { Team } from "../team/team";
import { Client } from "./client";
export declare const protobufPackage = "account.client";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 3
 */
export interface WriteClientRequest {
    name: string;
    rootId: string;
}
/**
 * Used for fetching a single client.
 * Next Id: 4
 */
export interface GetClientResponse {
    client: Client | undefined;
    teams: Team[];
    jobRoles: JobRole[];
}
/**
 * Used for Listing clients.
 * Next Id: 3
 */
export interface ListClientResponse {
    clients: Client[];
    count: number;
}
export declare const WriteClientRequest: {
    encode(message: WriteClientRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteClientRequest;
    fromJSON(object: any): WriteClientRequest;
    toJSON(message: WriteClientRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        rootId?: string | undefined;
    } & {
        name?: string | undefined;
        rootId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof WriteClientRequest>]: never; }>(object: I): WriteClientRequest;
};
export declare const GetClientResponse: {
    encode(message: GetClientResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetClientResponse;
    fromJSON(object: any): GetClientResponse;
    toJSON(message: GetClientResponse): unknown;
    fromPartial<I extends {
        client?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            rootId?: string | undefined;
        } | undefined;
        teams?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
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
        client?: ({
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
        } & { [K in Exclude<keyof I["client"], keyof Client>]: never; }) | undefined;
        teams?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
        }[] & ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["teams"][number], keyof Team>]: never; })[] & { [K_2 in Exclude<keyof I["teams"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
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
    } & { [K_5 in Exclude<keyof I, keyof GetClientResponse>]: never; }>(object: I): GetClientResponse;
};
export declare const ListClientResponse: {
    encode(message: ListClientResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListClientResponse;
    fromJSON(object: any): ListClientResponse;
    toJSON(message: ListClientResponse): unknown;
    fromPartial<I extends {
        clients?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            rootId?: string | undefined;
        }[] | undefined;
        count?: number | undefined;
    } & {
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
        } & { [K in Exclude<keyof I["clients"][number], keyof Client>]: never; })[] & { [K_1 in Exclude<keyof I["clients"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
        count?: number | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ListClientResponse>]: never; }>(object: I): ListClientResponse;
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
