export declare const protobufPackage = "trail.proposal";
/** Proposal data. */
export interface Proposal {
    $type: "trail.proposal.Proposal";
    readonly id: string | undefined;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly deletedAt: Date | undefined;
    readonly createdBy: string | undefined;
    readonly diagramXml: string | undefined;
    readonly name: string | undefined;
}
export declare const Proposal: {
    $type: "trail.proposal.Proposal";
    fromJSON(object: any): Proposal;
    toJSON(message: Proposal): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        name?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        diagramXml?: string | undefined;
        deletedAt?: Date | undefined;
        createdBy?: string | undefined;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        diagramXml?: string | undefined;
        deletedAt?: Date | undefined;
        createdBy?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "name" | "createdAt" | "$type" | "updatedAt" | "diagramXml" | "deletedAt" | "createdBy">]: never; }>(object: I): Proposal;
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
