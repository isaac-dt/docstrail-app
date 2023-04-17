import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "";
export interface Profile {
    id: string | undefined;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}
export declare const Profile: {
    encode(message: Profile, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Profile;
    fromJSON(object: any): Profile;
    toJSON(message: Profile): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        phoneNumber?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & {
        id?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        phoneNumber?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof Profile>]: never; }>(object: I): Profile;
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
