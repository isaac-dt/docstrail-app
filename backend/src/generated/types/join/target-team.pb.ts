/* eslint-disable */
import { Team } from "../account/team/team.pb";
import { Target } from "../operation/target/target.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinTargetTeamRequest {
  $type: "join.JoinTargetTeamRequest";
  readonly targetId: string;
  readonly teamId: string;
}

/** Next Id: 3 */
export interface JoinTargetTeamResponse {
  $type: "join.JoinTargetTeamResponse";
  readonly target: Target | undefined;
  readonly team: Team | undefined;
}

function createBaseJoinTargetTeamRequest(): JoinTargetTeamRequest {
  return { $type: "join.JoinTargetTeamRequest", targetId: "", teamId: "" };
}

export const JoinTargetTeamRequest = {
  $type: "join.JoinTargetTeamRequest" as const,

  fromJSON(object: any): JoinTargetTeamRequest {
    return {
      $type: JoinTargetTeamRequest.$type,
      targetId: isSet(object.targetId) ? String(object.targetId) : "",
      teamId: isSet(object.teamId) ? String(object.teamId) : "",
    };
  },

  toJSON(message: JoinTargetTeamRequest): unknown {
    const obj: any = {};
    message.targetId !== undefined && (obj.targetId = message.targetId);
    message.teamId !== undefined && (obj.teamId = message.teamId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTargetTeamRequest>, I>>(object: I): JoinTargetTeamRequest {
    const message = createBaseJoinTargetTeamRequest() as any;
    message.targetId = object.targetId ?? "";
    message.teamId = object.teamId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinTargetTeamRequest.$type, JoinTargetTeamRequest);

function createBaseJoinTargetTeamResponse(): JoinTargetTeamResponse {
  return { $type: "join.JoinTargetTeamResponse", target: undefined, team: undefined };
}

export const JoinTargetTeamResponse = {
  $type: "join.JoinTargetTeamResponse" as const,

  fromJSON(object: any): JoinTargetTeamResponse {
    return {
      $type: JoinTargetTeamResponse.$type,
      target: isSet(object.target) ? Target.fromJSON(object.target) : undefined,
      team: isSet(object.team) ? Team.fromJSON(object.team) : undefined,
    };
  },

  toJSON(message: JoinTargetTeamResponse): unknown {
    const obj: any = {};
    message.target !== undefined && (obj.target = message.target ? Target.toJSON(message.target) : undefined);
    message.team !== undefined && (obj.team = message.team ? Team.toJSON(message.team) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTargetTeamResponse>, I>>(object: I): JoinTargetTeamResponse {
    const message = createBaseJoinTargetTeamResponse() as any;
    message.target = (object.target !== undefined && object.target !== null)
      ? Target.fromPartial(object.target)
      : undefined;
    message.team = (object.team !== undefined && object.team !== null) ? Team.fromPartial(object.team) : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinTargetTeamResponse.$type, JoinTargetTeamResponse);

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
