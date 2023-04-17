/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { JobRole } from "./job-role.pb";

export const protobufPackage = "account.job_role";

/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 4
 */
export interface WriteJobRoleRequest {
  $type: "account.job_role.WriteJobRoleRequest";
  name: string | undefined;
  parent?: { $case: "clientId"; clientId: string } | { $case: "rootId"; rootId: string };
}

/**
 * Used for fetching a single job role.
 * Next Id: 2
 */
export interface GetJobRoleResponse {
  $type: "account.job_role.GetJobRoleResponse";
  jobRole: JobRole | undefined;
}

/**
 * Used for Listing job roles.
 * Next Id: 3
 */
export interface ListJobRoleResponse {
  $type: "account.job_role.ListJobRoleResponse";
  jobRoles: JobRole[];
  matchCount: number;
}

function createBaseWriteJobRoleRequest(): WriteJobRoleRequest {
  return { $type: "account.job_role.WriteJobRoleRequest", name: undefined, parent: undefined };
}

export const WriteJobRoleRequest = {
  $type: "account.job_role.WriteJobRoleRequest" as const,

  fromJSON(object: any): WriteJobRoleRequest {
    return {
      $type: WriteJobRoleRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      parent: isSet(object.clientId)
        ? { $case: "clientId", clientId: String(object.clientId) }
        : isSet(object.rootId)
        ? { $case: "rootId", rootId: String(object.rootId) }
        : undefined,
    };
  },

  toJSON(message: WriteJobRoleRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.parent?.$case === "clientId" && (obj.clientId = message.parent?.clientId);
    message.parent?.$case === "rootId" && (obj.rootId = message.parent?.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteJobRoleRequest>, I>>(object: I): WriteJobRoleRequest {
    const message = createBaseWriteJobRoleRequest();
    message.name = object.name ?? undefined;
    if (
      object.parent?.$case === "clientId" && object.parent?.clientId !== undefined && object.parent?.clientId !== null
    ) {
      message.parent = { $case: "clientId", clientId: object.parent.clientId };
    }
    if (object.parent?.$case === "rootId" && object.parent?.rootId !== undefined && object.parent?.rootId !== null) {
      message.parent = { $case: "rootId", rootId: object.parent.rootId };
    }
    return message;
  },
};

messageTypeRegistry.set(WriteJobRoleRequest.$type, WriteJobRoleRequest);

function createBaseGetJobRoleResponse(): GetJobRoleResponse {
  return { $type: "account.job_role.GetJobRoleResponse", jobRole: undefined };
}

export const GetJobRoleResponse = {
  $type: "account.job_role.GetJobRoleResponse" as const,

  fromJSON(object: any): GetJobRoleResponse {
    return {
      $type: GetJobRoleResponse.$type,
      jobRole: isSet(object.jobRole) ? JobRole.fromJSON(object.jobRole) : undefined,
    };
  },

  toJSON(message: GetJobRoleResponse): unknown {
    const obj: any = {};
    message.jobRole !== undefined && (obj.jobRole = message.jobRole ? JobRole.toJSON(message.jobRole) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetJobRoleResponse>, I>>(object: I): GetJobRoleResponse {
    const message = createBaseGetJobRoleResponse();
    message.jobRole = (object.jobRole !== undefined && object.jobRole !== null)
      ? JobRole.fromPartial(object.jobRole)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetJobRoleResponse.$type, GetJobRoleResponse);

function createBaseListJobRoleResponse(): ListJobRoleResponse {
  return { $type: "account.job_role.ListJobRoleResponse", jobRoles: [], matchCount: 0 };
}

export const ListJobRoleResponse = {
  $type: "account.job_role.ListJobRoleResponse" as const,

  fromJSON(object: any): ListJobRoleResponse {
    return {
      $type: ListJobRoleResponse.$type,
      jobRoles: Array.isArray(object?.jobRoles) ? object.jobRoles.map((e: any) => JobRole.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListJobRoleResponse): unknown {
    const obj: any = {};
    if (message.jobRoles) {
      obj.jobRoles = message.jobRoles.map((e) => e ? JobRole.toJSON(e) : undefined);
    } else {
      obj.jobRoles = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListJobRoleResponse>, I>>(object: I): ListJobRoleResponse {
    const message = createBaseListJobRoleResponse();
    message.jobRoles = object.jobRoles?.map((e) => JobRole.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListJobRoleResponse.$type, ListJobRoleResponse);

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
