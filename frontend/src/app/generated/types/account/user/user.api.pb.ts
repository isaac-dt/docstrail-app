/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { Client } from "../client/client.pb";
import { Team } from "../team/team.pb";
import { User } from "./user.pb";

export const protobufPackage = "account.user";

/** Next Id: 11 */
export interface WriteUserRequest {
  $type: "account.user.WriteUserRequest";
  id: number | undefined;
  fullName: string | undefined;
  teamId: string | undefined;
  role: string | undefined;
  photoUrl: string | undefined;
  email: string | undefined;
}

/** Next Id: 6 */
export interface GetUserResponse {
  $type: "account.user.GetUserResponse";
  user: User | undefined;
  team:
    | Team
    | undefined;
  /**
   * repeated account.user.UserAddress addresses = 4;
   * repeated account.job_role.JobRole job_roles = 5;
   */
  client: Client | undefined;
}

/** Next Id: 3 */
export interface ListUserResponse {
  $type: "account.user.ListUserResponse";
  users: User[];
  matchCount: number;
}

function createBaseWriteUserRequest(): WriteUserRequest {
  return {
    $type: "account.user.WriteUserRequest",
    id: undefined,
    fullName: undefined,
    teamId: undefined,
    role: undefined,
    photoUrl: undefined,
    email: undefined,
  };
}

export const WriteUserRequest = {
  $type: "account.user.WriteUserRequest" as const,

  fromJSON(object: any): WriteUserRequest {
    return {
      $type: WriteUserRequest.$type,
      id: isSet(object.id) ? Number(object.id) : undefined,
      fullName: isSet(object.fullName) ? String(object.fullName) : undefined,
      teamId: isSet(object.teamId) ? String(object.teamId) : undefined,
      role: isSet(object.role) ? String(object.role) : undefined,
      photoUrl: isSet(object.photoUrl) ? String(object.photoUrl) : undefined,
      email: isSet(object.email) ? String(object.email) : undefined,
    };
  },

  toJSON(message: WriteUserRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.fullName !== undefined && (obj.fullName = message.fullName);
    message.teamId !== undefined && (obj.teamId = message.teamId);
    message.role !== undefined && (obj.role = message.role);
    message.photoUrl !== undefined && (obj.photoUrl = message.photoUrl);
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteUserRequest>, I>>(object: I): WriteUserRequest {
    const message = createBaseWriteUserRequest();
    message.id = object.id ?? undefined;
    message.fullName = object.fullName ?? undefined;
    message.teamId = object.teamId ?? undefined;
    message.role = object.role ?? undefined;
    message.photoUrl = object.photoUrl ?? undefined;
    message.email = object.email ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteUserRequest.$type, WriteUserRequest);

function createBaseGetUserResponse(): GetUserResponse {
  return { $type: "account.user.GetUserResponse", user: undefined, team: undefined, client: undefined };
}

export const GetUserResponse = {
  $type: "account.user.GetUserResponse" as const,

  fromJSON(object: any): GetUserResponse {
    return {
      $type: GetUserResponse.$type,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      team: isSet(object.team) ? Team.fromJSON(object.team) : undefined,
      client: isSet(object.client) ? Client.fromJSON(object.client) : undefined,
    };
  },

  toJSON(message: GetUserResponse): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.team !== undefined && (obj.team = message.team ? Team.toJSON(message.team) : undefined);
    message.client !== undefined && (obj.client = message.client ? Client.toJSON(message.client) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserResponse>, I>>(object: I): GetUserResponse {
    const message = createBaseGetUserResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.team = (object.team !== undefined && object.team !== null) ? Team.fromPartial(object.team) : undefined;
    message.client = (object.client !== undefined && object.client !== null)
      ? Client.fromPartial(object.client)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetUserResponse.$type, GetUserResponse);

function createBaseListUserResponse(): ListUserResponse {
  return { $type: "account.user.ListUserResponse", users: [], matchCount: 0 };
}

export const ListUserResponse = {
  $type: "account.user.ListUserResponse" as const,

  fromJSON(object: any): ListUserResponse {
    return {
      $type: ListUserResponse.$type,
      users: Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListUserResponse): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.users = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListUserResponse>, I>>(object: I): ListUserResponse {
    const message = createBaseListUserResponse();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListUserResponse.$type, ListUserResponse);

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
