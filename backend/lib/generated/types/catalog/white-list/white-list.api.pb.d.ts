import { Client } from "../../account/client/client.pb";
import { WhiteList } from "./white-list.pb";
export declare const protobufPackage = "catalog.white_list";
/** Next Id: 8 */
export interface WriteWhiteListRequest {
    $type: "catalog.white_list.WriteWhiteListRequest";
    readonly clientId: string | undefined;
}
/** Next Id: 5 */
export interface GetWhiteListResponse {
    $type: "catalog.white_list.GetWhiteListResponse";
    readonly whiteList: WhiteList | undefined;
    readonly client: Client | undefined;
}
export declare const WriteWhiteListRequest: {
    $type: "catalog.white_list.WriteWhiteListRequest";
    fromJSON(object: any): WriteWhiteListRequest;
    toJSON(message: WriteWhiteListRequest): unknown;
    fromPartial<I extends {
        clientId?: string | undefined;
    } & {
        clientId?: string | undefined;
    } & { [K in Exclude<keyof I, "clientId" | "$type">]: never; }>(object: I): WriteWhiteListRequest;
};
export declare const GetWhiteListResponse: {
    $type: "catalog.white_list.GetWhiteListResponse";
    fromJSON(object: any): GetWhiteListResponse;
    toJSON(message: GetWhiteListResponse): unknown;
    fromPartial<I extends {
        client?: {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } | undefined;
        whiteList?: {
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
        whiteList?: ({
            id?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_1 in Exclude<keyof I["whiteList"], "id" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "client" | "whiteList">]: never; }>(object: I): GetWhiteListResponse;
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
