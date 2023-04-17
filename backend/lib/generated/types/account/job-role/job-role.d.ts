import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "account.job_role";
/**
 * The position/job-responsibility of a user in their company.
 * Next Id: 7
 */
export interface JobRole {
    id: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    name: string;
    clientId: string | undefined;
    rootId: string | undefined;
}
export declare const JobRole: {
    encode(message: JobRole, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JobRole;
    fromJSON(object: any): JobRole;
    toJSON(message: JobRole): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        clientId?: string | undefined;
        rootId?: string | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        clientId?: string | undefined;
        rootId?: string | undefined;
    } & { [K in Exclude<keyof I, keyof JobRole>]: never; }>(object: I): JobRole;
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
