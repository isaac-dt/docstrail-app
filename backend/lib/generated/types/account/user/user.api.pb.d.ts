import { Client } from "../client/client.pb";
import { Team } from "../team/team.pb";
import { User } from "./user.pb";
export declare const protobufPackage = "account.user";
/** Next Id: 11 */
export interface WriteUserRequest {
    $type: "account.user.WriteUserRequest";
    readonly id: number | undefined;
    readonly fullName: string | undefined;
    readonly teamId: string | undefined;
    readonly role: string | undefined;
    readonly photoUrl: string | undefined;
    readonly email: string | undefined;
}
/** Next Id: 6 */
export interface GetUserResponse {
    $type: "account.user.GetUserResponse";
    readonly user: User | undefined;
    readonly team: Team | undefined;
    /**
     * repeated account.user.UserAddress addresses = 4;
     * repeated account.job_role.JobRole job_roles = 5;
     */
    readonly client: Client | undefined;
}
/** Next Id: 3 */
export interface ListUserResponse {
    $type: "account.user.ListUserResponse";
    readonly users: readonly User[];
    readonly matchCount: number;
}
export declare const WriteUserRequest: {
    $type: "account.user.WriteUserRequest";
    fromJSON(object: any): WriteUserRequest;
    toJSON(message: WriteUserRequest): unknown;
    fromPartial<I extends {
        id?: number | undefined;
        email?: string | undefined;
        photoUrl?: string | undefined;
        fullName?: string | undefined;
        role?: string | undefined;
        teamId?: string | undefined;
    } & {
        id?: number | undefined;
        email?: string | undefined;
        photoUrl?: string | undefined;
        fullName?: string | undefined;
        role?: string | undefined;
        teamId?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "email" | "photoUrl" | "$type" | "fullName" | "role" | "teamId">]: never; }>(object: I): WriteUserRequest;
};
export declare const GetUserResponse: {
    $type: "account.user.GetUserResponse";
    fromJSON(object: any): GetUserResponse;
    toJSON(message: GetUserResponse): unknown;
    fromPartial<I extends {
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
    } & { [K_5 in Exclude<keyof I, "user" | "$type" | "team" | "client">]: never; }>(object: I): GetUserResponse;
};
export declare const ListUserResponse: {
    $type: "account.user.ListUserResponse";
    fromJSON(object: any): ListUserResponse;
    toJSON(message: ListUserResponse): unknown;
    fromPartial<I extends {
        users?: readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("./user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] | undefined;
        matchCount?: number | undefined;
    } & {
        users?: (readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("./user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["users"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_1 in Exclude<keyof I["users"], "$type" | keyof readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("./user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
        matchCount?: number | undefined;
    } & { [K_2 in Exclude<keyof I, "users" | "$type" | "matchCount">]: never; }>(object: I): ListUserResponse;
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
