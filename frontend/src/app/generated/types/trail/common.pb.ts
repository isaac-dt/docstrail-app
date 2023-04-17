/* eslint-disable */
import { User } from "../account/user/user.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "trail";

/** Info of user associated to a proposal as a reviewer. */
export interface Peer {
  $type: "trail.Peer";
  user: User[];
  roles: Peer_Role[];
  isManager: boolean;
  isTechLead: boolean;
  /** Whether the user should provide permission to execute the proposal. */
  shouldProvideApproval: boolean;
}

/** Role of the peer on the proposal. */
export enum Peer_Role {
  UNKNOWN_ROLE = "UNKNOWN_ROLE",
  OTHER_ROLE = "OTHER_ROLE",
  ENG = "ENG",
  UX = "UX",
  PRODUCT = "PRODUCT",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function peer_RoleFromJSON(object: any): Peer_Role {
  switch (object) {
    case 0:
    case "UNKNOWN_ROLE":
      return Peer_Role.UNKNOWN_ROLE;
    case 1:
    case "OTHER_ROLE":
      return Peer_Role.OTHER_ROLE;
    case 2:
    case "ENG":
      return Peer_Role.ENG;
    case 3:
    case "UX":
      return Peer_Role.UX;
    case 4:
    case "PRODUCT":
      return Peer_Role.PRODUCT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Peer_Role.UNRECOGNIZED;
  }
}

export function peer_RoleToJSON(object: Peer_Role): string {
  switch (object) {
    case Peer_Role.UNKNOWN_ROLE:
      return "UNKNOWN_ROLE";
    case Peer_Role.OTHER_ROLE:
      return "OTHER_ROLE";
    case Peer_Role.ENG:
      return "ENG";
    case Peer_Role.UX:
      return "UX";
    case Peer_Role.PRODUCT:
      return "PRODUCT";
    case Peer_Role.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBasePeer(): Peer {
  return {
    $type: "trail.Peer",
    user: [],
    roles: [],
    isManager: false,
    isTechLead: false,
    shouldProvideApproval: false,
  };
}

export const Peer = {
  $type: "trail.Peer" as const,

  fromJSON(object: any): Peer {
    return {
      $type: Peer.$type,
      user: Array.isArray(object?.user) ? object.user.map((e: any) => User.fromJSON(e)) : [],
      roles: Array.isArray(object?.roles) ? object.roles.map((e: any) => peer_RoleFromJSON(e)) : [],
      isManager: isSet(object.isManager) ? Boolean(object.isManager) : false,
      isTechLead: isSet(object.isTechLead) ? Boolean(object.isTechLead) : false,
      shouldProvideApproval: isSet(object.shouldProvideApproval) ? Boolean(object.shouldProvideApproval) : false,
    };
  },

  toJSON(message: Peer): unknown {
    const obj: any = {};
    if (message.user) {
      obj.user = message.user.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.user = [];
    }
    if (message.roles) {
      obj.roles = message.roles.map((e) => peer_RoleToJSON(e));
    } else {
      obj.roles = [];
    }
    message.isManager !== undefined && (obj.isManager = message.isManager);
    message.isTechLead !== undefined && (obj.isTechLead = message.isTechLead);
    message.shouldProvideApproval !== undefined && (obj.shouldProvideApproval = message.shouldProvideApproval);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Peer>, I>>(object: I): Peer {
    const message = createBasePeer();
    message.user = object.user?.map((e) => User.fromPartial(e)) || [];
    message.roles = object.roles?.map((e) => e) || [];
    message.isManager = object.isManager ?? false;
    message.isTechLead = object.isTechLead ?? false;
    message.shouldProvideApproval = object.shouldProvideApproval ?? false;
    return message;
  },
};

messageTypeRegistry.set(Peer.$type, Peer);

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
