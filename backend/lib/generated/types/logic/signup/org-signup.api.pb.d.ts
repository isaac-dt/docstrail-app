import { Client } from "../../account/client/client.pb";
import { Team } from "../../account/team/team.pb";
import { User, UserRole } from "../../account/user/user.pb";
export declare const protobufPackage = "account.user";
/** Next Id: 6 */
export interface WriteOrgSignupRequest {
    $type: "account.user.WriteOrgSignupRequest";
    readonly clientName: string | undefined;
    readonly userRole: UserRole;
    readonly userFullName: string | undefined;
    readonly photoUrl: string | undefined;
    readonly email: string | undefined;
}
/** Next Id: 4 */
export interface GetOrgSignupResponse {
    $type: "account.user.GetOrgSignupResponse";
    readonly user: User | undefined;
    readonly team: Team | undefined;
    readonly client: Client | undefined;
}
export declare const WriteOrgSignupRequest: {
    $type: "account.user.WriteOrgSignupRequest";
    fromJSON(object: any): WriteOrgSignupRequest;
    toJSON(message: WriteOrgSignupRequest): unknown;
    fromPartial<I extends {
        email?: string | undefined;
        photoUrl?: string | undefined;
        clientName?: string | undefined;
        userRole?: UserRole | undefined;
        userFullName?: string | undefined;
    } & {
        email?: string | undefined;
        photoUrl?: string | undefined;
        clientName?: string | undefined;
        userRole?: UserRole | undefined;
        userFullName?: string | undefined;
    } & { [K in Exclude<keyof I, "email" | "photoUrl" | "$type" | "clientName" | "userRole" | "userFullName">]: never; }>(object: I): WriteOrgSignupRequest;
};
export declare const GetOrgSignupResponse: {
    $type: "account.user.GetOrgSignupResponse";
    fromJSON(object: any): GetOrgSignupResponse;
    toJSON(message: GetOrgSignupResponse): unknown;
    fromPartial<I extends {
        user?: {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: UserRole | undefined;
            teamId?: string | undefined;
        } | undefined;
        team?: {
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        client?: {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: UserRole | undefined;
            teamId?: string | undefined;
        } & { [K in Exclude<keyof I["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
        team?: ({
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            } & {
                clientId?: string | undefined;
                $case: "clientId";
            } & { [K_1 in Exclude<keyof I["team"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            } & {
                teamId?: string | undefined;
                $case: "teamId";
            } & { [K_2 in Exclude<keyof I["team"]["parent"], "$type" | "$case" | "teamId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_3 in Exclude<keyof I["team"], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
        client?: ({
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K_4 in Exclude<keyof I["client"], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "rootId">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "user" | "$type" | "team" | "client">]: never; }>(object: I): GetOrgSignupResponse;
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
