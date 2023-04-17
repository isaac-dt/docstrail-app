import { OpenDefinition } from "../catalog/open-definition/open-definition.pb";
import { Package } from "../operation/package/package.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinPackageOpenDefinitionRequest {
    $type: "join.JoinPackageOpenDefinitionRequest";
    readonly packageId: string;
    readonly openDefinitionId: string;
}
/** Next Id: 3 */
export interface JoinPackageOpenDefinitionResponse {
    $type: "join.JoinPackageOpenDefinitionResponse";
    readonly package: Package | undefined;
    readonly openDefinition: OpenDefinition | undefined;
}
export declare const JoinPackageOpenDefinitionRequest: {
    $type: "join.JoinPackageOpenDefinitionRequest";
    fromJSON(object: any): JoinPackageOpenDefinitionRequest;
    toJSON(message: JoinPackageOpenDefinitionRequest): unknown;
    fromPartial<I extends {
        packageId?: string | undefined;
        openDefinitionId?: string | undefined;
    } & {
        packageId?: string | undefined;
        openDefinitionId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "packageId" | "openDefinitionId">]: never; }>(object: I): JoinPackageOpenDefinitionRequest;
};
export declare const JoinPackageOpenDefinitionResponse: {
    $type: "join.JoinPackageOpenDefinitionResponse";
    fromJSON(object: any): JoinPackageOpenDefinitionResponse;
    toJSON(message: JoinPackageOpenDefinitionResponse): unknown;
    fromPartial<I extends {
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
        package?: {
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
    } & {
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
            } & { [K in Exclude<keyof I["openDefinition"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_1 in Exclude<keyof I["openDefinition"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            imageUrl?: string | undefined;
            coreDefinitionId?: string | undefined;
            isTangible?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["openDefinition"], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "coreDefinitionId" | "isTangible">]: never; }) | undefined;
        package?: ({
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
            } & { [K_3 in Exclude<keyof I["package"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_4 in Exclude<keyof I["package"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_5 in Exclude<keyof I["package"], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "$type" | "openDefinition" | "package">]: never; }>(object: I): JoinPackageOpenDefinitionResponse;
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
