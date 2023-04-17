import { Client } from "../../account/client/client.pb";
import { AllowList } from "./allow-list.pb";
export declare const protobufPackage = "catalog.allow_list";
/** Next Id: 8 */
export interface WriteAllowListRequest {
    $type: "catalog.allow_list.WriteAllowListRequest";
    readonly clientId: string | undefined;
}
/** Next Id: 5 */
export interface GetAllowListResponse {
    $type: "catalog.allow_list.GetAllowListResponse";
    readonly allowList: AllowList | undefined;
    readonly client: Client | undefined;
}
export declare const WriteAllowListRequest: {
    $type: "catalog.allow_list.WriteAllowListRequest";
    fromJSON(object: any): WriteAllowListRequest;
    toJSON(message: WriteAllowListRequest): unknown;
    fromPartial<I extends {
        clientId?: string | undefined;
    } & {
        clientId?: string | undefined;
    } & { [K in Exclude<keyof I, "clientId" | "$type">]: never; }>(object: I): WriteAllowListRequest;
};
export declare const GetAllowListResponse: {
    $type: "catalog.allow_list.GetAllowListResponse";
    fromJSON(object: any): GetAllowListResponse;
    toJSON(message: GetAllowListResponse): unknown;
    fromPartial<I extends {
        client?: {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } | undefined;
        allowList?: {
            id?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
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
        } & { [K_1 in Exclude<keyof I["allowList"], "id" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "client" | "allowList">]: never; }>(object: I): GetAllowListResponse;
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
