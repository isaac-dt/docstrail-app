import { JobRole } from "../job-role/job-role.pb";
import { User } from "../user/user.pb";
export declare const protobufPackage = "account.join";
/** Next Id: 3 */
export interface JoinUserJobRoleRequest {
    $type: "account.join.JoinUserJobRoleRequest";
    readonly userId: string;
    readonly jobRoleId: string;
}
/** Next Id: 3 */
export interface JoinUserJobRoleResponse {
    $type: "account.join.JoinUserJobRoleResponse";
    readonly jobRole: JobRole | undefined;
    readonly user: User | undefined;
}
export declare const JoinUserJobRoleRequest: {
    $type: "account.join.JoinUserJobRoleRequest";
    fromJSON(object: any): JoinUserJobRoleRequest;
    toJSON(message: JoinUserJobRoleRequest): unknown;
    fromPartial<I extends {
        jobRoleId?: string | undefined;
        userId?: string | undefined;
    } & {
        jobRoleId?: string | undefined;
        userId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "jobRoleId" | "userId">]: never; }>(object: I): JoinUserJobRoleRequest;
};
export declare const JoinUserJobRoleResponse: {
    $type: "account.join.JoinUserJobRoleResponse";
    fromJSON(object: any): JoinUserJobRoleResponse;
    toJSON(message: JoinUserJobRoleResponse): unknown;
    fromPartial<I extends {
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
        jobRole?: {
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
    } & {
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
        } & { [K in Exclude<keyof I["user"], "id" | "email" | "createdAt" | "$type" | "updatedAt" | "firstName" | "lastName" | "birthMonth" | "role" | "teamId">]: never; }) | undefined;
        jobRole?: ({
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
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
            } & { [K_1 in Exclude<keyof I["jobRole"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_2 in Exclude<keyof I["jobRole"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_3 in Exclude<keyof I["jobRole"], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "user" | "$type" | "jobRole">]: never; }>(object: I): JoinUserJobRoleResponse;
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
