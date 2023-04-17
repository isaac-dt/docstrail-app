import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "account.root";
/**
 * The most global construct; to which all global entities belong.
 * Next Id: 4
 */
export interface Root {
    id: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}
export declare const Root: {
    encode(message: Root, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Root;
    fromJSON(object: any): Root;
    toJSON(message: Root): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof Root>]: never; }>(object: I): Root;
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
