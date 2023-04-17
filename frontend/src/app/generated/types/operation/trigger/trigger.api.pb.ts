/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { ScheduledEvent, SpecialEvent, specialEventFromJSON, specialEventToJSON, Trigger } from "./trigger.pb";

export const protobufPackage = "operation.trigger";

/** Next Id: 7 */
export interface WriteTriggerRequest {
  $type: "operation.trigger.WriteTriggerRequest";
  name: string | undefined;
  description: string | undefined;
  expiresAt: Date | undefined;
  expectedDeliveryDate?: { $case: "scheduledEvent"; scheduledEvent: ScheduledEvent } | {
    $case: "specialEvent";
    specialEvent: SpecialEvent;
  };
  rootId: string | undefined;
}

/** Next Id: 3 */
export interface GetTriggerResponse {
  $type: "operation.trigger.GetTriggerResponse";
  trigger: Trigger | undefined;
}

/** Next Id: 3 */
export interface ListTriggerResponse {
  $type: "operation.trigger.ListTriggerResponse";
  triggers: Trigger[];
  matchCount: number;
}

function createBaseWriteTriggerRequest(): WriteTriggerRequest {
  return {
    $type: "operation.trigger.WriteTriggerRequest",
    name: undefined,
    description: undefined,
    expiresAt: undefined,
    expectedDeliveryDate: undefined,
    rootId: undefined,
  };
}

export const WriteTriggerRequest = {
  $type: "operation.trigger.WriteTriggerRequest" as const,

  fromJSON(object: any): WriteTriggerRequest {
    return {
      $type: WriteTriggerRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      expiresAt: isSet(object.expiresAt) ? fromJsonTimestamp(object.expiresAt) : undefined,
      expectedDeliveryDate: isSet(object.scheduledEvent)
        ? { $case: "scheduledEvent", scheduledEvent: ScheduledEvent.fromJSON(object.scheduledEvent) }
        : isSet(object.specialEvent)
        ? { $case: "specialEvent", specialEvent: specialEventFromJSON(object.specialEvent) }
        : undefined,
      rootId: isSet(object.rootId) ? String(object.rootId) : undefined,
    };
  },

  toJSON(message: WriteTriggerRequest): unknown {
    const obj: any = {};
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

  fromPartial<I extends Exact<DeepPartial<WriteTriggerRequest>, I>>(object: I): WriteTriggerRequest {
    const message = createBaseWriteTriggerRequest();
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
    message.rootId = object.rootId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteTriggerRequest.$type, WriteTriggerRequest);

function createBaseGetTriggerResponse(): GetTriggerResponse {
  return { $type: "operation.trigger.GetTriggerResponse", trigger: undefined };
}

export const GetTriggerResponse = {
  $type: "operation.trigger.GetTriggerResponse" as const,

  fromJSON(object: any): GetTriggerResponse {
    return {
      $type: GetTriggerResponse.$type,
      trigger: isSet(object.trigger) ? Trigger.fromJSON(object.trigger) : undefined,
    };
  },

  toJSON(message: GetTriggerResponse): unknown {
    const obj: any = {};
    message.trigger !== undefined && (obj.trigger = message.trigger ? Trigger.toJSON(message.trigger) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTriggerResponse>, I>>(object: I): GetTriggerResponse {
    const message = createBaseGetTriggerResponse();
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? Trigger.fromPartial(object.trigger)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetTriggerResponse.$type, GetTriggerResponse);

function createBaseListTriggerResponse(): ListTriggerResponse {
  return { $type: "operation.trigger.ListTriggerResponse", triggers: [], matchCount: 0 };
}

export const ListTriggerResponse = {
  $type: "operation.trigger.ListTriggerResponse" as const,

  fromJSON(object: any): ListTriggerResponse {
    return {
      $type: ListTriggerResponse.$type,
      triggers: Array.isArray(object?.triggers) ? object.triggers.map((e: any) => Trigger.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListTriggerResponse): unknown {
    const obj: any = {};
    if (message.triggers) {
      obj.triggers = message.triggers.map((e) => e ? Trigger.toJSON(e) : undefined);
    } else {
      obj.triggers = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListTriggerResponse>, I>>(object: I): ListTriggerResponse {
    const message = createBaseListTriggerResponse();
    message.triggers = object.triggers?.map((e) => Trigger.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListTriggerResponse.$type, ListTriggerResponse);

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
