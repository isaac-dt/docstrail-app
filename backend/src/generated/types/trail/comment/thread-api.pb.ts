/* eslint-disable */
import { User } from "../../account/user/user.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { Proposal } from "../proposal/proposal.pb";
import { CommentMessage } from "./message.pb";
import {
  CommentThread,
  CommentThread_GraphScreenshot,
  CommentThread_Type,
  commentThread_TypeFromJSON,
  commentThread_TypeToJSON,
} from "./thread.pb";

export const protobufPackage = "trail.comment";

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

function createBaseWriteCommentThreadRequest(): WriteCommentThreadRequest {
  return {
    $type: "trail.comment.WriteCommentThreadRequest",
    proposalId: undefined,
    screenshot: undefined,
    diagramXml: undefined,
    type: CommentThread_Type.UNKNOWN_TYPE,
  };
}

export const WriteCommentThreadRequest = {
  $type: "trail.comment.WriteCommentThreadRequest" as const,

  fromJSON(object: any): WriteCommentThreadRequest {
    return {
      $type: WriteCommentThreadRequest.$type,
      proposalId: isSet(object.proposalId) ? String(object.proposalId) : undefined,
      screenshot: isSet(object.screenshot) ? CommentThread_GraphScreenshot.fromJSON(object.screenshot) : undefined,
      diagramXml: isSet(object.diagramXml) ? String(object.diagramXml) : undefined,
      type: isSet(object.type) ? commentThread_TypeFromJSON(object.type) : CommentThread_Type.UNKNOWN_TYPE,
    };
  },

  toJSON(message: WriteCommentThreadRequest): unknown {
    const obj: any = {};
    message.proposalId !== undefined && (obj.proposalId = message.proposalId);
    message.screenshot !== undefined &&
      (obj.screenshot = message.screenshot ? CommentThread_GraphScreenshot.toJSON(message.screenshot) : undefined);
    message.diagramXml !== undefined && (obj.diagramXml = message.diagramXml);
    message.type !== undefined && (obj.type = commentThread_TypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteCommentThreadRequest>, I>>(object: I): WriteCommentThreadRequest {
    const message = createBaseWriteCommentThreadRequest() as any;
    message.proposalId = object.proposalId ?? undefined;
    message.screenshot = (object.screenshot !== undefined && object.screenshot !== null)
      ? CommentThread_GraphScreenshot.fromPartial(object.screenshot)
      : undefined;
    message.diagramXml = object.diagramXml ?? undefined;
    message.type = object.type ?? CommentThread_Type.UNKNOWN_TYPE;
    return message;
  },
};

messageTypeRegistry.set(WriteCommentThreadRequest.$type, WriteCommentThreadRequest);

function createBaseGetCommentThreadResponse(): GetCommentThreadResponse {
  return {
    $type: "trail.comment.GetCommentThreadResponse",
    commentThread: undefined,
    commentMessages: [],
    proposal: undefined,
    creator: undefined,
  };
}

export const GetCommentThreadResponse = {
  $type: "trail.comment.GetCommentThreadResponse" as const,

  fromJSON(object: any): GetCommentThreadResponse {
    return {
      $type: GetCommentThreadResponse.$type,
      commentThread: isSet(object.commentThread) ? CommentThread.fromJSON(object.commentThread) : undefined,
      commentMessages: Array.isArray(object?.commentMessages)
        ? object.commentMessages.map((e: any) => CommentMessage.fromJSON(e))
        : [],
      proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined,
      creator: isSet(object.creator) ? User.fromJSON(object.creator) : undefined,
    };
  },

  toJSON(message: GetCommentThreadResponse): unknown {
    const obj: any = {};
    message.commentThread !== undefined &&
      (obj.commentThread = message.commentThread ? CommentThread.toJSON(message.commentThread) : undefined);
    if (message.commentMessages) {
      obj.commentMessages = message.commentMessages.map((e) => e ? CommentMessage.toJSON(e) : undefined);
    } else {
      obj.commentMessages = [];
    }
    message.proposal !== undefined && (obj.proposal = message.proposal ? Proposal.toJSON(message.proposal) : undefined);
    message.creator !== undefined && (obj.creator = message.creator ? User.toJSON(message.creator) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCommentThreadResponse>, I>>(object: I): GetCommentThreadResponse {
    const message = createBaseGetCommentThreadResponse() as any;
    message.commentThread = (object.commentThread !== undefined && object.commentThread !== null)
      ? CommentThread.fromPartial(object.commentThread)
      : undefined;
    message.commentMessages = object.commentMessages?.map((e) => CommentMessage.fromPartial(e)) || [];
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? User.fromPartial(object.creator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetCommentThreadResponse.$type, GetCommentThreadResponse);

function createBaseListCommentThreadResponse(): ListCommentThreadResponse {
  return {
    $type: "trail.comment.ListCommentThreadResponse",
    commentThreads: [],
    creators: [],
    commentMessagesOfThreads: [],
    matchCount: 0,
  };
}

export const ListCommentThreadResponse = {
  $type: "trail.comment.ListCommentThreadResponse" as const,

  fromJSON(object: any): ListCommentThreadResponse {
    return {
      $type: ListCommentThreadResponse.$type,
      commentThreads: Array.isArray(object?.commentThreads)
        ? object.commentThreads.map((e: any) => CommentThread.fromJSON(e))
        : [],
      creators: Array.isArray(object?.creators)
        ? object.creators.map((e: any) => User.fromJSON(e))
        : [],
      commentMessagesOfThreads: Array.isArray(object?.commentMessagesOfThreads)
        ? object.commentMessagesOfThreads.map((e: any) => CommentMessage.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListCommentThreadResponse): unknown {
    const obj: any = {};
    if (message.commentThreads) {
      obj.commentThreads = message.commentThreads.map((e) => e ? CommentThread.toJSON(e) : undefined);
    } else {
      obj.commentThreads = [];
    }
    if (message.creators) {
      obj.creators = message.creators.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.creators = [];
    }
    if (message.commentMessagesOfThreads) {
      obj.commentMessagesOfThreads = message.commentMessagesOfThreads.map((e) =>
        e ? CommentMessage.toJSON(e) : undefined
      );
    } else {
      obj.commentMessagesOfThreads = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCommentThreadResponse>, I>>(object: I): ListCommentThreadResponse {
    const message = createBaseListCommentThreadResponse() as any;
    message.commentThreads = object.commentThreads?.map((e) => CommentThread.fromPartial(e)) || [];
    message.creators = object.creators?.map((e) => User.fromPartial(e)) || [];
    message.commentMessagesOfThreads = object.commentMessagesOfThreads?.map((e) => CommentMessage.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListCommentThreadResponse.$type, ListCommentThreadResponse);

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
