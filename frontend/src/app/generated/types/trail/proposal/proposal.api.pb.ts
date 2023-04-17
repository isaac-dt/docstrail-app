/* eslint-disable */
import { User } from "../../account/user/user.pb";
import { Permission, PermissionOp, permissionOpFromJSON, permissionOpToJSON } from "../../permission.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { Proposal } from "./proposal.pb";

export const protobufPackage = "trail.proposal";

/** Used for POST, PUT, and PATCH. */
export interface WriteProposalRequest {
  $type: "trail.proposal.WriteProposalRequest";
  name: string | undefined;
  diagramXml: string | undefined;
}

/** Used for fetching a single item. */
export interface GetProposalResponse {
  $type: "trail.proposal.GetProposalResponse";
  proposal: Proposal | undefined;
  allPermissionsOnProposal: ProposalPermission[];
}

/** Used to fetch the response after sharing a proposal. */
export interface WriteShareProposalRequest {
  $type: "trail.proposal.WriteShareProposalRequest";
  accessorEmail: string | undefined;
  proposalId: string | undefined;
  operation: PermissionOp;
}

/** Used to fetch the response after sharing a proposal. */
export interface GetShareProposalResponse {
  $type: "trail.proposal.GetShareProposalResponse";
  accessor: User | undefined;
  permission: Permission | undefined;
}

/** Used for Listing items. */
export interface ListProposalResponse {
  $type: "trail.proposal.ListProposalResponse";
  proposals: Proposal[];
  requestorPermissionsOnProposals: ProposalPermission[];
  matchCount: number;
}

/** Permissions associated to an item. */
export interface ProposalPermission {
  $type: "trail.proposal.ProposalPermission";
  proposalId: string | undefined;
  user: User | undefined;
  permission: Permission | undefined;
}

function createBaseWriteProposalRequest(): WriteProposalRequest {
  return { $type: "trail.proposal.WriteProposalRequest", name: undefined, diagramXml: undefined };
}

export const WriteProposalRequest = {
  $type: "trail.proposal.WriteProposalRequest" as const,

  fromJSON(object: any): WriteProposalRequest {
    return {
      $type: WriteProposalRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      diagramXml: isSet(object.diagramXml) ? String(object.diagramXml) : undefined,
    };
  },

  toJSON(message: WriteProposalRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.diagramXml !== undefined && (obj.diagramXml = message.diagramXml);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteProposalRequest>, I>>(object: I): WriteProposalRequest {
    const message = createBaseWriteProposalRequest();
    message.name = object.name ?? undefined;
    message.diagramXml = object.diagramXml ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteProposalRequest.$type, WriteProposalRequest);

function createBaseGetProposalResponse(): GetProposalResponse {
  return { $type: "trail.proposal.GetProposalResponse", proposal: undefined, allPermissionsOnProposal: [] };
}

export const GetProposalResponse = {
  $type: "trail.proposal.GetProposalResponse" as const,

  fromJSON(object: any): GetProposalResponse {
    return {
      $type: GetProposalResponse.$type,
      proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined,
      allPermissionsOnProposal: Array.isArray(object?.allPermissionsOnProposal)
        ? object.allPermissionsOnProposal.map((e: any) => ProposalPermission.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetProposalResponse): unknown {
    const obj: any = {};
    message.proposal !== undefined && (obj.proposal = message.proposal ? Proposal.toJSON(message.proposal) : undefined);
    if (message.allPermissionsOnProposal) {
      obj.allPermissionsOnProposal = message.allPermissionsOnProposal.map((e) =>
        e ? ProposalPermission.toJSON(e) : undefined
      );
    } else {
      obj.allPermissionsOnProposal = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProposalResponse>, I>>(object: I): GetProposalResponse {
    const message = createBaseGetProposalResponse();
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    message.allPermissionsOnProposal = object.allPermissionsOnProposal?.map((e) => ProposalPermission.fromPartial(e)) ||
      [];
    return message;
  },
};

messageTypeRegistry.set(GetProposalResponse.$type, GetProposalResponse);

function createBaseWriteShareProposalRequest(): WriteShareProposalRequest {
  return {
    $type: "trail.proposal.WriteShareProposalRequest",
    accessorEmail: undefined,
    proposalId: undefined,
    operation: PermissionOp.NONE,
  };
}

export const WriteShareProposalRequest = {
  $type: "trail.proposal.WriteShareProposalRequest" as const,

  fromJSON(object: any): WriteShareProposalRequest {
    return {
      $type: WriteShareProposalRequest.$type,
      accessorEmail: isSet(object.accessorEmail) ? String(object.accessorEmail) : undefined,
      proposalId: isSet(object.proposalId) ? String(object.proposalId) : undefined,
      operation: isSet(object.operation) ? permissionOpFromJSON(object.operation) : PermissionOp.NONE,
    };
  },

  toJSON(message: WriteShareProposalRequest): unknown {
    const obj: any = {};
    message.accessorEmail !== undefined && (obj.accessorEmail = message.accessorEmail);
    message.proposalId !== undefined && (obj.proposalId = message.proposalId);
    message.operation !== undefined && (obj.operation = permissionOpToJSON(message.operation));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteShareProposalRequest>, I>>(object: I): WriteShareProposalRequest {
    const message = createBaseWriteShareProposalRequest();
    message.accessorEmail = object.accessorEmail ?? undefined;
    message.proposalId = object.proposalId ?? undefined;
    message.operation = object.operation ?? PermissionOp.NONE;
    return message;
  },
};

messageTypeRegistry.set(WriteShareProposalRequest.$type, WriteShareProposalRequest);

function createBaseGetShareProposalResponse(): GetShareProposalResponse {
  return { $type: "trail.proposal.GetShareProposalResponse", accessor: undefined, permission: undefined };
}

export const GetShareProposalResponse = {
  $type: "trail.proposal.GetShareProposalResponse" as const,

  fromJSON(object: any): GetShareProposalResponse {
    return {
      $type: GetShareProposalResponse.$type,
      accessor: isSet(object.accessor) ? User.fromJSON(object.accessor) : undefined,
      permission: isSet(object.permission) ? Permission.fromJSON(object.permission) : undefined,
    };
  },

  toJSON(message: GetShareProposalResponse): unknown {
    const obj: any = {};
    message.accessor !== undefined && (obj.accessor = message.accessor ? User.toJSON(message.accessor) : undefined);
    message.permission !== undefined &&
      (obj.permission = message.permission ? Permission.toJSON(message.permission) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetShareProposalResponse>, I>>(object: I): GetShareProposalResponse {
    const message = createBaseGetShareProposalResponse();
    message.accessor = (object.accessor !== undefined && object.accessor !== null)
      ? User.fromPartial(object.accessor)
      : undefined;
    message.permission = (object.permission !== undefined && object.permission !== null)
      ? Permission.fromPartial(object.permission)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetShareProposalResponse.$type, GetShareProposalResponse);

function createBaseListProposalResponse(): ListProposalResponse {
  return {
    $type: "trail.proposal.ListProposalResponse",
    proposals: [],
    requestorPermissionsOnProposals: [],
    matchCount: 0,
  };
}

export const ListProposalResponse = {
  $type: "trail.proposal.ListProposalResponse" as const,

  fromJSON(object: any): ListProposalResponse {
    return {
      $type: ListProposalResponse.$type,
      proposals: Array.isArray(object?.proposals) ? object.proposals.map((e: any) => Proposal.fromJSON(e)) : [],
      requestorPermissionsOnProposals: Array.isArray(object?.requestorPermissionsOnProposals)
        ? object.requestorPermissionsOnProposals.map((e: any) => ProposalPermission.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListProposalResponse): unknown {
    const obj: any = {};
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) => e ? Proposal.toJSON(e) : undefined);
    } else {
      obj.proposals = [];
    }
    if (message.requestorPermissionsOnProposals) {
      obj.requestorPermissionsOnProposals = message.requestorPermissionsOnProposals.map((e) =>
        e ? ProposalPermission.toJSON(e) : undefined
      );
    } else {
      obj.requestorPermissionsOnProposals = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListProposalResponse>, I>>(object: I): ListProposalResponse {
    const message = createBaseListProposalResponse();
    message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.requestorPermissionsOnProposals =
      object.requestorPermissionsOnProposals?.map((e) => ProposalPermission.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListProposalResponse.$type, ListProposalResponse);

function createBaseProposalPermission(): ProposalPermission {
  return { $type: "trail.proposal.ProposalPermission", proposalId: undefined, user: undefined, permission: undefined };
}

export const ProposalPermission = {
  $type: "trail.proposal.ProposalPermission" as const,

  fromJSON(object: any): ProposalPermission {
    return {
      $type: ProposalPermission.$type,
      proposalId: isSet(object.proposalId) ? String(object.proposalId) : undefined,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      permission: isSet(object.permission) ? Permission.fromJSON(object.permission) : undefined,
    };
  },

  toJSON(message: ProposalPermission): unknown {
    const obj: any = {};
    message.proposalId !== undefined && (obj.proposalId = message.proposalId);
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.permission !== undefined &&
      (obj.permission = message.permission ? Permission.toJSON(message.permission) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProposalPermission>, I>>(object: I): ProposalPermission {
    const message = createBaseProposalPermission();
    message.proposalId = object.proposalId ?? undefined;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.permission = (object.permission !== undefined && object.permission !== null)
      ? Permission.fromPartial(object.permission)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ProposalPermission.$type, ProposalPermission);

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
