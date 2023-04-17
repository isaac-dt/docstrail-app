/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "operation.trigger";

/** List of special trigger events. */
export enum SpecialEvent {
  BIRTH_MONTH = "BIRTH_MONTH",
  NEW_HIRE = "NEW_HIRE",
  WORK_ANNIVERSARY = "WORK_ANNIVERSARY",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function specialEventFromJSON(object: any): SpecialEvent {
  switch (object) {
    case 0:
    case "BIRTH_MONTH":
      return SpecialEvent.BIRTH_MONTH;
    case 1:
    case "NEW_HIRE":
      return SpecialEvent.NEW_HIRE;
    case 2:
    case "WORK_ANNIVERSARY":
      return SpecialEvent.WORK_ANNIVERSARY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SpecialEvent.UNRECOGNIZED;
  }
}

export function specialEventToJSON(object: SpecialEvent): string {
  switch (object) {
    case SpecialEvent.BIRTH_MONTH:
      return "BIRTH_MONTH";
    case SpecialEvent.NEW_HIRE:
      return "NEW_HIRE";
    case SpecialEvent.WORK_ANNIVERSARY:
      return "WORK_ANNIVERSARY";
    case SpecialEvent.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Determies when a template runs (i.e,. when to create orders).
 * Next Id: 10
 */
export interface Trigger {
  $type: "operation.trigger.Trigger";
  readonly id: string;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;
  readonly name: string | undefined;
  readonly description: string | undefined;
  readonly expiresAt: Date | undefined;
  expectedDeliveryDate?: { $case: "scheduledEvent"; scheduledEvent: ScheduledEvent } | {
    $case: "specialEvent";
    specialEvent: SpecialEvent;
  };
  readonly rootId: string;
}

/** Day and month on which to trigger an event. */
export interface ScheduledEvent {
  $type: "operation.trigger.ScheduledEvent";
  readonly day: number;
  /** Counting from 1 to 12. */
  readonly month: number;
}

function createBaseTrigger(): Trigger {
  return {
    $type: "operation.trigger.Trigger",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    name: undefined,
    description: undefined,
    expiresAt: undefined,
    expectedDeliveryDate: undefined,
    rootId: "",
  };
}

export const Trigger = {
  $type: "operation.trigger.Trigger" as const,

  fromJSON(object: any): Trigger {
    return {
      $type: Trigger.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      expiresAt: isSet(object.expiresAt) ? fromJsonTimestamp(object.expiresAt) : undefined,
      expectedDeliveryDate: isSet(object.scheduledEvent)
        ? { $case: "scheduledEvent", scheduledEvent: ScheduledEvent.fromJSON(object.scheduledEvent) }
        : isSet(object.specialEvent)
        ? { $case: "specialEvent", specialEvent: specialEventFromJSON(object.specialEvent) }
        : undefined,
      rootId: isSet(object.rootId) ? String(object.rootId) : "",
    };
  },

  toJSON(message: Trigger): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.expiresAt !== undefined && (obj.expiresAt = message.expiresAt.toISOString());
    message.expectedDeliveryDate?.$case === "scheduledEvent" &&
      (obj.scheduledEvent = message.expectedDeliveryDate?.scheduledEvent
        ? ScheduledEvent.toJSON(message.expectedDeliveryDate?.scheduledEvent)
        : undefined);
    message.expectedDeliveryDate?.$case === "specialEvent" &&
      (obj.specialEvent = message.expectedDeliveryDate?.specialEvent !== undefined
        ? specialEventToJSON(message.expectedDeliveryDate?.specialEvent)
        : undefined);
    message.rootId !== undefined && (obj.rootId = message.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Trigger>, I>>(object: I): Trigger {
    const message = createBaseTrigger() as any;
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.expiresAt = object.expiresAt ?? undefined;
    if (
      object.expectedDeliveryDate?.$case === "scheduledEvent" &&
      object.expectedDeliveryDate?.scheduledEvent !== undefined &&
      object.expectedDeliveryDate?.scheduledEvent !== null
    ) {
      message.expectedDeliveryDate = {
        $case: "scheduledEvent",
        scheduledEvent: ScheduledEvent.fromPartial(object.expectedDeliveryDate.scheduledEvent),
      };
    }
    if (
      object.expectedDeliveryDate?.$case === "specialEvent" &&
      object.expectedDeliveryDate?.specialEvent !== undefined &&
      object.expectedDeliveryDate?.specialEvent !== null
    ) {
      message.expectedDeliveryDate = { $case: "specialEvent", specialEvent: object.expectedDeliveryDate.specialEvent };
    }
    message.rootId = object.rootId ?? "";
    return message;
  },
};

messageTypeRegistry.set(Trigger.$type, Trigger);

function createBaseScheduledEvent(): ScheduledEvent {
  return { $type: "operation.trigger.ScheduledEvent", day: 0, month: 0 };
}

export const ScheduledEvent = {
  $type: "operation.trigger.ScheduledEvent" as const,

  fromJSON(object: any): ScheduledEvent {
    return {
      $type: ScheduledEvent.$type,
      day: isSet(object.day) ? Number(object.day) : 0,
      month: isSet(object.month) ? Number(object.month) : 0,
    };
  },

  toJSON(message: ScheduledEvent): unknown {
    const obj: any = {};
    message.day !== undefined && (obj.day = Math.round(message.day));
    message.month !== undefined && (obj.month = Math.round(message.month));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ScheduledEvent>, I>>(object: I): ScheduledEvent {
    const message = createBaseScheduledEvent() as any;
    message.day = object.day ?? 0;
    message.month = object.month ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ScheduledEvent.$type, ScheduledEvent);

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
