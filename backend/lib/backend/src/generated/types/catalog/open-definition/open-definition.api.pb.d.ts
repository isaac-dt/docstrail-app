import { CoreDefinition } from "../core-definition/core-definition.pb";
import { OpenDefinition } from "./open-definition.pb";
export declare const protobufPackage = "catalog.open_definition";
/** Next Id: 8 */
export interface WriteOpenDefinitionRequest {
    $type: "catalog.open_definition.WriteOpenDefinitionRequest";
    readonly name: string | undefined;
    readonly description: string | undefined;
    readonly imageUrl: string | undefined;
    parent?: {
        $case: "clientId";
        clientId: string;
    } | {
        $case: "rootId";
        rootId: string;
    };
    readonly coreDefinitionId: string | undefined;
    readonly isTangible: boolean | undefined;
}
/** Next Id: 3 */
export interface GetOpenDefinitionResponse {
    $type: "catalog.open_definition.GetOpenDefinitionResponse";
    readonly openDefinition: OpenDefinition | undefined;
    readonly coreDefinition: CoreDefinition | undefined;
}
/** Next Id: 3 */
export interface ListOpenDefinitionResponse {
    $type: "catalog.open_definition.ListOpenDefinitionResponse";
    readonly openDefinitions: readonly OpenDefinition[];
    readonly matchCount: number;
}
export declare const WriteOpenDefinitionRequest: {
    $type: "catalog.open_definition.WriteOpenDefinitionRequest";
    fromJSON(object: any): WriteOpenDefinitionRequest;
    toJSON(message: WriteOpenDefinitionRequest): unknown;
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
        imageUrl?: string | undefined;
        coreDefinitionId?: string | undefined;
        isTangible?: boolean | undefined;
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
        imageUrl?: string | undefined;
        coreDefinitionId?: string | undefined;
        isTangible?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, "name" | "description" | "parent" | "$type" | "imageUrl" | "coreDefinitionId" | "isTangible">]: never; }>(object: I): WriteOpenDefinitionRequest;
};
export declare const GetOpenDefinitionResponse: {
    $type: "catalog.open_definition.GetOpenDefinitionResponse";
    fromJSON(object: any): GetOpenDefinitionResponse;
    toJSON(message: GetOpenDefinitionResponse): unknown;
    fromPartial<I extends {
        coreDefinition?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } | undefined;
        openDefinition?: {
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
        } | undefined;
    } & {
        coreDefinition?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            category?: import("../core-definition/core-definition.pb").CoreDefinitionCategory | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K in Exclude<keyof I["coreDefinition"], "id" | "name" | "description" | "createdAt" | "category" | "$type" | "updatedAt" | "rootId">]: never; }) | undefined;
        openDefinition?: ({
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
            } & { [K_1 in Exclude<keyof I["openDefinition"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_2 in Exclude<keyof I["openDefinition"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I["openDefinition"], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "coreDefinitionId" | "isTangible">]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "$type" | "coreDefinition" | "openDefinition">]: never; }>(object: I): GetOpenDefinitionResponse;
};
export declare const ListOpenDefinitionResponse: {
    $type: "catalog.open_definition.ListOpenDefinitionResponse";
    fromJSON(object: any): ListOpenDefinitionResponse;
    toJSON(message: ListOpenDefinitionResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
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
        matchCount?: number | undefined;
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
            } & { [K in Exclude<keyof I["openDefinitions"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_1 in Exclude<keyof I["openDefinitions"][number]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["openDefinitions"][number], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "coreDefinitionId" | "isTangible">]: never; })[] & { [K_3 in Exclude<keyof I["openDefinitions"], "$type" | keyof readonly {
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
    } & { [K_4 in Exclude<keyof I, "$type" | "matchCount" | "openDefinitions">]: never; }>(object: I): ListOpenDefinitionResponse;
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
