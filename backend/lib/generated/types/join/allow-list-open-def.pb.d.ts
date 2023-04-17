import { AllowList } from "../catalog/allow-list/allow-list.pb";
import { OpenDefinition } from "../catalog/open-definition/open-definition.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinAllowListOpenDefinitionRequest {
    $type: "join.JoinAllowListOpenDefinitionRequest";
    readonly allowListId: string;
    readonly openDefinitionId: string;
}
/** Next Id: 3 */
export interface JoinAllowListOpenDefinitionResponse {
    $type: "join.JoinAllowListOpenDefinitionResponse";
    readonly allowList: AllowList | undefined;
    readonly openDefinition: OpenDefinition | undefined;
}
export declare const JoinAllowListOpenDefinitionRequest: {
    $type: "join.JoinAllowListOpenDefinitionRequest";
    fromJSON(object: any): JoinAllowListOpenDefinitionRequest;
    toJSON(message: JoinAllowListOpenDefinitionRequest): unknown;
    fromPartial<I extends {
        allowListId?: string | undefined;
        openDefinitionId?: string | undefined;
    } & {
        allowListId?: string | undefined;
        openDefinitionId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "allowListId" | "openDefinitionId">]: never; }>(object: I): JoinAllowListOpenDefinitionRequest;
};
export declare const JoinAllowListOpenDefinitionResponse: {
    $type: "join.JoinAllowListOpenDefinitionResponse";
    fromJSON(object: any): JoinAllowListOpenDefinitionResponse;
    toJSON(message: JoinAllowListOpenDefinitionResponse): unknown;
    fromPartial<I extends {
        allowList?: {
            id?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
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
        allowList?: ({
            id?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["allowList"], "id" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
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
    } & { [K_4 in Exclude<keyof I, "$type" | "allowList" | "openDefinition">]: never; }>(object: I): JoinAllowListOpenDefinitionResponse;
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
