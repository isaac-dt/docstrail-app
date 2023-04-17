import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "account.client";
/**
 * Company onboarded with Dimetrail.
 * Next Id: 6
 */
export interface Client {
    id: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    name: string;
    rootId: string;
}
export declare const Client: {
    encode(message: Client, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Client;
    fromJSON(object: any): Client;
    toJSON(message: Client): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        rootId?: string | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        rootId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Client>]: never; }>(object: I): Client;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
