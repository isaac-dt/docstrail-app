/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { User } from "../user/user.pb";
import { Team } from "./team.pb";

export const protobufPackage = "account.team";

/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 4
 */
export interface WriteTeamRequest {
  $type: "account.team.WriteTeamRequest";
  name: string | undefined;
  parent?: { $case: "clientId"; clientId: string } | { $case: "teamId"; teamId: string };
}

/**
 * Used for fetching a single team.
 * Next Id: 4
 */
export interface GetTeamResponse {
  $type: "account.team.GetTeamResponse";
  team: Team | undefined;
  childrenTeams: Team[];
  users: User[];
}

/**
 * Used for Listing teams.
 * Next Id: 3
 */
export interface ListTeamResponse {
  $type: "account.team.ListTeamResponse";
  teams: Team[];
  matchCount: number;
}

function createBaseWriteTeamRequest(): WriteTeamRequest {
  return { $type: "account.team.WriteTeamRequest", name: undefined, parent: undefined };
}

export const WriteTeamRequest = {
  $type: "account.team.WriteTeamRequest" as const,

  fromJSON(object: any): WriteTeamRequest {
    return {
      $type: WriteTeamRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      parent: isSet(object.clientId)
        ? { $case: "clientId", clientId: String(object.clientId) }
        : isSet(object.teamId)
        ? { $case: "teamId", teamId: String(object.teamId) }
        : undefined,
    };
  },

  toJSON(message: WriteTeamRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.parent?.$case === "clientId" && (obj.clientId = message.parent?.clientId);
    message.parent?.$case === "teamId" && (obj.teamId = message.parent?.teamId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteTeamRequest>, I>>(object: I): WriteTeamRequest {
    const message = createBaseWriteTeamRequest();
    message.name = object.name ?? undefined;
    if (
      object.parent?.$case === "clientId" && object.parent?.clientId !== undefined && object.parent?.clientId !== null
    ) {
      message.parent = { $case: "clientId", clientId: object.parent.clientId };
    }
    if (object.parent?.$case === "teamId" && object.parent?.teamId !== undefined && object.parent?.teamId !== null) {
      message.parent = { $case: "teamId", teamId: object.parent.teamId };
    }
    return message;
  },
};

messageTypeRegistry.set(WriteTeamRequest.$type, WriteTeamRequest);

function createBaseGetTeamResponse(): GetTeamResponse {
  return { $type: "account.team.GetTeamResponse", team: undefined, childrenTeams: [], users: [] };
}

export const GetTeamResponse = {
  $type: "account.team.GetTeamResponse" as const,

  fromJSON(object: any): GetTeamResponse {
    return {
      $type: GetTeamResponse.$type,
      team: isSet(object.team) ? Team.fromJSON(object.team) : undefined,
      childrenTeams: Array.isArray(object?.childrenTeams) ? object.childrenTeams.map((e: any) => Team.fromJSON(e)) : [],
      users: Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetTeamResponse): unknown {
    const obj: any = {};
    message.team !== undefined && (obj.team = message.team ? Team.toJSON(message.team) : undefined);
    if (message.childrenTeams) {
      obj.childrenTeams = message.childrenTeams.map((e) => e ? Team.toJSON(e) : undefined);
    } else {
      obj.childrenTeams = [];
    }
    if (message.users) {
      obj.users = message.users.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.users = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTeamResponse>, I>>(object: I): GetTeamResponse {
    const message = createBaseGetTeamResponse();
    message.team = (object.team !== undefined && object.team !== null) ? Team.fromPartial(object.team) : undefined;
    message.childrenTeams = object.childrenTeams?.map((e) => Team.fromPartial(e)) || [];
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetTeamResponse.$type, GetTeamResponse);

function createBaseListTeamResponse(): ListTeamResponse {
  return { $type: "account.team.ListTeamResponse", teams: [], matchCount: 0 };
}

export const ListTeamResponse = {
  $type: "account.team.ListTeamResponse" as const,

  fromJSON(object: any): ListTeamResponse {
    return {
      $type: ListTeamResponse.$type,
      teams: Array.isArray(object?.teams) ? object.teams.map((e: any) => Team.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListTeamResponse): unknown {
    const obj: any = {};
    if (message.teams) {
      obj.teams = message.teams.map((e) => e ? Team.toJSON(e) : undefined);
    } else {
      obj.teams = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListTeamResponse>, I>>(object: I): ListTeamResponse {
    const message = createBaseListTeamResponse();
    message.teams = object.teams?.map((e) => Team.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListTeamResponse.$type, ListTeamResponse);

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
