/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "catalog.core_definition";

/**
 * While OpenDefinition and CoreDefinition describe objects, ProductCategory categorizes objects.
 * Next Id: 7
 */
export enum CoreDefinitionCategory {
  OFFICE = "OFFICE",
  CLOTHING = "CLOTHING",
  FOOD = "FOOD",
  ELECTRONICS = "ELECTRONICS",
  E_GIFT = "E_GIFT",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function coreDefinitionCategoryFromJSON(object: any): CoreDefinitionCategory {
  switch (object) {
    case 0:
    case "OFFICE":
      return CoreDefinitionCategory.OFFICE;
    case 2:
    case "CLOTHING":
      return CoreDefinitionCategory.CLOTHING;
    case 3:
    case "FOOD":
      return CoreDefinitionCategory.FOOD;
    case 5:
    case "ELECTRONICS":
      return CoreDefinitionCategory.ELECTRONICS;
    case 6:
    case "E_GIFT":
      return CoreDefinitionCategory.E_GIFT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CoreDefinitionCategory.UNRECOGNIZED;
  }
}

export function coreDefinitionCategoryToJSON(object: CoreDefinitionCategory): string {
  switch (object) {
    case CoreDefinitionCategory.OFFICE:
      return "OFFICE";
    case CoreDefinitionCategory.CLOTHING:
      return "CLOTHING";
    case CoreDefinitionCategory.FOOD:
      return "FOOD";
    case CoreDefinitionCategory.ELECTRONICS:
      return "ELECTRONICS";
    case CoreDefinitionCategory.E_GIFT:
      return "E_GIFT";
    case CoreDefinitionCategory.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Abstraction of one or more OpenDefinition entries.
 * Every OpenDefinition must map to one CoreDefinition, which are set by system admins only.
 * Example: OpenDefinition("shirt with a freedom flag") maps to CoreDefinition("shirt with logo").
 * This entity lives at the root level.
 * A rule of thumb on what could be a Core Definition: anything we can build an inventory of.
 * Next Id: 8
 */
export interface CoreDefinition {
  $type: "catalog.core_definition.CoreDefinition";
  id: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  name: string;
  description: string;
  category: CoreDefinitionCategory;
  rootId: string;
}

function createBaseCoreDefinition(): CoreDefinition {
  return {
    $type: "catalog.core_definition.CoreDefinition",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    name: "",
    description: "",
    category: CoreDefinitionCategory.OFFICE,
    rootId: "",
  };
}

export const CoreDefinition = {
  $type: "catalog.core_definition.CoreDefinition" as const,

  fromJSON(object: any): CoreDefinition {
    return {
      $type: CoreDefinition.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      category: isSet(object.category)
        ? coreDefinitionCategoryFromJSON(object.category)
        : CoreDefinitionCategory.OFFICE,
      rootId: isSet(object.rootId) ? String(object.rootId) : "",
    };
  },

  toJSON(message: CoreDefinition): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.category !== undefined && (obj.category = coreDefinitionCategoryToJSON(message.category));
    message.rootId !== undefined && (obj.rootId = message.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CoreDefinition>, I>>(object: I): CoreDefinition {
    const message = createBaseCoreDefinition();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.category = object.category ?? CoreDefinitionCategory.OFFICE;
    message.rootId = object.rootId ?? "";
    return message;
  },
};

messageTypeRegistry.set(CoreDefinition.$type, CoreDefinition);

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
