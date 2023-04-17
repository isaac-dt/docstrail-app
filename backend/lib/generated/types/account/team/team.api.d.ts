import * as _m0 from "protobufjs/minimal";
import { User } from "../user/user";
import { Team } from "./team";
export declare const protobufPackage = "account.team";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 4
 */
export interface WriteTeamRequest {
    name: string;
    clientId: string | undefined;
    teamId: string | undefined;
}
/**
 * Used for fetching a single team.
 * Next Id: 4
 */
export interface GetTeamResponse {
    team: Team | undefined;
    childrenTeams: Team[];
    users: User[];
}
/**
 * Used for Listing teams.
 * Next Id: 3
 */
export interface ListTeamResponse {
    teams: Team[];
    count: number;
}
export declare const WriteTeamRequest: {
    encode(message: WriteTeamRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): WriteTeamRequest;
    fromJSON(object: any): WriteTeamRequest;
    toJSON(message: WriteTeamRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        clientId?: string | undefined;
        teamId?: string | undefined;
    } & {
        name?: string | undefined;
        clientId?: string | undefined;
        teamId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof WriteTeamRequest>]: never; }>(object: I): WriteTeamRequest;
};
export declare const GetTeamResponse: {
    encode(message: GetTeamResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetTeamResponse;
    fromJSON(object: any): GetTeamResponse;
    toJSON(message: GetTeamResponse): unknown;
    fromPartial<I extends {
        team?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
        } | undefined;
        childrenTeams?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
        }[] | undefined;
        users?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: import("../user/user").UserRole[] | undefined;
            teamId?: string | undefined;
        }[] | undefined;
    } & {
        team?: ({
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
        } & { [K in Exclude<keyof I["team"], keyof Team>]: never; }) | undefined;
        childrenTeams?: ({
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
        } & { [K_1 in Exclude<keyof I["childrenTeams"][number], keyof Team>]: never; })[] & { [K_2 in Exclude<keyof I["childrenTeams"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
        users?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: import("../user/user").UserRole[] | undefined;
            teamId?: string | undefined;
        }[] & ({
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
            roles?: (import("../user/user").UserRole[] & import("../user/user").UserRole[] & { [K_3 in Exclude<keyof I["users"][number]["roles"], keyof import("../user/user").UserRole[]>]: never; }) | undefined;
            teamId?: string | undefined;
        } & { [K_4 in Exclude<keyof I["users"][number], keyof User>]: never; })[] & { [K_5 in Exclude<keyof I["users"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: import("../user/user").UserRole[] | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof GetTeamResponse>]: never; }>(object: I): GetTeamResponse;
};
export declare const ListTeamResponse: {
    encode(message: ListTeamResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ListTeamResponse;
    fromJSON(object: any): ListTeamResponse;
    toJSON(message: ListTeamResponse): unknown;
    fromPartial<I extends {
        teams?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
        }[] | undefined;
        count?: number | undefined;
    } & {
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
        } & { [K in Exclude<keyof I["teams"][number], keyof Team>]: never; })[] & { [K_1 in Exclude<keyof I["teams"], keyof {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
        count?: number | undefined;
    } & { [K_2 in Exclude<keyof I, keyof ListTeamResponse>]: never; }>(object: I): ListTeamResponse;
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
