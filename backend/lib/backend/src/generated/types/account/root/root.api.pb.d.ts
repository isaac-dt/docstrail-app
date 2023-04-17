import { CoreDefinition } from "../../catalog/core-definition/core-definition.pb";
import { Company } from "../../catalog/distribution/company.pb";
import { OpenDefinition } from "../../catalog/open-definition/open-definition.pb";
import { Client } from "../client/client.pb";
import { JobRole } from "../job-role/job-role.pb";
import { Root } from "./root.pb";
export declare const protobufPackage = "account.root";
/**
 * Used for fetching a single root.
 * Next Id: 7
 */
export interface GetRootResponse {
    $type: "account.root.GetRootResponse";
    readonly root: Root | undefined;
    readonly clients: readonly Client[];
    readonly jobRoles: readonly JobRole[];
    readonly openDefinitions: readonly OpenDefinition[];
    readonly coreDefinitions: readonly CoreDefinition[];
    readonly companies: readonly Company[];
}
export declare const GetRootResponse: {
    $type: "account.root.GetRootResponse";
    fromJSON(object: any): GetRootResponse;
    toJSON(message: GetRootResponse): unknown;
    fromPartial<I extends {
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
        openDefinitions?: readonly {
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
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        }[] | undefined;
        clients?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] | undefined;
        root?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        coreDefinitions?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../../catalog/core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] | undefined;
        companies?: readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        }[] | undefined;
    } & {
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
        openDefinitions?: (readonly {
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
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
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
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
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
            } & { [K_4 in Exclude<keyof I["openDefinitions"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_5 in Exclude<keyof I["openDefinitions"][number]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        } & { [K_6 in Exclude<keyof I["openDefinitions"][number], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "coreDefinitionId" | "isTangible">]: never; })[] & { [K_7 in Exclude<keyof I["openDefinitions"], "$type" | keyof readonly {
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
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        }[]>]: never; }) | undefined;
        clients?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] & readonly ({
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
        } & { [K_8 in Exclude<keyof I["clients"][number], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "rootId">]: never; })[] & { [K_9 in Exclude<keyof I["clients"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
        root?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_10 in Exclude<keyof I["root"], "id" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
        coreDefinitions?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../../catalog/core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../../catalog/core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../../catalog/core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K_11 in Exclude<keyof I["coreDefinitions"][number], "id" | "name" | "description" | "createdAt" | "category" | "$type" | "updatedAt" | "rootId">]: never; })[] & { [K_12 in Exclude<keyof I["coreDefinitions"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../../catalog/core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
        companies?: (readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        } & { [K_13 in Exclude<keyof I["companies"][number], "id" | "createdAt" | "$type" | "updatedAt" | "rootId" | "legalName" | "webAddress">]: never; })[] & { [K_14 in Exclude<keyof I["companies"], "$type" | keyof readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            legalName?: string | undefined;
            webAddress?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_15 in Exclude<keyof I, "$type" | "jobRoles" | "openDefinitions" | "clients" | "root" | "coreDefinitions" | "companies">]: never; }>(object: I): GetRootResponse;
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
