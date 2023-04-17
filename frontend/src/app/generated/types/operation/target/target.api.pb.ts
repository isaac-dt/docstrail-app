/* eslint-disable */
import { Client } from "../../account/client/client.pb";
import { JobRole } from "../../account/job-role/job-role.pb";
import { Team } from "../../account/team/team.pb";
import { User } from "../../account/user/user.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { Template } from "../template/template.pb";
import { Target } from "./target.pb";

export const protobufPackage = "operation.target";

/** Next Id: 3 */
export interface WriteTargetRequest {
  $type: "operation.target.WriteTargetRequest";
  name: string | undefined;
  clientId: string | undefined;
}

/** Next Id: 8 */
export interface GetTargetResponse {
  $type: "operation.target.GetTargetResponse";
  target: Target | undefined;
  client: Client | undefined;
  templates: Template[];
  teams: Team[];
  jobRoles: JobRole[];
  /** Users directly added to the target. */
  directUsers: User[];
  /** Includes directly added users and the ones extracted from teams and job roles. */
  finalUserSet: User[];
}

/** Next Id: 3 */
export interface ListTargetResponse {
  $type: "operation.target.ListTargetResponse";
  targets: Target[];
  matchCount: number;
}

function createBaseWriteTargetRequest(): WriteTargetRequest {
  return { $type: "operation.target.WriteTargetRequest", name: undefined, clientId: undefined };
}

export const WriteTargetRequest = {
  $type: "operation.target.WriteTargetRequest" as const,

  fromJSON(object: any): WriteTargetRequest {
    return {
      $type: WriteTargetRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      clientId: isSet(object.clientId) ? String(object.clientId) : undefined,
    };
  },

  toJSON(message: WriteTargetRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.clientId !== undefined && (obj.clientId = message.clientId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteTargetRequest>, I>>(object: I): WriteTargetRequest {
    const message = createBaseWriteTargetRequest();
    message.name = object.name ?? undefined;
    message.clientId = object.clientId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteTargetRequest.$type, WriteTargetRequest);

function createBaseGetTargetResponse(): GetTargetResponse {
  return {
    $type: "operation.target.GetTargetResponse",
    target: undefined,
    client: undefined,
    templates: [],
    teams: [],
    jobRoles: [],
    directUsers: [],
    finalUserSet: [],
  };
}

export const GetTargetResponse = {
  $type: "operation.target.GetTargetResponse" as const,

  fromJSON(object: any): GetTargetResponse {
    return {
      $type: GetTargetResponse.$type,
      target: isSet(object.target) ? Target.fromJSON(object.target) : undefined,
      client: isSet(object.client) ? Client.fromJSON(object.client) : undefined,
      templates: Array.isArray(object?.templates) ? object.templates.map((e: any) => Template.fromJSON(e)) : [],
      teams: Array.isArray(object?.teams) ? object.teams.map((e: any) => Team.fromJSON(e)) : [],
      jobRoles: Array.isArray(object?.jobRoles) ? object.jobRoles.map((e: any) => JobRole.fromJSON(e)) : [],
      directUsers: Array.isArray(object?.directUsers) ? object.directUsers.map((e: any) => User.fromJSON(e)) : [],
      finalUserSet: Array.isArray(object?.finalUserSet) ? object.finalUserSet.map((e: any) => User.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetTargetResponse): unknown {
    const obj: any = {};
    message.target !== undefined && (obj.target = message.target ? Target.toJSON(message.target) : undefined);
    message.client !== undefined && (obj.client = message.client ? Client.toJSON(message.client) : undefined);
    if (message.templates) {
      obj.templates = message.templates.map((e) => e ? Template.toJSON(e) : undefined);
    } else {
      obj.templates = [];
    }
    if (message.teams) {
      obj.teams = message.teams.map((e) => e ? Team.toJSON(e) : undefined);
    } else {
      obj.teams = [];
    }
    if (message.jobRoles) {
      obj.jobRoles = message.jobRoles.map((e) => e ? JobRole.toJSON(e) : undefined);
    } else {
      obj.jobRoles = [];
    }
    if (message.directUsers) {
      obj.directUsers = message.directUsers.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.directUsers = [];
    }
    if (message.finalUserSet) {
      obj.finalUserSet = message.finalUserSet.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.finalUserSet = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTargetResponse>, I>>(object: I): GetTargetResponse {
    const message = createBaseGetTargetResponse();
    message.target = (object.target !== undefined && object.target !== null)
      ? Target.fromPartial(object.target)
      : undefined;
    message.client = (object.client !== undefined && object.client !== null)
      ? Client.fromPartial(object.client)
      : undefined;
    message.templates = object.templates?.map((e) => Template.fromPartial(e)) || [];
    message.teams = object.teams?.map((e) => Team.fromPartial(e)) || [];
    message.jobRoles = object.jobRoles?.map((e) => JobRole.fromPartial(e)) || [];
    message.directUsers = object.directUsers?.map((e) => User.fromPartial(e)) || [];
    message.finalUserSet = object.finalUserSet?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetTargetResponse.$type, GetTargetResponse);

function createBaseListTargetResponse(): ListTargetResponse {
  return { $type: "operation.target.ListTargetResponse", targets: [], matchCount: 0 };
}

export const ListTargetResponse = {
  $type: "operation.target.ListTargetResponse" as const,

  fromJSON(object: any): ListTargetResponse {
    return {
      $type: ListTargetResponse.$type,
      targets: Array.isArray(object?.targets) ? object.targets.map((e: any) => Target.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListTargetResponse): unknown {
    const obj: any = {};
    if (message.targets) {
      obj.targets = message.targets.map((e) => e ? Target.toJSON(e) : undefined);
    } else {
      obj.targets = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListTargetResponse>, I>>(object: I): ListTargetResponse {
    const message = createBaseListTargetResponse();
    message.targets = object.targets?.map((e) => Target.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListTargetResponse.$type, ListTargetResponse);

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
