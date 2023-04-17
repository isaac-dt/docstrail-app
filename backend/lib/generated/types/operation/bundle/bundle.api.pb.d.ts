import { Template } from "../template/template.pb";
import { Bundle } from "./bundle.pb";
export declare const protobufPackage = "operation.bundle";
/** Next Id: 5 */
export interface WriteBundleRequest {
    $type: "operation.bundle.WriteBundleRequest";
    readonly name: string | undefined;
    readonly description: string | undefined;
    parent?: {
        $case: "clientId";
        clientId: string;
    } | {
        $case: "rootId";
        rootId: string;
    };
}
/** Next Id: 3 */
export interface GetBundleResponse {
    $type: "operation.bundle.GetBundleResponse";
    readonly bundle: Bundle | undefined;
    readonly templates: readonly Template[];
}
/** Next Id: 3 */
export interface ListBundleResponse {
    $type: "operation.bundle.ListBundleResponse";
    readonly bundles: readonly Bundle[];
    readonly matchCount: number;
}
export declare const WriteBundleRequest: {
    $type: "operation.bundle.WriteBundleRequest";
    fromJSON(object: any): WriteBundleRequest;
    toJSON(message: WriteBundleRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        description?: string | undefined;
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
        description?: string | undefined;
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
    } & { [K_2 in Exclude<keyof I, "name" | "description" | "parent" | "$type">]: never; }>(object: I): WriteBundleRequest;
};
export declare const GetBundleResponse: {
    $type: "operation.bundle.GetBundleResponse";
    fromJSON(object: any): GetBundleResponse;
    toJSON(message: GetBundleResponse): unknown;
    fromPartial<I extends {
        bundle?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
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
        templates?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[] | undefined;
    } & {
        bundle?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
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
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            } & {
                clientId?: string | undefined;
                $case: "clientId";
            } & { [K in Exclude<keyof I["bundle"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_1 in Exclude<keyof I["bundle"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_2 in Exclude<keyof I["bundle"], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
        templates?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } & { [K_3 in Exclude<keyof I["templates"][number], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "bundleId">]: never; })[] & { [K_4 in Exclude<keyof I["templates"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "$type" | "bundle" | "templates">]: never; }>(object: I): GetBundleResponse;
};
export declare const ListBundleResponse: {
    $type: "operation.bundle.ListBundleResponse";
    fromJSON(object: any): ListBundleResponse;
    toJSON(message: ListBundleResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        bundles?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
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
        bundles?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
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
            description?: string | undefined;
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
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            } & {
                clientId?: string | undefined;
                $case: "clientId";
            } & { [K in Exclude<keyof I["bundles"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_1 in Exclude<keyof I["bundles"][number]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_2 in Exclude<keyof I["bundles"][number], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_3 in Exclude<keyof I["bundles"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
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
    } & { [K_4 in Exclude<keyof I, "$type" | "matchCount" | "bundles">]: never; }>(object: I): ListBundleResponse;
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
