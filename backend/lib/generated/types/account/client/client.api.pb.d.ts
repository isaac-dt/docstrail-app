import { OpenDefinition } from "../../catalog/open-definition/open-definition.pb";
import { JobRole } from "../job-role/job-role.pb";
import { Team } from "../team/team.pb";
import { Client } from "./client.pb";
export declare const protobufPackage = "account.client";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 3
 */
export interface WriteClientRequest {
    $type: "account.client.WriteClientRequest";
    readonly name: string | undefined;
    readonly rootId: string | undefined;
}
/**
 * Used for fetching a single client.
 * Next Id: 5
 */
export interface GetClientResponse {
    $type: "account.client.GetClientResponse";
    readonly client: Client | undefined;
    readonly childrenTeams: readonly Team[];
    readonly jobRoles: readonly JobRole[];
    readonly openDefinitions: readonly OpenDefinition[];
}
/**
 * Used for Listing clients.
 * Next Id: 3
 */
export interface ListClientResponse {
    $type: "account.client.ListClientResponse";
    readonly clients: readonly Client[];
    readonly matchCount: number;
}
export declare const WriteClientRequest: {
    $type: "account.client.WriteClientRequest";
    fromJSON(object: any): WriteClientRequest;
    toJSON(message: WriteClientRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        rootId?: string | undefined;
    } & {
        name?: string | undefined;
        rootId?: string | undefined;
    } & { [K in Exclude<keyof I, "name" | "$type" | "rootId">]: never; }>(object: I): WriteClientRequest;
};
export declare const GetClientResponse: {
    $type: "account.client.GetClientResponse";
    fromJSON(object: any): GetClientResponse;
    toJSON(message: GetClientResponse): unknown;
    fromPartial<I extends {
        client?: {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } | undefined;
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
        childrenTeams?: readonly {
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
    } & {
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
        } & { [K in Exclude<keyof I["client"], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "rootId">]: never; }) | undefined;
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
            } & { [K_1 in Exclude<keyof I["jobRoles"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_2 in Exclude<keyof I["jobRoles"][number]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_3 in Exclude<keyof I["jobRoles"][number], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_4 in Exclude<keyof I["jobRoles"], "$type" | keyof readonly {
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
        childrenTeams?: (readonly {
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
        }[] & readonly ({
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
            } & { [K_5 in Exclude<keyof I["childrenTeams"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            } & {
                teamId?: string | undefined;
                $case: "teamId";
            } & { [K_6 in Exclude<keyof I["childrenTeams"][number]["parent"], "$type" | "$case" | "teamId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_7 in Exclude<keyof I["childrenTeams"][number], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_8 in Exclude<keyof I["childrenTeams"], "$type" | keyof readonly {
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
            } & { [K_9 in Exclude<keyof I["openDefinitions"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_10 in Exclude<keyof I["openDefinitions"][number]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        } & { [K_11 in Exclude<keyof I["openDefinitions"][number], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "coreDefinitionId" | "isTangible">]: never; })[] & { [K_12 in Exclude<keyof I["openDefinitions"], "$type" | keyof readonly {
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
    } & { [K_13 in Exclude<keyof I, "$type" | "client" | "jobRoles" | "childrenTeams" | "openDefinitions">]: never; }>(object: I): GetClientResponse;
};
export declare const ListClientResponse: {
    $type: "account.client.ListClientResponse";
    fromJSON(object: any): ListClientResponse;
    toJSON(message: ListClientResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        clients?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
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
        } & { [K in Exclude<keyof I["clients"][number], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "rootId">]: never; })[] & { [K_1 in Exclude<keyof I["clients"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "clients">]: never; }>(object: I): ListClientResponse;
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
