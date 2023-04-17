/* eslint-disable */
import { User } from "../../account/user/user.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { Proposal } from "./proposal.pb";
import {
  ProposalReview,
  ProposalReview_Status,
  proposalReview_StatusFromJSON,
  proposalReview_StatusToJSON,
} from "./review.pb";

export const protobufPackage = "trail.proposal";

/** Used for POST, PUT, and PATCH. */
export interface WriteProposalReviewRequest {
  $type: "trail.proposal.WriteProposalReviewRequest";
  proposalId: string | undefined;
  status: ProposalReview_Status;
  note: string | undefined;
}

/** Used for fetching a single item. */
export interface GetProposalReviewResponse {
  $type: "trail.proposal.GetProposalReviewResponse";
  proposalReview: ProposalReview | undefined;
  proposal: Proposal | undefined;
  creator: User | undefined;
}

/** Used for Listing items. */
export interface ListProposalReviewResponse {
  $type: "trail.proposal.ListProposalReviewResponse";
  proposalReviews: ProposalReview[];
  creators: User[];
  matchCount: number;
}

function createBaseWriteProposalReviewRequest(): WriteProposalReviewRequest {
  return {
    $type: "trail.proposal.WriteProposalReviewRequest",
    proposalId: undefined,
    status: ProposalReview_Status.UNKNOWN_TYPE,
    note: undefined,
  };
}

export const WriteProposalReviewRequest = {
  $type: "trail.proposal.WriteProposalReviewRequest" as const,

  fromJSON(object: any): WriteProposalReviewRequest {
    return {
      $type: WriteProposalReviewRequest.$type,
      proposalId: isSet(object.proposalId) ? String(object.proposalId) : undefined,
      status: isSet(object.status) ? proposalReview_StatusFromJSON(object.status) : ProposalReview_Status.UNKNOWN_TYPE,
      note: isSet(object.note) ? String(object.note) : undefined,
    };
  },

  toJSON(message: WriteProposalReviewRequest): unknown {
    const obj: any = {};
    message.proposalId !== undefined && (obj.proposalId = message.proposalId);
    message.status !== undefined && (obj.status = proposalReview_StatusToJSON(message.status));
    message.note !== undefined && (obj.note = message.note);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteProposalReviewRequest>, I>>(object: I): WriteProposalReviewRequest {
    const message = createBaseWriteProposalReviewRequest();
    message.proposalId = object.proposalId ?? undefined;
    message.status = object.status ?? ProposalReview_Status.UNKNOWN_TYPE;
    message.note = object.note ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteProposalReviewRequest.$type, WriteProposalReviewRequest);

function createBaseGetProposalReviewResponse(): GetProposalReviewResponse {
  return {
    $type: "trail.proposal.GetProposalReviewResponse",
    proposalReview: undefined,
    proposal: undefined,
    creator: undefined,
  };
}

export const GetProposalReviewResponse = {
  $type: "trail.proposal.GetProposalReviewResponse" as const,

  fromJSON(object: any): GetProposalReviewResponse {
    return {
      $type: GetProposalReviewResponse.$type,
      proposalReview: isSet(object.proposalReview) ? ProposalReview.fromJSON(object.proposalReview) : undefined,
      proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined,
      creator: isSet(object.creator) ? User.fromJSON(object.creator) : undefined,
    };
  },

  toJSON(message: GetProposalReviewResponse): unknown {
    const obj: any = {};
    message.proposalReview !== undefined &&
      (obj.proposalReview = message.proposalReview ? ProposalReview.toJSON(message.proposalReview) : undefined);
    message.proposal !== undefined && (obj.proposal = message.proposal ? Proposal.toJSON(message.proposal) : undefined);
    message.creator !== undefined && (obj.creator = message.creator ? User.toJSON(message.creator) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProposalReviewResponse>, I>>(object: I): GetProposalReviewResponse {
    const message = createBaseGetProposalReviewResponse();
    message.proposalReview = (object.proposalReview !== undefined && object.proposalReview !== null)
      ? ProposalReview.fromPartial(object.proposalReview)
      : undefined;
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    message.creator = (object.creator !== undefined && object.creator !== null)
      ? User.fromPartial(object.creator)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetProposalReviewResponse.$type, GetProposalReviewResponse);

function createBaseListProposalReviewResponse(): ListProposalReviewResponse {
  return { $type: "trail.proposal.ListProposalReviewResponse", proposalReviews: [], creators: [], matchCount: 0 };
}

export const ListProposalReviewResponse = {
  $type: "trail.proposal.ListProposalReviewResponse" as const,

  fromJSON(object: any): ListProposalReviewResponse {
    return {
      $type: ListProposalReviewResponse.$type,
      proposalReviews: Array.isArray(object?.proposalReviews)
        ? object.proposalReviews.map((e: any) => ProposalReview.fromJSON(e))
        : [],
      creators: Array.isArray(object?.creators)
        ? object.creators.map((e: any) => User.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListProposalReviewResponse): unknown {
    const obj: any = {};
    if (message.proposalReviews) {
      obj.proposalReviews = message.proposalReviews.map((e) => e ? ProposalReview.toJSON(e) : undefined);
    } else {
      obj.proposalReviews = [];
    }
    if (message.creators) {
      obj.creators = message.creators.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.creators = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListProposalReviewResponse>, I>>(object: I): ListProposalReviewResponse {
    const message = createBaseListProposalReviewResponse();
    message.proposalReviews = object.proposalReviews?.map((e) => ProposalReview.fromPartial(e)) || [];
    message.creators = object.creators?.map((e) => User.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListProposalReviewResponse.$type, ListProposalReviewResponse);

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
