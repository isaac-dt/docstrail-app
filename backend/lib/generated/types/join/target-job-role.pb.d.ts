import { JobRole } from "../account/job-role/job-role.pb";
import { Target } from "../operation/target/target.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinTargetJobRoleRequest {
    $type: "join.JoinTargetJobRoleRequest";
    readonly targetId: string;
    readonly jobRoleId: string;
}
/** Next Id: 3 */
export interface JoinTargetJobRoleResponse {
    $type: "join.JoinTargetJobRoleResponse";
    readonly target: Target | undefined;
    readonly jobRole: JobRole | undefined;
}
export declare const JoinTargetJobRoleRequest: {
    $type: "join.JoinTargetJobRoleRequest";
    fromJSON(object: any): JoinTargetJobRoleRequest;
    toJSON(message: JoinTargetJobRoleRequest): unknown;
    fromPartial<I extends {
        jobRoleId?: string | undefined;
        targetId?: string | undefined;
    } & {
        jobRoleId?: string | undefined;
        targetId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "jobRoleId" | "targetId">]: never; }>(object: I): JoinTargetJobRoleRequest;
};
export declare const JoinTargetJobRoleResponse: {
    $type: "join.JoinTargetJobRoleResponse";
    fromJSON(object: any): JoinTargetJobRoleResponse;
    toJSON(message: JoinTargetJobRoleResponse): unknown;
    fromPartial<I extends {
        target?: {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
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
        target?: ({
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["target"], "id" | "name" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
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
    } & { [K_4 in Exclude<keyof I, "target" | "$type" | "jobRole">]: never; }>(object: I): JoinTargetJobRoleResponse;
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
