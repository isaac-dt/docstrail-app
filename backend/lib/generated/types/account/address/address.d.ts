import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "account.address";
/**
 * A physical residence address.
 * NextId: 10
 */
export interface Address {
    id: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    street: string;
    unit: string | undefined;
    city: string;
    zip: string;
    countryCode: number | undefined;
    userId: string;
}
export declare const Address: {
    encode(message: Address, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Address;
    fromJSON(object: any): Address;
    toJSON(message: Address): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        street?: string | undefined;
        unit?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
        userId?: string | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        street?: string | undefined;
        unit?: string | undefined;
        city?: string | undefined;
        zip?: string | undefined;
        countryCode?: number | undefined;
        userId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Address>]: never; }>(object: I): Address;
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
