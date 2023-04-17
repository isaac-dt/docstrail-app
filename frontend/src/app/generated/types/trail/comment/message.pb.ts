/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "trail.comment";

/** Message associated to a comment thread. */
export interface CommentMessage {
  $type: "trail.comment.CommentMessage";
  id: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
  commentThreadId: string | undefined;
  createdBy: string | undefined;
  text: string | undefined;
}

function createBaseCommentMessage(): CommentMessage {
  return {
    $type: "trail.comment.CommentMessage",
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    commentThreadId: undefined,
    createdBy: undefined,
    text: undefined,
  };
}

export const CommentMessage = {
  $type: "trail.comment.CommentMessage" as const,

  fromJSON(object: any): CommentMessage {
    return {
      $type: CommentMessage.$type,
      id: isSet(object.id) ? String(object.id) : undefined,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      deletedAt: isSet(object.deletedAt) ? fromJsonTimestamp(object.deletedAt) : undefined,
      commentThreadId: isSet(object.commentThreadId) ? String(object.commentThreadId) : undefined,
      createdBy: isSet(object.createdBy) ? String(object.createdBy) : undefined,
      text: isSet(object.text) ? String(object.text) : undefined,
    };
  },

  toJSON(message: CommentMessage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.deletedAt !== undefined && (obj.deletedAt = message.deletedAt.toISOString());
    message.commentThreadId !== undefined && (obj.commentThreadId = message.commentThreadId);
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.text !== undefined && (obj.text = message.text);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommentMessage>, I>>(object: I): CommentMessage {
    const message = createBaseCommentMessage();
    message.id = object.id ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.deletedAt = object.deletedAt ?? undefined;
    message.commentThreadId = object.commentThreadId ?? undefined;
    message.createdBy = object.createdBy ?? undefined;
    message.text = object.text ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(CommentMessage.$type, CommentMessage);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
