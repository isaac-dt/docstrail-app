import { JobRole } from "./job-role.pb";
export declare const protobufPackage = "account.job_role";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 4
 */
export interface WriteJobRoleRequest {
    $type: "account.job_role.WriteJobRoleRequest";
    readonly name: string | undefined;
    parent?: {
        $case: "clientId";
        clientId: string;
    } | {
        $case: "rootId";
        rootId: string;
    };
}
/**
 * Used for fetching a single job role.
 * Next Id: 2
 */
export interface GetJobRoleResponse {
    $type: "account.job_role.GetJobRoleResponse";
    readonly jobRole: JobRole | undefined;
}
/**
 * Used for Listing job roles.
 * Next Id: 3
 */
export interface ListJobRoleResponse {
    $type: "account.job_role.ListJobRoleResponse";
    readonly jobRoles: readonly JobRole[];
    readonly matchCount: number;
}
export declare const WriteJobRoleRequest: {
    $type: "account.job_role.WriteJobRoleRequest";
    fromJSON(object: any): WriteJobRoleRequest;
    toJSON(message: WriteJobRoleRequest): unknown;
    fromPartial<I extends {
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
    } & {
        name?: string | undefined;
        parent?: ({
            clientId?: string | undefined;
        } & {
            $case: "clientId";
        } & {
            clientId?: string | undefined;
            $case: "clientId";
        } & { [K in Exclude<keyof I["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
            rootId?: string | undefined;
        } & {
            $case: "rootId";
        } & {
            rootId?: string | undefined;
            $case: "rootId";
        } & { [K_1 in Exclude<keyof I["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "name" | "parent" | "$type">]: never; }>(object: I): WriteJobRoleRequest;
};
export declare const GetJobRoleResponse: {
    $type: "account.job_role.GetJobRoleResponse";
    fromJSON(object: any): GetJobRoleResponse;
    toJSON(message: GetJobRoleResponse): unknown;
    fromPartial<I extends {
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
            } & { [K in Exclude<keyof I["jobRole"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_1 in Exclude<keyof I["jobRole"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_2 in Exclude<keyof I["jobRole"], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "$type" | "jobRole">]: never; }>(object: I): GetJobRoleResponse;
};
export declare const ListJobRoleResponse: {
    $type: "account.job_role.ListJobRoleResponse";
    fromJSON(object: any): ListJobRoleResponse;
    toJSON(message: ListJobRoleResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        jobRoles?: readonly {
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
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        jobRoles?: (readonly {
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
        }[] & readonly ({
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
            } & { [K in Exclude<keyof I["jobRoles"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_1 in Exclude<keyof I["jobRoles"][number]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_2 in Exclude<keyof I["jobRoles"][number], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_3 in Exclude<keyof I["jobRoles"], "$type" | keyof readonly {
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
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "$type" | "matchCount" | "jobRoles">]: never; }>(object: I): ListJobRoleResponse;
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
