/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "trail.comment";

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

export enum CommentThread_Type {
  UNKNOWN_TYPE = "UNKNOWN_TYPE",
  QUESTION = "QUESTION",
  SUGGESTION = "SUGGESTION",
  NOTE = "NOTE",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function commentThread_TypeFromJSON(object: any): CommentThread_Type {
  switch (object) {
    case 0:
    case "UNKNOWN_TYPE":
      return CommentThread_Type.UNKNOWN_TYPE;
    case 1:
    case "QUESTION":
      return CommentThread_Type.QUESTION;
    case 2:
    case "SUGGESTION":
      return CommentThread_Type.SUGGESTION;
    case 3:
    case "NOTE":
      return CommentThread_Type.NOTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommentThread_Type.UNRECOGNIZED;
  }
}

export function commentThread_TypeToJSON(object: CommentThread_Type): string {
  switch (object) {
    case CommentThread_Type.UNKNOWN_TYPE:
      return "UNKNOWN_TYPE";
    case CommentThread_Type.QUESTION:
      return "QUESTION";
    case CommentThread_Type.SUGGESTION:
      return "SUGGESTION";
    case CommentThread_Type.NOTE:
      return "NOTE";
    case CommentThread_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

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

function createBaseCommentThread(): CommentThread {
  return {
    $type: "trail.comment.CommentThread",
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    proposalId: undefined,
    createdBy: undefined,
    screenshot: undefined,
    diagramXml: undefined,
    type: CommentThread_Type.UNKNOWN_TYPE,
    isResolved: undefined,
  };
}

export const CommentThread = {
  $type: "trail.comment.CommentThread" as const,

  fromJSON(object: any): CommentThread {
    return {
      $type: CommentThread.$type,
      id: isSet(object.id) ? String(object.id) : undefined,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      deletedAt: isSet(object.deletedAt) ? fromJsonTimestamp(object.deletedAt) : undefined,
      proposalId: isSet(object.proposalId) ? String(object.proposalId) : undefined,
      createdBy: isSet(object.createdBy) ? String(object.createdBy) : undefined,
      screenshot: isSet(object.screenshot) ? CommentThread_GraphScreenshot.fromJSON(object.screenshot) : undefined,
      diagramXml: isSet(object.diagramXml) ? String(object.diagramXml) : undefined,
      type: isSet(object.type) ? commentThread_TypeFromJSON(object.type) : CommentThread_Type.UNKNOWN_TYPE,
      isResolved: isSet(object.isResolved) ? Boolean(object.isResolved) : undefined,
    };
  },

  toJSON(message: CommentThread): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.deletedAt !== undefined && (obj.deletedAt = message.deletedAt.toISOString());
    message.proposalId !== undefined && (obj.proposalId = message.proposalId);
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.screenshot !== undefined &&
      (obj.screenshot = message.screenshot ? CommentThread_GraphScreenshot.toJSON(message.screenshot) : undefined);
    message.diagramXml !== undefined && (obj.diagramXml = message.diagramXml);
    message.type !== undefined && (obj.type = commentThread_TypeToJSON(message.type));
    message.isResolved !== undefined && (obj.isResolved = message.isResolved);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommentThread>, I>>(object: I): CommentThread {
    const message = createBaseCommentThread() as any;
    message.id = object.id ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.deletedAt = object.deletedAt ?? undefined;
    message.proposalId = object.proposalId ?? undefined;
    message.createdBy = object.createdBy ?? undefined;
    message.screenshot = (object.screenshot !== undefined && object.screenshot !== null)
      ? CommentThread_GraphScreenshot.fromPartial(object.screenshot)
      : undefined;
    message.diagramXml = object.diagramXml ?? undefined;
    message.type = object.type ?? CommentThread_Type.UNKNOWN_TYPE;
    message.isResolved = object.isResolved ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(CommentThread.$type, CommentThread);

function createBaseCommentThread_GraphScreenshot(): CommentThread_GraphScreenshot {
  return {
    $type: "trail.comment.CommentThread.GraphScreenshot",
    imageContainerOuterHtml: undefined,
    imageContainerWidth: undefined,
    imageContainerHeight: undefined,
    imageOuterHtml: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageMarginLeft: undefined,
    imageMarginTop: undefined,
  };
}

export const CommentThread_GraphScreenshot = {
  $type: "trail.comment.CommentThread.GraphScreenshot" as const,

  fromJSON(object: any): CommentThread_GraphScreenshot {
    return {
      $type: CommentThread_GraphScreenshot.$type,
      imageContainerOuterHtml: isSet(object.imageContainerOuterHtml)
        ? String(object.imageContainerOuterHtml)
        : undefined,
      imageContainerWidth: isSet(object.imageContainerWidth) ? Number(object.imageContainerWidth) : undefined,
      imageContainerHeight: isSet(object.imageContainerHeight) ? Number(object.imageContainerHeight) : undefined,
      imageOuterHtml: isSet(object.imageOuterHtml) ? String(object.imageOuterHtml) : undefined,
      imageWidth: isSet(object.imageWidth) ? Number(object.imageWidth) : undefined,
      imageHeight: isSet(object.imageHeight) ? Number(object.imageHeight) : undefined,
      imageMarginLeft: isSet(object.imageMarginLeft) ? Number(object.imageMarginLeft) : undefined,
      imageMarginTop: isSet(object.imageMarginTop) ? Number(object.imageMarginTop) : undefined,
    };
  },

  toJSON(message: CommentThread_GraphScreenshot): unknown {
    const obj: any = {};
    message.imageContainerOuterHtml !== undefined && (obj.imageContainerOuterHtml = message.imageContainerOuterHtml);
    message.imageContainerWidth !== undefined && (obj.imageContainerWidth = message.imageContainerWidth);
    message.imageContainerHeight !== undefined && (obj.imageContainerHeight = message.imageContainerHeight);
    message.imageOuterHtml !== undefined && (obj.imageOuterHtml = message.imageOuterHtml);
    message.imageWidth !== undefined && (obj.imageWidth = message.imageWidth);
    message.imageHeight !== undefined && (obj.imageHeight = message.imageHeight);
    message.imageMarginLeft !== undefined && (obj.imageMarginLeft = message.imageMarginLeft);
    message.imageMarginTop !== undefined && (obj.imageMarginTop = message.imageMarginTop);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommentThread_GraphScreenshot>, I>>(
    object: I,
  ): CommentThread_GraphScreenshot {
    const message = createBaseCommentThread_GraphScreenshot() as any;
    message.imageContainerOuterHtml = object.imageContainerOuterHtml ?? undefined;
    message.imageContainerWidth = object.imageContainerWidth ?? undefined;
    message.imageContainerHeight = object.imageContainerHeight ?? undefined;
    message.imageOuterHtml = object.imageOuterHtml ?? undefined;
    message.imageWidth = object.imageWidth ?? undefined;
    message.imageHeight = object.imageHeight ?? undefined;
    message.imageMarginLeft = object.imageMarginLeft ?? undefined;
    message.imageMarginTop = object.imageMarginTop ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(CommentThread_GraphScreenshot.$type, CommentThread_GraphScreenshot);

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
