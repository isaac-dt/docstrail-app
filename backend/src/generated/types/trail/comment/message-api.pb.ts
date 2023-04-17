/* eslint-disable */
import { User } from "../../account/user/user.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { CommentMessage } from "./message.pb";
import { CommentThread } from "./thread.pb";

export const protobufPackage = "trail.comment";

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

function createBaseWriteCommentMessageRequest(): WriteCommentMessageRequest {
  return { $type: "trail.comment.WriteCommentMessageRequest", commentThreadId: undefined, text: undefined };
}

export const WriteCommentMessageRequest = {
  $type: "trail.comment.WriteCommentMessageRequest" as const,

  fromJSON(object: any): WriteCommentMessageRequest {
    return {
      $type: WriteCommentMessageRequest.$type,
      commentThreadId: isSet(object.commentThreadId) ? String(object.commentThreadId) : undefined,
      text: isSet(object.text) ? String(object.text) : undefined,
    };
  },

  toJSON(message: WriteCommentMessageRequest): unknown {
    const obj: any = {};
    message.commentThreadId !== undefined && (obj.commentThreadId = message.commentThreadId);
    message.text !== undefined && (obj.text = message.text);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteCommentMessageRequest>, I>>(object: I): WriteCommentMessageRequest {
    const message = createBaseWriteCommentMessageRequest() as any;
    message.commentThreadId = object.commentThreadId ?? undefined;
    message.text = object.text ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteCommentMessageRequest.$type, WriteCommentMessageRequest);

function createBaseGetCommentMessageResponse(): GetCommentMessageResponse {
  return {
    $type: "trail.comment.GetCommentMessageResponse",
    commentMessage: undefined,
    commentThread: undefined,
    creator: undefined,
  };
}

export const GetCommentMessageResponse = {
  $type: "trail.comment.GetCommentMessageResponse" as const,

  fromJSON(object: any): GetCommentMessageResponse {
    return {
      $type: GetCommentMessageResponse.$type,
      commentMessage: isSet(object.commentMessage) ? CommentMessage.fromJSON(object.commentMessage) : undefined,
      commentThread: isSet(object.commentThread) ? CommentThread.fromJSON(object.commentThread) : undefined,
      creator: isSet(object.creator) ? User.fromJSON(object.creator) : undefined,
    };
  },

  toJSON(message: GetCommentMessageResponse): unknown {
    const obj: any = {};
    message.commentMessage !== undefined &&
      (obj.commentMessage = message.commentMessage ? CommentMessage.toJSON(message.commentMessage) : undefined);
    message.commentThread !== undefined &&
      (obj.commentThread = message.commentThread ? CommentThread.toJSON(message.commentThread) : undefined);
    message.creator !== undefined && (obj.creator = message.creator ? User.toJSON(message.creator) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCommentMessageResponse>, I>>(object: I): GetCommentMessageResponse {
    const message = createBaseGetCommentMessageResponse() as any;
    message.commentMessage = (object.commentMessage !== undefined && object.commentMessage !== null)
      ? CommentMessage.fromPartial(object.commentMessage)
      : undefined;
    message.commentThread = (object.commentThread !== undefined && object.commentThread !== null)
      ? CommentThread.fromPartial(object.commentThread)
      : undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? User.fromPartial(object.creator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetCommentMessageResponse.$type, GetCommentMessageResponse);

function createBaseListCommentMessageResponse(): ListCommentMessageResponse {
  return { $type: "trail.comment.ListCommentMessageResponse", commentMessages: [], creators: [], matchCount: 0 };
}

export const ListCommentMessageResponse = {
  $type: "trail.comment.ListCommentMessageResponse" as const,

  fromJSON(object: any): ListCommentMessageResponse {
    return {
      $type: ListCommentMessageResponse.$type,
      commentMessages: Array.isArray(object?.commentMessages)
        ? object.commentMessages.map((e: any) => CommentMessage.fromJSON(e))
        : [],
      creators: Array.isArray(object?.creators)
        ? object.creators.map((e: any) => User.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListCommentMessageResponse): unknown {
    const obj: any = {};
    if (message.commentMessages) {
      obj.commentMessages = message.commentMessages.map((e) => e ? CommentMessage.toJSON(e) : undefined);
    } else {
      obj.commentMessages = [];
    }
    if (message.creators) {
      obj.creators = message.creators.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.creators = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCommentMessageResponse>, I>>(object: I): ListCommentMessageResponse {
    const message = createBaseListCommentMessageResponse() as any;
    message.commentMessages = object.commentMessages?.map((e) => CommentMessage.fromPartial(e)) || [];
    message.creators = object.creators?.map((e) => User.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListCommentMessageResponse.$type, ListCommentMessageResponse);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
