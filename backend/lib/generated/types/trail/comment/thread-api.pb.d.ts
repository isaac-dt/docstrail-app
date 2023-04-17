import { User } from "../../account/user/user.pb";
import { Proposal } from "../proposal/proposal.pb";
import { CommentMessage } from "./message.pb";
import { CommentThread, CommentThread_GraphScreenshot, CommentThread_Type } from "./thread.pb";
export declare const protobufPackage = "trail.comment";
/** Used for POST, PUT, and PATCH. */
export interface WriteCommentThreadRequest {
    $type: "trail.comment.WriteCommentThreadRequest";
    readonly proposalId: string | undefined;
    readonly screenshot: CommentThread_GraphScreenshot | undefined;
    readonly diagramXml: string | undefined;
    readonly type: CommentThread_Type;
}
/** Used for fetching a single item. */
export interface GetCommentThreadResponse {
    $type: "trail.comment.GetCommentThreadResponse";
    readonly commentThread: CommentThread | undefined;
    readonly commentMessages: readonly CommentMessage[];
    readonly proposal: Proposal | undefined;
    readonly creator: User | undefined;
}
/** Used for Listing items. */
export interface ListCommentThreadResponse {
    $type: "trail.comment.ListCommentThreadResponse";
    readonly commentThreads: readonly CommentThread[];
    readonly creators: readonly User[];
    readonly commentMessagesOfThreads: readonly CommentMessage[];
    readonly matchCount: number;
}
export declare const WriteCommentThreadRequest: {
    $type: "trail.comment.WriteCommentThreadRequest";
    fromJSON(object: any): WriteCommentThreadRequest;
    toJSON(message: WriteCommentThreadRequest): unknown;
    fromPartial<I extends {
        type?: CommentThread_Type | undefined;
        diagramXml?: string | undefined;
        proposalId?: string | undefined;
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
    } & {
        type?: CommentThread_Type | undefined;
        diagramXml?: string | undefined;
        proposalId?: string | undefined;
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
    } & { [K_1 in Exclude<keyof I, "type" | "$type" | "diagramXml" | "proposalId" | "screenshot">]: never; }>(object: I): WriteCommentThreadRequest;
};
export declare const GetCommentThreadResponse: {
    $type: "trail.comment.GetCommentThreadResponse";
    fromJSON(object: any): GetCommentThreadResponse;
    toJSON(message: GetCommentThreadResponse): unknown;
    fromPartial<I extends {
        proposal?: {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            diagramXml?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
        } | undefined;
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
        commentThread?: {
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
        } | undefined;
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
        proposal?: ({
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
        } & { [K in Exclude<keyof I["proposal"], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "diagramXml" | "deletedAt" | "createdBy">]: never; }) | undefined;
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
        } & { [K_1 in Exclude<keyof I["creator"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
        commentThread?: ({
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
            } & { [K_2 in Exclude<keyof I["commentThread"]["screenshot"], "$type" | "imageContainerOuterHtml" | "imageContainerWidth" | "imageContainerHeight" | "imageOuterHtml" | "imageWidth" | "imageHeight" | "imageMarginLeft" | "imageMarginTop">]: never; }) | undefined;
            isResolved?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I["commentThread"], "type" | "id" | "createdAt" | "$type" | "updatedAt" | "diagramXml" | "proposalId" | "deletedAt" | "createdBy" | "screenshot" | "isResolved">]: never; }) | undefined;
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
        } & { [K_4 in Exclude<keyof I["commentMessages"][number], "id" | "text" | "createdAt" | "$type" | "updatedAt" | "deletedAt" | "createdBy" | "commentThreadId">]: never; })[] & { [K_5 in Exclude<keyof I["commentMessages"], "$type" | keyof readonly {
            id?: string | undefined;
            text?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            commentThreadId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "$type" | "proposal" | "creator" | "commentThread" | "commentMessages">]: never; }>(object: I): GetCommentThreadResponse;
};
export declare const ListCommentThreadResponse: {
    $type: "trail.comment.ListCommentThreadResponse";
    fromJSON(object: any): ListCommentThreadResponse;
    toJSON(message: ListCommentThreadResponse): unknown;
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
        commentThreads?: readonly {
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
        }[] | undefined;
        commentMessagesOfThreads?: readonly {
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
        commentThreads?: (readonly {
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
        }[] & readonly ({
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
            } & { [K_2 in Exclude<keyof I["commentThreads"][number]["screenshot"], "$type" | "imageContainerOuterHtml" | "imageContainerWidth" | "imageContainerHeight" | "imageOuterHtml" | "imageWidth" | "imageHeight" | "imageMarginLeft" | "imageMarginTop">]: never; }) | undefined;
            isResolved?: boolean | undefined;
        } & { [K_3 in Exclude<keyof I["commentThreads"][number], "type" | "id" | "createdAt" | "$type" | "updatedAt" | "diagramXml" | "proposalId" | "deletedAt" | "createdBy" | "screenshot" | "isResolved">]: never; })[] & { [K_4 in Exclude<keyof I["commentThreads"], "$type" | keyof readonly {
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
        }[]>]: never; }) | undefined;
        commentMessagesOfThreads?: (readonly {
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
        } & { [K_5 in Exclude<keyof I["commentMessagesOfThreads"][number], "id" | "text" | "createdAt" | "$type" | "updatedAt" | "deletedAt" | "createdBy" | "commentThreadId">]: never; })[] & { [K_6 in Exclude<keyof I["commentMessagesOfThreads"], "$type" | keyof readonly {
            id?: string | undefined;
            text?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            commentThreadId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, "$type" | "matchCount" | "creators" | "commentThreads" | "commentMessagesOfThreads">]: never; }>(object: I): ListCommentThreadResponse;
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
