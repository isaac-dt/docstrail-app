/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "./typeRegistry";

export const protobufPackage = "permission";

/**
 * Possible operations which could be applied to a resource.
 * Next Id: 6
 */
export enum PermissionOp {
  NONE = "NONE",
  /** READ - Can only read the data. */
  READ = "READ",
  /** REVIEW - Can read, but has limited write. */
  REVIEW = "REVIEW",
  /** WRITE - Can read, create, and update the entity. */
  WRITE = "WRITE",
  /** ALL - Can read, create, update, and delete the entity. */
  ALL = "ALL",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function permissionOpFromJSON(object: any): PermissionOp {
  switch (object) {
    case 0:
    case "NONE":
      return PermissionOp.NONE;
    case 1:
    case "READ":
      return PermissionOp.READ;
    case 2:
    case "REVIEW":
      return PermissionOp.REVIEW;
    case 3:
    case "WRITE":
      return PermissionOp.WRITE;
    case 4:
    case "ALL":
      return PermissionOp.ALL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PermissionOp.UNRECOGNIZED;
  }
}

export function permissionOpToJSON(object: PermissionOp): string {
  switch (object) {
    case PermissionOp.NONE:
      return "NONE";
    case PermissionOp.READ:
      return "READ";
    case PermissionOp.REVIEW:
      return "REVIEW";
    case PermissionOp.WRITE:
      return "WRITE";
    case PermissionOp.ALL:
      return "ALL";
    case PermissionOp.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Firebase entities which could be accessors or resources. */
export enum DBEntity {
  USER = "USER",
  ADDRESS = "ADDRESS",
  JOB_ROLE = "JOB_ROLE",
  TEAM = "TEAM",
  ORG = "ORG",
  CLIENT = "CLIENT",
  ROOT = "ROOT",
  OPEN_DEFINITION = "OPEN_DEFINITION",
  CORE_DEFINITION = "CORE_DEFINITION",
  INVENTORY_BATCH = "INVENTORY_BATCH",
  DISTRIBUTION_OUTLET = "DISTRIBUTION_OUTLET",
  OUTLET_ADDRESS = "OUTLET_ADDRESS",
  PRODUCT = "PRODUCT",
  ALLOW_LIST = "ALLOW_LIST",
  COMPANY = "COMPANY",
  PACKAGE = "PACKAGE",
  ORDER = "ORDER",
  DELIVERY_ITEM = "DELIVERY_ITEM",
  TEMPLATE = "TEMPLATE",
  TRIGGER = "TRIGGER",
  TARGET = "TARGET",
  BUNDLE = "BUNDLE",
  BILLING_CYCLE = "BILLING_CYCLE",
  /** PROPOSAL - Proposals */
  PROPOSAL = "PROPOSAL",
  COMMENT_THREAD = "COMMENT_THREAD",
  COMMENT_MESSAGE = "COMMENT_MESSAGE",
  PROPOSAL_REVIEW = "PROPOSAL_REVIEW",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function dBEntityFromJSON(object: any): DBEntity {
  switch (object) {
    case 0:
    case "USER":
      return DBEntity.USER;
    case 1:
    case "ADDRESS":
      return DBEntity.ADDRESS;
    case 2:
    case "JOB_ROLE":
      return DBEntity.JOB_ROLE;
    case 3:
    case "TEAM":
      return DBEntity.TEAM;
    case 4:
    case "ORG":
      return DBEntity.ORG;
    case 5:
    case "CLIENT":
      return DBEntity.CLIENT;
    case 6:
    case "ROOT":
      return DBEntity.ROOT;
    case 20:
    case "OPEN_DEFINITION":
      return DBEntity.OPEN_DEFINITION;
    case 21:
    case "CORE_DEFINITION":
      return DBEntity.CORE_DEFINITION;
    case 22:
    case "INVENTORY_BATCH":
      return DBEntity.INVENTORY_BATCH;
    case 23:
    case "DISTRIBUTION_OUTLET":
      return DBEntity.DISTRIBUTION_OUTLET;
    case 24:
    case "OUTLET_ADDRESS":
      return DBEntity.OUTLET_ADDRESS;
    case 25:
    case "PRODUCT":
      return DBEntity.PRODUCT;
    case 26:
    case "ALLOW_LIST":
      return DBEntity.ALLOW_LIST;
    case 27:
    case "COMPANY":
      return DBEntity.COMPANY;
    case 40:
    case "PACKAGE":
      return DBEntity.PACKAGE;
    case 41:
    case "ORDER":
      return DBEntity.ORDER;
    case 42:
    case "DELIVERY_ITEM":
      return DBEntity.DELIVERY_ITEM;
    case 43:
    case "TEMPLATE":
      return DBEntity.TEMPLATE;
    case 44:
    case "TRIGGER":
      return DBEntity.TRIGGER;
    case 45:
    case "TARGET":
      return DBEntity.TARGET;
    case 46:
    case "BUNDLE":
      return DBEntity.BUNDLE;
    case 60:
    case "BILLING_CYCLE":
      return DBEntity.BILLING_CYCLE;
    case 100:
    case "PROPOSAL":
      return DBEntity.PROPOSAL;
    case 101:
    case "COMMENT_THREAD":
      return DBEntity.COMMENT_THREAD;
    case 102:
    case "COMMENT_MESSAGE":
      return DBEntity.COMMENT_MESSAGE;
    case 103:
    case "PROPOSAL_REVIEW":
      return DBEntity.PROPOSAL_REVIEW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DBEntity.UNRECOGNIZED;
  }
}

export function dBEntityToJSON(object: DBEntity): string {
  switch (object) {
    case DBEntity.USER:
      return "USER";
    case DBEntity.ADDRESS:
      return "ADDRESS";
    case DBEntity.JOB_ROLE:
      return "JOB_ROLE";
    case DBEntity.TEAM:
      return "TEAM";
    case DBEntity.ORG:
      return "ORG";
    case DBEntity.CLIENT:
      return "CLIENT";
    case DBEntity.ROOT:
      return "ROOT";
    case DBEntity.OPEN_DEFINITION:
      return "OPEN_DEFINITION";
    case DBEntity.CORE_DEFINITION:
      return "CORE_DEFINITION";
    case DBEntity.INVENTORY_BATCH:
      return "INVENTORY_BATCH";
    case DBEntity.DISTRIBUTION_OUTLET:
      return "DISTRIBUTION_OUTLET";
    case DBEntity.OUTLET_ADDRESS:
      return "OUTLET_ADDRESS";
    case DBEntity.PRODUCT:
      return "PRODUCT";
    case DBEntity.ALLOW_LIST:
      return "ALLOW_LIST";
    case DBEntity.COMPANY:
      return "COMPANY";
    case DBEntity.PACKAGE:
      return "PACKAGE";
    case DBEntity.ORDER:
      return "ORDER";
    case DBEntity.DELIVERY_ITEM:
      return "DELIVERY_ITEM";
    case DBEntity.TEMPLATE:
      return "TEMPLATE";
    case DBEntity.TRIGGER:
      return "TRIGGER";
    case DBEntity.TARGET:
      return "TARGET";
    case DBEntity.BUNDLE:
      return "BUNDLE";
    case DBEntity.BILLING_CYCLE:
      return "BILLING_CYCLE";
    case DBEntity.PROPOSAL:
      return "PROPOSAL";
    case DBEntity.COMMENT_THREAD:
      return "COMMENT_THREAD";
    case DBEntity.COMMENT_MESSAGE:
      return "COMMENT_MESSAGE";
    case DBEntity.PROPOSAL_REVIEW:
      return "PROPOSAL_REVIEW";
    case DBEntity.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Used by clients to set permission.
 * Next Id: 9
 */
export interface WritePermissionRequest {
  $type: "permission.WritePermissionRequest";
  accessorId: string;
  resourceId: string;
  accessor: DBEntity;
  resource: DBEntity;
  operation: PermissionOp;
}

/**
 * Returned to clients after set permission request.
 * Next Id: 2
 */
export interface GetPermissionResponse {
  $type: "permission.GetPermissionResponse";
  permission: Permission | undefined;
}

/**
 * Generic permission data.
 * Next Id: 9
 */
export interface Permission {
  $type: "permission.Permission";
  id: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  accessorId: string;
  resourceId: string | undefined;
  accessor: DBEntity;
  resource: DBEntity;
  operation: PermissionOp;
}

function createBaseWritePermissionRequest(): WritePermissionRequest {
  return {
    $type: "permission.WritePermissionRequest",
    accessorId: "",
    resourceId: "",
    accessor: DBEntity.USER,
    resource: DBEntity.USER,
    operation: PermissionOp.NONE,
  };
}

export const WritePermissionRequest = {
  $type: "permission.WritePermissionRequest" as const,

  fromJSON(object: any): WritePermissionRequest {
    return {
      $type: WritePermissionRequest.$type,
      accessorId: isSet(object.accessorId) ? String(object.accessorId) : "",
      resourceId: isSet(object.resourceId) ? String(object.resourceId) : "",
      accessor: isSet(object.accessor) ? dBEntityFromJSON(object.accessor) : DBEntity.USER,
      resource: isSet(object.resource) ? dBEntityFromJSON(object.resource) : DBEntity.USER,
      operation: isSet(object.operation) ? permissionOpFromJSON(object.operation) : PermissionOp.NONE,
    };
  },

  toJSON(message: WritePermissionRequest): unknown {
    const obj: any = {};
    message.accessorId !== undefined && (obj.accessorId = message.accessorId);
    message.resourceId !== undefined && (obj.resourceId = message.resourceId);
    message.accessor !== undefined && (obj.accessor = dBEntityToJSON(message.accessor));
    message.resource !== undefined && (obj.resource = dBEntityToJSON(message.resource));
    message.operation !== undefined && (obj.operation = permissionOpToJSON(message.operation));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WritePermissionRequest>, I>>(object: I): WritePermissionRequest {
    const message = createBaseWritePermissionRequest();
    message.accessorId = object.accessorId ?? "";
    message.resourceId = object.resourceId ?? "";
    message.accessor = object.accessor ?? DBEntity.USER;
    message.resource = object.resource ?? DBEntity.USER;
    message.operation = object.operation ?? PermissionOp.NONE;
    return message;
  },
};

messageTypeRegistry.set(WritePermissionRequest.$type, WritePermissionRequest);

function createBaseGetPermissionResponse(): GetPermissionResponse {
  return { $type: "permission.GetPermissionResponse", permission: undefined };
}

export const GetPermissionResponse = {
  $type: "permission.GetPermissionResponse" as const,

  fromJSON(object: any): GetPermissionResponse {
    return {
      $type: GetPermissionResponse.$type,
      permission: isSet(object.permission) ? Permission.fromJSON(object.permission) : undefined,
    };
  },

  toJSON(message: GetPermissionResponse): unknown {
    const obj: any = {};
    message.permission !== undefined &&
      (obj.permission = message.permission ? Permission.toJSON(message.permission) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPermissionResponse>, I>>(object: I): GetPermissionResponse {
    const message = createBaseGetPermissionResponse();
    message.permission = (object.permission !== undefined && object.permission !== null)
      ? Permission.fromPartial(object.permission)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetPermissionResponse.$type, GetPermissionResponse);

function createBasePermission(): Permission {
  return {
    $type: "permission.Permission",
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    accessorId: "",
    resourceId: undefined,
    accessor: DBEntity.USER,
    resource: DBEntity.USER,
    operation: PermissionOp.NONE,
  };
}

export const Permission = {
  $type: "permission.Permission" as const,

  fromJSON(object: any): Permission {
    return {
      $type: Permission.$type,
      id: isSet(object.id) ? String(object.id) : undefined,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      accessorId: isSet(object.accessorId) ? String(object.accessorId) : "",
      resourceId: isSet(object.resourceId) ? String(object.resourceId) : undefined,
      accessor: isSet(object.accessor) ? dBEntityFromJSON(object.accessor) : DBEntity.USER,
      resource: isSet(object.resource) ? dBEntityFromJSON(object.resource) : DBEntity.USER,
      operation: isSet(object.operation) ? permissionOpFromJSON(object.operation) : PermissionOp.NONE,
    };
  },

  toJSON(message: Permission): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.accessorId !== undefined && (obj.accessorId = message.accessorId);
    message.resourceId !== undefined && (obj.resourceId = message.resourceId);
    message.accessor !== undefined && (obj.accessor = dBEntityToJSON(message.accessor));
    message.resource !== undefined && (obj.resource = dBEntityToJSON(message.resource));
    message.operation !== undefined && (obj.operation = permissionOpToJSON(message.operation));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Permission>, I>>(object: I): Permission {
    const message = createBasePermission();
    message.id = object.id ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.accessorId = object.accessorId ?? "";
    message.resourceId = object.resourceId ?? undefined;
    message.accessor = object.accessor ?? DBEntity.USER;
    message.resource = object.resource ?? DBEntity.USER;
    message.operation = object.operation ?? PermissionOp.NONE;
    return message;
  },
};

messageTypeRegistry.set(Permission.$type, Permission);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
