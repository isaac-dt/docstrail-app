/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "trail.proposal";

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

function createBaseProposal(): Proposal {
  return {
    $type: "trail.proposal.Proposal",
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    createdBy: undefined,
    diagramXml: undefined,
    name: undefined,
  };
}

export const Proposal = {
  $type: "trail.proposal.Proposal" as const,

  fromJSON(object: any): Proposal {
    return {
      $type: Proposal.$type,
      id: isSet(object.id) ? String(object.id) : undefined,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      deletedAt: isSet(object.deletedAt) ? fromJsonTimestamp(object.deletedAt) : undefined,
      createdBy: isSet(object.createdBy) ? String(object.createdBy) : undefined,
      diagramXml: isSet(object.diagramXml) ? String(object.diagramXml) : undefined,
      name: isSet(object.name) ? String(object.name) : undefined,
    };
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.deletedAt !== undefined && (obj.deletedAt = message.deletedAt.toISOString());
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.diagramXml !== undefined && (obj.diagramXml = message.diagramXml);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proposal>, I>>(object: I): Proposal {
    const message = createBaseProposal() as any;
    message.id = object.id ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.deletedAt = object.deletedAt ?? undefined;
    message.createdBy = object.createdBy ?? undefined;
    message.diagramXml = object.diagramXml ?? undefined;
    message.name = object.name ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Proposal.$type, Proposal);

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
