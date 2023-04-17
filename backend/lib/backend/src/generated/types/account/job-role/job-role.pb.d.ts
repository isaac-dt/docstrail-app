export declare const protobufPackage = "account.job_role";
/**
 * The position/job-responsibility of a user in their company.
 * Next Id: 7
 */
export interface JobRole {
    $type: "account.job_role.JobRole";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly name: string;
    parent?: {
        $case: "clientId";
        clientId: string;
    } | {
        $case: "rootId";
        rootId: string;
    };
}
export declare const JobRole: {
    $type: "account.job_role.JobRole";
    fromJSON(object: any): JobRole;
    toJSON(message: JobRole): unknown;
    fromPartial<I extends {
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
        } & { [K in Exclude<keyof I["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
            rootId?: string | undefined;
        } & {
            $case: "rootId";
        } & {
            rootId?: string | undefined;
            $case: "rootId";
        } & { [K_1 in Exclude<keyof I["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & { [K_2 in Exclude<keyof I, "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }>(object: I): JobRole;
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
