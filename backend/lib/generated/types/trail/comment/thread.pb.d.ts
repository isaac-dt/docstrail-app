export declare const protobufPackage = "trail.comment";
/** Comment Thread data. */
export interface CommentThread {
    $type: "trail.comment.CommentThread";
    readonly id: string | undefined;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly deletedAt: Date | undefined;
    readonly proposalId: string | undefined;
    readonly createdBy: string | undefined;
    readonly screenshot: CommentThread_GraphScreenshot | undefined;
    readonly diagramXml: string | undefined;
    readonly type: CommentThread_Type;
    readonly isResolved: boolean | undefined;
}
export declare enum CommentThread_Type {
    UNKNOWN_TYPE = "UNKNOWN_TYPE",
    QUESTION = "QUESTION",
    SUGGESTION = "SUGGESTION",
    NOTE = "NOTE",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function commentThread_TypeFromJSON(object: any): CommentThread_Type;
export declare function commentThread_TypeToJSON(object: CommentThread_Type): string;
export interface CommentThread_GraphScreenshot {
    $type: "trail.comment.CommentThread.GraphScreenshot";
    readonly imageContainerOuterHtml: string | undefined;
    readonly imageContainerWidth: number | undefined;
    readonly imageContainerHeight: number | undefined;
    readonly imageOuterHtml: string | undefined;
    readonly imageWidth: number | undefined;
    readonly imageHeight: number | undefined;
    readonly imageMarginLeft: number | undefined;
    readonly imageMarginTop: number | undefined;
}
export declare const CommentThread: {
    $type: "trail.comment.CommentThread";
    fromJSON(object: any): CommentThread;
    toJSON(message: CommentThread): unknown;
    fromPartial<I extends {
        type?: CommentThread_Type | undefined;
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        diagramXml?: string | undefined;
        proposalId?: string | undefined;
        deletedAt?: Date | undefined;
        createdBy?: string | undefined;
        screenshot?: {
            imageContainerOuterHtml?: string | undefined;
            imageContainerWidth?: number | undefined;
            imageContainerHeight?: number | undefined;
            imageOuterHtml?: string | undefined;
            imageWidth?: number | undefined;
            imageHeight?: number | undefined;
            imageMarginLeft?: number | undefined;
            imageMarginTop?: number | undefined;
        } | undefined;
        isResolved?: boolean | undefined;
    } & {
        type?: CommentThread_Type | undefined;
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        diagramXml?: string | undefined;
        proposalId?: string | undefined;
        deletedAt?: Date | undefined;
        createdBy?: string | undefined;
        screenshot?: ({
            imageContainerOuterHtml?: string | undefined;
            imageContainerWidth?: number | undefined;
            imageContainerHeight?: number | undefined;
            imageOuterHtml?: string | undefined;
            imageWidth?: number | undefined;
            imageHeight?: number | undefined;
            imageMarginLeft?: number | undefined;
            imageMarginTop?: number | undefined;
        } & {
            imageContainerOuterHtml?: string | undefined;
            imageContainerWidth?: number | undefined;
            imageContainerHeight?: number | undefined;
            imageOuterHtml?: string | undefined;
            imageWidth?: number | undefined;
            imageHeight?: number | undefined;
            imageMarginLeft?: number | undefined;
            imageMarginTop?: number | undefined;
        } & { [K in Exclude<keyof I["screenshot"], "$type" | "imageContainerOuterHtml" | "imageContainerWidth" | "imageContainerHeight" | "imageOuterHtml" | "imageWidth" | "imageHeight" | "imageMarginLeft" | "imageMarginTop">]: never; }) | undefined;
        isResolved?: boolean | undefined;
    } & { [K_1 in Exclude<keyof I, "type" | "id" | "createdAt" | "$type" | "updatedAt" | "diagramXml" | "proposalId" | "deletedAt" | "createdBy" | "screenshot" | "isResolved">]: never; }>(object: I): CommentThread;
};
export declare const CommentThread_GraphScreenshot: {
    $type: "trail.comment.CommentThread.GraphScreenshot";
    fromJSON(object: any): CommentThread_GraphScreenshot;
    toJSON(message: CommentThread_GraphScreenshot): unknown;
    fromPartial<I extends {
        imageContainerOuterHtml?: string | undefined;
        imageContainerWidth?: number | undefined;
        imageContainerHeight?: number | undefined;
        imageOuterHtml?: string | undefined;
        imageWidth?: number | undefined;
        imageHeight?: number | undefined;
        imageMarginLeft?: number | undefined;
        imageMarginTop?: number | undefined;
    } & {
        imageContainerOuterHtml?: string | undefined;
        imageContainerWidth?: number | undefined;
        imageContainerHeight?: number | undefined;
        imageOuterHtml?: string | undefined;
        imageWidth?: number | undefined;
        imageHeight?: number | undefined;
        imageMarginLeft?: number | undefined;
        imageMarginTop?: number | undefined;
    } & { [K in Exclude<keyof I, "$type" | "imageContainerOuterHtml" | "imageContainerWidth" | "imageContainerHeight" | "imageOuterHtml" | "imageWidth" | "imageHeight" | "imageMarginLeft" | "imageMarginTop">]: never; }>(object: I): CommentThread_GraphScreenshot;
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
