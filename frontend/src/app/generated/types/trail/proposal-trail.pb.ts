/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../typeRegistry";
import { BugFixTrail } from "./bug-fix-proposal-trail.pb";

export const protobufPackage = "trail";

/**
 * All information required to build a proposal.
 * Next Id: 5
 */
export interface ProposalTrail {
  $type: "trail.ProposalTrail";
  id: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  dataType: ProposalTrail_DataType;
  data?: { $case: "bugFix"; bugFix: BugFixTrail };
}

/** Type of the proposal data. */
export enum ProposalTrail_DataType {
  UNKNOWN_TYPE = "UNKNOWN_TYPE",
  FEATURE = "FEATURE",
  BUG_FIX = "BUG_FIX",
  NEW_TOOL = "NEW_TOOL",
  IMPROVEMENT = "IMPROVEMENT",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function proposalTrail_DataTypeFromJSON(object: any): ProposalTrail_DataType {
  switch (object) {
    case 0:
    case "UNKNOWN_TYPE":
      return ProposalTrail_DataType.UNKNOWN_TYPE;
    case 1:
    case "FEATURE":
      return ProposalTrail_DataType.FEATURE;
    case 2:
    case "BUG_FIX":
      return ProposalTrail_DataType.BUG_FIX;
    case 3:
    case "NEW_TOOL":
      return ProposalTrail_DataType.NEW_TOOL;
    case 4:
    case "IMPROVEMENT":
      return ProposalTrail_DataType.IMPROVEMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProposalTrail_DataType.UNRECOGNIZED;
  }
}

export function proposalTrail_DataTypeToJSON(object: ProposalTrail_DataType): string {
  switch (object) {
    case ProposalTrail_DataType.UNKNOWN_TYPE:
      return "UNKNOWN_TYPE";
    case ProposalTrail_DataType.FEATURE:
      return "FEATURE";
    case ProposalTrail_DataType.BUG_FIX:
      return "BUG_FIX";
    case ProposalTrail_DataType.NEW_TOOL:
      return "NEW_TOOL";
    case ProposalTrail_DataType.IMPROVEMENT:
      return "IMPROVEMENT";
    case ProposalTrail_DataType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseProposalTrail(): ProposalTrail {
  return {
    $type: "trail.ProposalTrail",
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    dataType: ProposalTrail_DataType.UNKNOWN_TYPE,
    data: undefined,
  };
}

export const ProposalTrail = {
  $type: "trail.ProposalTrail" as const,

  fromJSON(object: any): ProposalTrail {
    return {
      $type: ProposalTrail.$type,
      id: isSet(object.id) ? String(object.id) : undefined,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      dataType: isSet(object.dataType)
        ? proposalTrail_DataTypeFromJSON(object.dataType)
        : ProposalTrail_DataType.UNKNOWN_TYPE,
      data: isSet(object.bugFix) ? { $case: "bugFix", bugFix: BugFixTrail.fromJSON(object.bugFix) } : undefined,
    };
  },

  toJSON(message: ProposalTrail): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.dataType !== undefined && (obj.dataType = proposalTrail_DataTypeToJSON(message.dataType));
    message.data?.$case === "bugFix" &&
      (obj.bugFix = message.data?.bugFix ? BugFixTrail.toJSON(message.data?.bugFix) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProposalTrail>, I>>(object: I): ProposalTrail {
    const message = createBaseProposalTrail();
    message.id = object.id ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.dataType = object.dataType ?? ProposalTrail_DataType.UNKNOWN_TYPE;
    if (object.data?.$case === "bugFix" && object.data?.bugFix !== undefined && object.data?.bugFix !== null) {
      message.data = { $case: "bugFix", bugFix: BugFixTrail.fromPartial(object.data.bugFix) };
    }
    return message;
  },
};

messageTypeRegistry.set(ProposalTrail.$type, ProposalTrail);

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
