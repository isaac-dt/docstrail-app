/* eslint-disable */
import { Client } from "../../account/client/client.pb";
import { Team } from "../../account/team/team.pb";
import { User, UserRole, userRoleFromJSON, userRoleToJSON } from "../../account/user/user.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "account.user";

/** Next Id: 6 */
export interface WriteOrgSignupRequest {
  $type: "account.user.WriteOrgSignupRequest";
  clientName: string | undefined;
  userRole: UserRole;
  userFullName: string | undefined;
  photoUrl: string | undefined;
  email: string | undefined;
}

/** Next Id: 4 */
export interface GetOrgSignupResponse {
  $type: "account.user.GetOrgSignupResponse";
  user: User | undefined;
  team: Team | undefined;
  client: Client | undefined;
}

function createBaseWriteOrgSignupRequest(): WriteOrgSignupRequest {
  return {
    $type: "account.user.WriteOrgSignupRequest",
    clientName: undefined,
    userRole: UserRole.UNKNOWN_ROLE,
    userFullName: undefined,
    photoUrl: undefined,
    email: undefined,
  };
}

export const WriteOrgSignupRequest = {
  $type: "account.user.WriteOrgSignupRequest" as const,

  fromJSON(object: any): WriteOrgSignupRequest {
    return {
      $type: WriteOrgSignupRequest.$type,
      clientName: isSet(object.clientName) ? String(object.clientName) : undefined,
      userRole: isSet(object.userRole) ? userRoleFromJSON(object.userRole) : UserRole.UNKNOWN_ROLE,
      userFullName: isSet(object.userFullName) ? String(object.userFullName) : undefined,
      photoUrl: isSet(object.photoUrl) ? String(object.photoUrl) : undefined,
      email: isSet(object.email) ? String(object.email) : undefined,
    };
  },

  toJSON(message: WriteOrgSignupRequest): unknown {
    const obj: any = {};
    message.clientName !== undefined && (obj.clientName = message.clientName);
    message.userRole !== undefined && (obj.userRole = userRoleToJSON(message.userRole));
    message.userFullName !== undefined && (obj.userFullName = message.userFullName);
    message.photoUrl !== undefined && (obj.photoUrl = message.photoUrl);
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteOrgSignupRequest>, I>>(object: I): WriteOrgSignupRequest {
    const message = createBaseWriteOrgSignupRequest();
    message.clientName = object.clientName ?? undefined;
    message.userRole = object.userRole ?? UserRole.UNKNOWN_ROLE;
    message.userFullName = object.userFullName ?? undefined;
    message.photoUrl = object.photoUrl ?? undefined;
    message.email = object.email ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteOrgSignupRequest.$type, WriteOrgSignupRequest);

function createBaseGetOrgSignupResponse(): GetOrgSignupResponse {
  return { $type: "account.user.GetOrgSignupResponse", user: undefined, team: undefined, client: undefined };
}

export const GetOrgSignupResponse = {
  $type: "account.user.GetOrgSignupResponse" as const,

  fromJSON(object: any): GetOrgSignupResponse {
    return {
      $type: GetOrgSignupResponse.$type,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      team: isSet(object.team) ? Team.fromJSON(object.team) : undefined,
      client: isSet(object.client) ? Client.fromJSON(object.client) : undefined,
    };
  },

  toJSON(message: GetOrgSignupResponse): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.team !== undefined && (obj.team = message.team ? Team.toJSON(message.team) : undefined);
    message.client !== undefined && (obj.client = message.client ? Client.toJSON(message.client) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOrgSignupResponse>, I>>(object: I): GetOrgSignupResponse {
    const message = createBaseGetOrgSignupResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.team = (object.team !== undefined && object.team !== null) ? Team.fromPartial(object.team) : undefined;
    message.client = (object.client !== undefined && object.client !== null)
      ? Client.fromPartial(object.client)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetOrgSignupResponse.$type, GetOrgSignupResponse);

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
