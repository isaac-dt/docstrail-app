/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "operation.bundle";

/**
 * Grouping of Templates. Could be used to separate templates
 * between clients, teams, or budgets.
 * Next Id: 8
 */
export interface Bundle {
  $type: "operation.bundle.Bundle";
  readonly id: string;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;
  readonly name: string;
  readonly description: string | undefined;
  parent?: { $case: "clientId"; clientId: string } | { $case: "rootId"; rootId: string };
}

function createBaseBundle(): Bundle {
  return {
    $type: "operation.bundle.Bundle",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    name: "",
    description: undefined,
    parent: undefined,
  };
}

export const Bundle = {
  $type: "operation.bundle.Bundle" as const,

  fromJSON(object: any): Bundle {
    return {
      $type: Bundle.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      parent: isSet(object.clientId)
        ? { $case: "clientId", clientId: String(object.clientId) }
        : isSet(object.rootId)
        ? { $case: "rootId", rootId: String(object.rootId) }
        : undefined,
    };
  },

  toJSON(message: Bundle): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.parent?.$case === "clientId" && (obj.clientId = message.parent?.clientId);
    message.parent?.$case === "rootId" && (obj.rootId = message.parent?.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bundle>, I>>(object: I): Bundle {
    const message = createBaseBundle() as any;
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? undefined;
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

messageTypeRegistry.set(Bundle.$type, Bundle);

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
