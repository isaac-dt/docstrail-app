export declare const protobufPackage = "trail.comment";
/** Message associated to a comment thread. */
export interface CommentMessage {
    $type: "trail.comment.CommentMessage";
    readonly id: string | undefined;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly deletedAt: Date | undefined;
    readonly commentThreadId: string | undefined;
    readonly createdBy: string | undefined;
    readonly text: string | undefined;
}
export declare const CommentMessage: {
    $type: "trail.comment.CommentMessage";
    fromJSON(object: any): CommentMessage;
    toJSON(message: CommentMessage): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        text?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        deletedAt?: Date | undefined;
        createdBy?: string | undefined;
        commentThreadId?: string | undefined;
    } & {
        id?: string | undefined;
        text?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        deletedAt?: Date | undefined;
        createdBy?: string | undefined;
        commentThreadId?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "text" | "createdAt" | "$type" | "updatedAt" | "deletedAt" | "createdBy" | "commentThreadId">]: never; }>(object: I): CommentMessage;
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
