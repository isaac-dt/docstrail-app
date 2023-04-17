import { User } from "../../account/user/user.pb";
import { CommentMessage } from "./message.pb";
import { CommentThread } from "./thread.pb";
export declare const protobufPackage = "trail.comment";
/** Used for POST, PUT, and PATCH. */
export interface WriteCommentMessageRequest {
    $type: "trail.comment.WriteCommentMessageRequest";
    readonly commentThreadId: string | undefined;
    readonly text: string | undefined;
}
/** Used for fetching a single item. */
export interface GetCommentMessageResponse {
    $type: "trail.comment.GetCommentMessageResponse";
    readonly commentMessage: CommentMessage | undefined;
    readonly commentThread: CommentThread | undefined;
    readonly creator: User | undefined;
}
/** Used for Listing items. */
export interface ListCommentMessageResponse {
    $type: "trail.comment.ListCommentMessageResponse";
    readonly commentMessages: readonly CommentMessage[];
    readonly creators: readonly User[];
    readonly matchCount: number;
}
export declare const WriteCommentMessageRequest: {
    $type: "trail.comment.WriteCommentMessageRequest";
    fromJSON(object: any): WriteCommentMessageRequest;
    toJSON(message: WriteCommentMessageRequest): unknown;
    fromPartial<I extends {
        text?: string | undefined;
        commentThreadId?: string | undefined;
    } & {
        text?: string | undefined;
        commentThreadId?: string | undefined;
    } & { [K in Exclude<keyof I, "text" | "$type" | "commentThreadId">]: never; }>(object: I): WriteCommentMessageRequest;
};
export declare const GetCommentMessageResponse: {
    $type: "trail.comment.GetCommentMessageResponse";
    fromJSON(object: any): GetCommentMessageResponse;
    toJSON(message: GetCommentMessageResponse): unknown;
    fromPartial<I extends {
        creator?: {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } | undefined;
        commentMessage?: {
            id?: string | undefined;
            text?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            commentThreadId?: string | undefined;
        } | undefined;
        commentThread?: {
            type?: import("./thread.pb").CommentThread_Type | undefined;
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
        } | undefined;
    } & {
        creator?: ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K in Exclude<keyof I["creator"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
        commentMessage?: ({
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
        } & { [K_1 in Exclude<keyof I["commentMessage"], "id" | "text" | "createdAt" | "$type" | "updatedAt" | "deletedAt" | "createdBy" | "commentThreadId">]: never; }) | undefined;
        commentThread?: ({
            type?: import("./thread.pb").CommentThread_Type | undefined;
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
            type?: import("./thread.pb").CommentThread_Type | undefined;
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
            } & { [K_2 in Exclude<keyof I["commentThread"]["screenshot"], "$type" | "imageContainerOuterHtml" | "imageContainerWidth" | "imageContainerHeight" | "imageOuterHtml" | "imageWidth" | "imageHeight" | "imageMarginLeft" | "imageMarginTop">]: never; }) | undefined;
            isResolved?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I["commentThread"], "type" | "id" | "createdAt" | "$type" | "updatedAt" | "diagramXml" | "proposalId" | "deletedAt" | "createdBy" | "screenshot" | "isResolved">]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "$type" | "creator" | "commentMessage" | "commentThread">]: never; }>(object: I): GetCommentMessageResponse;
};
export declare const ListCommentMessageResponse: {
    $type: "trail.comment.ListCommentMessageResponse";
    fromJSON(object: any): ListCommentMessageResponse;
    toJSON(message: ListCommentMessageResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        creators?: readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] | undefined;
        commentMessages?: readonly {
            id?: string | undefined;
            text?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            commentThreadId?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        creators?: (readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K in Exclude<keyof I["creators"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_1 in Exclude<keyof I["creators"], "$type" | keyof readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
        commentMessages?: (readonly {
            id?: string | undefined;
            text?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            commentThreadId?: string | undefined;
        }[] & readonly ({
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
        } & { [K_2 in Exclude<keyof I["commentMessages"][number], "id" | "text" | "createdAt" | "$type" | "updatedAt" | "deletedAt" | "createdBy" | "commentThreadId">]: never; })[] & { [K_3 in Exclude<keyof I["commentMessages"], "$type" | keyof readonly {
            id?: string | undefined;
            text?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            commentThreadId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "$type" | "matchCount" | "creators" | "commentMessages">]: never; }>(object: I): ListCommentMessageResponse;
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
