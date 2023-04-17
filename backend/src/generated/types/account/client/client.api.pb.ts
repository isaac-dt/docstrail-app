/* eslint-disable */
import { OpenDefinition } from "../../catalog/open-definition/open-definition.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { JobRole } from "../job-role/job-role.pb";
import { Team } from "../team/team.pb";
import { Client } from "./client.pb";

export const protobufPackage = "account.client";

/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 3
 */
export interface WriteClientRequest {
  $type: "account.client.WriteClientRequest";
  readonly name: string | undefined;
  readonly rootId: string | undefined;
}

/**
 * Used for fetching a single client.
 * Next Id: 5
 */
export interface GetClientResponse {
  $type: "account.client.GetClientResponse";
  readonly client: Client | undefined;
  readonly childrenTeams: readonly Team[];
  readonly jobRoles: readonly JobRole[];
  readonly openDefinitions: readonly OpenDefinition[];
}

/**
 * Used for Listing clients.
 * Next Id: 3
 */
export interface ListClientResponse {
  $type: "account.client.ListClientResponse";
  readonly clients: readonly Client[];
  readonly matchCount: number;
}

function createBaseWriteClientRequest(): WriteClientRequest {
  return { $type: "account.client.WriteClientRequest", name: undefined, rootId: undefined };
}

export const WriteClientRequest = {
  $type: "account.client.WriteClientRequest" as const,

  fromJSON(object: any): WriteClientRequest {
    return {
      $type: WriteClientRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      rootId: isSet(object.rootId) ? String(object.rootId) : undefined,
    };
  },

  toJSON(message: WriteClientRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.rootId !== undefined && (obj.rootId = message.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteClientRequest>, I>>(object: I): WriteClientRequest {
    const message = createBaseWriteClientRequest() as any;
    message.name = object.name ?? undefined;
    message.rootId = object.rootId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteClientRequest.$type, WriteClientRequest);

function createBaseGetClientResponse(): GetClientResponse {
  return {
    $type: "account.client.GetClientResponse",
    client: undefined,
    childrenTeams: [],
    jobRoles: [],
    openDefinitions: [],
  };
}

export const GetClientResponse = {
  $type: "account.client.GetClientResponse" as const,

  fromJSON(object: any): GetClientResponse {
    return {
      $type: GetClientResponse.$type,
      client: isSet(object.client) ? Client.fromJSON(object.client) : undefined,
      childrenTeams: Array.isArray(object?.childrenTeams) ? object.childrenTeams.map((e: any) => Team.fromJSON(e)) : [],
      jobRoles: Array.isArray(object?.jobRoles) ? object.jobRoles.map((e: any) => JobRole.fromJSON(e)) : [],
      openDefinitions: Array.isArray(object?.openDefinitions)
        ? object.openDefinitions.map((e: any) => OpenDefinition.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetClientResponse): unknown {
    const obj: any = {};
    message.client !== undefined && (obj.client = message.client ? Client.toJSON(message.client) : undefined);
    if (message.childrenTeams) {
      obj.childrenTeams = message.childrenTeams.map((e) => e ? Team.toJSON(e) : undefined);
    } else {
      obj.childrenTeams = [];
    }
    if (message.jobRoles) {
      obj.jobRoles = message.jobRoles.map((e) => e ? JobRole.toJSON(e) : undefined);
    } else {
      obj.jobRoles = [];
    }
    if (message.openDefinitions) {
      obj.openDefinitions = message.openDefinitions.map((e) => e ? OpenDefinition.toJSON(e) : undefined);
    } else {
      obj.openDefinitions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetClientResponse>, I>>(object: I): GetClientResponse {
    const message = createBaseGetClientResponse() as any;
    message.client = (object.client !== undefined && object.client !== null)
      ? Client.fromPartial(object.client)
      : undefined;
    message.childrenTeams = object.childrenTeams?.map((e) => Team.fromPartial(e)) || [];
    message.jobRoles = object.jobRoles?.map((e) => JobRole.fromPartial(e)) || [];
    message.openDefinitions = object.openDefinitions?.map((e) => OpenDefinition.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetClientResponse.$type, GetClientResponse);

function createBaseListClientResponse(): ListClientResponse {
  return { $type: "account.client.ListClientResponse", clients: [], matchCount: 0 };
}

export const ListClientResponse = {
  $type: "account.client.ListClientResponse" as const,

  fromJSON(object: any): ListClientResponse {
    return {
      $type: ListClientResponse.$type,
      clients: Array.isArray(object?.clients) ? object.clients.map((e: any) => Client.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListClientResponse): unknown {
    const obj: any = {};
    if (message.clients) {
      obj.clients = message.clients.map((e) => e ? Client.toJSON(e) : undefined);
    } else {
      obj.clients = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListClientResponse>, I>>(object: I): ListClientResponse {
    const message = createBaseListClientResponse() as any;
    message.clients = object.clients?.map((e) => Client.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListClientResponse.$type, ListClientResponse);

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
