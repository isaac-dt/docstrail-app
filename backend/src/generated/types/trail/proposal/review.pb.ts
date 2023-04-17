/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "trail.proposal";

/** Proposal review. */
export interface ProposalReview {
  $type: "trail.proposal.ProposalReview";
  readonly id: string | undefined;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;
  readonly deletedAt: Date | undefined;
  readonly proposalId: string | undefined;
  readonly createdBy: string | undefined;
  readonly status: ProposalReview_Status;
  readonly note: string | undefined;
}

export enum ProposalReview_Status {
  UNKNOWN_TYPE = "UNKNOWN_TYPE",
  PENDING = "PENDING",
  HOLD = "HOLD",
  LGTM = "LGTM",
  END_REVIEW = "END_REVIEW",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function proposalReview_StatusFromJSON(object: any): ProposalReview_Status {
  switch (object) {
    case 0:
    case "UNKNOWN_TYPE":
      return ProposalReview_Status.UNKNOWN_TYPE;
    case 1:
    case "PENDING":
      return ProposalReview_Status.PENDING;
    case 2:
    case "HOLD":
      return ProposalReview_Status.HOLD;
    case 3:
    case "LGTM":
      return ProposalReview_Status.LGTM;
    case 4:
    case "END_REVIEW":
      return ProposalReview_Status.END_REVIEW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProposalReview_Status.UNRECOGNIZED;
  }
}

export function proposalReview_StatusToJSON(object: ProposalReview_Status): string {
  switch (object) {
    case ProposalReview_Status.UNKNOWN_TYPE:
      return "UNKNOWN_TYPE";
    case ProposalReview_Status.PENDING:
      return "PENDING";
    case ProposalReview_Status.HOLD:
      return "HOLD";
    case ProposalReview_Status.LGTM:
      return "LGTM";
    case ProposalReview_Status.END_REVIEW:
      return "END_REVIEW";
    case ProposalReview_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseProposalReview(): ProposalReview {
  return {
    $type: "trail.proposal.ProposalReview",
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
    proposalId: undefined,
    createdBy: undefined,
    status: ProposalReview_Status.UNKNOWN_TYPE,
    note: undefined,
  };
}

export const ProposalReview = {
  $type: "trail.proposal.ProposalReview" as const,

  fromJSON(object: any): ProposalReview {
    return {
      $type: ProposalReview.$type,
      id: isSet(object.id) ? String(object.id) : undefined,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      deletedAt: isSet(object.deletedAt) ? fromJsonTimestamp(object.deletedAt) : undefined,
      proposalId: isSet(object.proposalId) ? String(object.proposalId) : undefined,
      createdBy: isSet(object.createdBy) ? String(object.createdBy) : undefined,
      status: isSet(object.status) ? proposalReview_StatusFromJSON(object.status) : ProposalReview_Status.UNKNOWN_TYPE,
      note: isSet(object.note) ? String(object.note) : undefined,
    };
  },

  toJSON(message: ProposalReview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.deletedAt !== undefined && (obj.deletedAt = message.deletedAt.toISOString());
    message.proposalId !== undefined && (obj.proposalId = message.proposalId);
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.status !== undefined && (obj.status = proposalReview_StatusToJSON(message.status));
    message.note !== undefined && (obj.note = message.note);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProposalReview>, I>>(object: I): ProposalReview {
    const message = createBaseProposalReview() as any;
    message.id = object.id ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.deletedAt = object.deletedAt ?? undefined;
    message.proposalId = object.proposalId ?? undefined;
    message.createdBy = object.createdBy ?? undefined;
    message.status = object.status ?? ProposalReview_Status.UNKNOWN_TYPE;
    message.note = object.note ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ProposalReview.$type, ProposalReview);

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
