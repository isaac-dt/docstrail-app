/* eslint-disable */
import { UserAddress } from "../../account/user/address.pb";
import { User } from "../../account/user/user.pb";
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { Trigger } from "../trigger/trigger.pb";

export const protobufPackage = "operation.order";

/**
 * Status of an order.
 * Next Id: 4
 */
export enum OrderStatus {
  REQUESTED = "REQUESTED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function orderStatusFromJSON(object: any): OrderStatus {
  switch (object) {
    case 0:
    case "REQUESTED":
      return OrderStatus.REQUESTED;
    case 1:
    case "IN_TRANSIT":
      return OrderStatus.IN_TRANSIT;
    case 2:
    case "DELIVERED":
      return OrderStatus.DELIVERED;
    case 3:
    case "CANCELLED":
      return OrderStatus.CANCELLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderStatus.UNRECOGNIZED;
  }
}

export function orderStatusToJSON(object: OrderStatus): string {
  switch (object) {
    case OrderStatus.REQUESTED:
      return "REQUESTED";
    case OrderStatus.IN_TRANSIT:
      return "IN_TRANSIT";
    case OrderStatus.DELIVERED:
      return "DELIVERED";
    case OrderStatus.CANCELLED:
      return "CANCELLED";
    case OrderStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Approval Status of an order.
 * Next Id: 2
 */
export enum OrderApprovalStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function orderApprovalStatusFromJSON(object: any): OrderApprovalStatus {
  switch (object) {
    case 0:
    case "APPROVED":
      return OrderApprovalStatus.APPROVED;
    case 1:
    case "REJECTED":
      return OrderApprovalStatus.REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderApprovalStatus.UNRECOGNIZED;
  }
}

export function orderApprovalStatusToJSON(object: OrderApprovalStatus): string {
  switch (object) {
    case OrderApprovalStatus.APPROVED:
      return "APPROVED";
    case OrderApprovalStatus.REJECTED:
      return "REJECTED";
    case OrderApprovalStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * An order to deliver items.
 * Next Id: 15
 */
export interface Order {
  $type: "operation.order.Order";
  id: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  templateId: string | undefined;
  expectedDeliveryDate: Date | undefined;
  estimatedDeliveryDate: Date | undefined;
  shippingDate: Date | undefined;
  trackingNumber: string | undefined;
  status: OrderStatus;
  approval: OrderApproval | undefined;
  trigger: Trigger | undefined;
  deliveryAddress: UserAddress | undefined;
  user: User | undefined;
  rootId: string;
}

/**
 * Approval data for an order.
 * Next Id: 5
 */
export interface OrderApproval {
  $type: "operation.order.OrderApproval";
  time: Date | undefined;
  userId: string;
  status: OrderApprovalStatus;
  note: string | undefined;
}

function createBaseOrder(): Order {
  return {
    $type: "operation.order.Order",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    templateId: undefined,
    expectedDeliveryDate: undefined,
    estimatedDeliveryDate: undefined,
    shippingDate: undefined,
    trackingNumber: undefined,
    status: OrderStatus.REQUESTED,
    approval: undefined,
    trigger: undefined,
    deliveryAddress: undefined,
    user: undefined,
    rootId: "",
  };
}

export const Order = {
  $type: "operation.order.Order" as const,

  fromJSON(object: any): Order {
    return {
      $type: Order.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      templateId: isSet(object.templateId) ? String(object.templateId) : undefined,
      expectedDeliveryDate: isSet(object.expectedDeliveryDate)
        ? fromJsonTimestamp(object.expectedDeliveryDate)
        : undefined,
      estimatedDeliveryDate: isSet(object.estimatedDeliveryDate)
        ? fromJsonTimestamp(object.estimatedDeliveryDate)
        : undefined,
      shippingDate: isSet(object.shippingDate) ? fromJsonTimestamp(object.shippingDate) : undefined,
      trackingNumber: isSet(object.trackingNumber) ? String(object.trackingNumber) : undefined,
      status: isSet(object.status) ? orderStatusFromJSON(object.status) : OrderStatus.REQUESTED,
      approval: isSet(object.approval) ? OrderApproval.fromJSON(object.approval) : undefined,
      trigger: isSet(object.trigger) ? Trigger.fromJSON(object.trigger) : undefined,
      deliveryAddress: isSet(object.deliveryAddress) ? UserAddress.fromJSON(object.deliveryAddress) : undefined,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      rootId: isSet(object.rootId) ? String(object.rootId) : "",
    };
  },

  toJSON(message: Order): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.expectedDeliveryDate !== undefined &&
      (obj.expectedDeliveryDate = message.expectedDeliveryDate.toISOString());
    message.estimatedDeliveryDate !== undefined &&
      (obj.estimatedDeliveryDate = message.estimatedDeliveryDate.toISOString());
    message.shippingDate !== undefined && (obj.shippingDate = message.shippingDate.toISOString());
    message.trackingNumber !== undefined && (obj.trackingNumber = message.trackingNumber);
    message.status !== undefined && (obj.status = orderStatusToJSON(message.status));
    message.approval !== undefined &&
      (obj.approval = message.approval ? OrderApproval.toJSON(message.approval) : undefined);
    message.trigger !== undefined && (obj.trigger = message.trigger ? Trigger.toJSON(message.trigger) : undefined);
    message.deliveryAddress !== undefined &&
      (obj.deliveryAddress = message.deliveryAddress ? UserAddress.toJSON(message.deliveryAddress) : undefined);
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.rootId !== undefined && (obj.rootId = message.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Order>, I>>(object: I): Order {
    const message = createBaseOrder();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.templateId = object.templateId ?? undefined;
    message.expectedDeliveryDate = object.expectedDeliveryDate ?? undefined;
    message.estimatedDeliveryDate = object.estimatedDeliveryDate ?? undefined;
    message.shippingDate = object.shippingDate ?? undefined;
    message.trackingNumber = object.trackingNumber ?? undefined;
    message.status = object.status ?? OrderStatus.REQUESTED;
    message.approval = (object.approval !== undefined && object.approval !== null)
      ? OrderApproval.fromPartial(object.approval)
      : undefined;
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? Trigger.fromPartial(object.trigger)
      : undefined;
    message.deliveryAddress = (object.deliveryAddress !== undefined && object.deliveryAddress !== null)
      ? UserAddress.fromPartial(object.deliveryAddress)
      : undefined;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.rootId = object.rootId ?? "";
    return message;
  },
};

messageTypeRegistry.set(Order.$type, Order);

function createBaseOrderApproval(): OrderApproval {
  return {
    $type: "operation.order.OrderApproval",
    time: undefined,
    userId: "",
    status: OrderApprovalStatus.APPROVED,
    note: undefined,
  };
}

export const OrderApproval = {
  $type: "operation.order.OrderApproval" as const,

  fromJSON(object: any): OrderApproval {
    return {
      $type: OrderApproval.$type,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      userId: isSet(object.userId) ? String(object.userId) : "",
      status: isSet(object.status) ? orderApprovalStatusFromJSON(object.status) : OrderApprovalStatus.APPROVED,
      note: isSet(object.note) ? String(object.note) : undefined,
    };
  },

  toJSON(message: OrderApproval): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = message.time.toISOString());
    message.userId !== undefined && (obj.userId = message.userId);
    message.status !== undefined && (obj.status = orderApprovalStatusToJSON(message.status));
    message.note !== undefined && (obj.note = message.note);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OrderApproval>, I>>(object: I): OrderApproval {
    const message = createBaseOrderApproval();
    message.time = object.time ?? undefined;
    message.userId = object.userId ?? "";
    message.status = object.status ?? OrderApprovalStatus.APPROVED;
    message.note = object.note ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(OrderApproval.$type, OrderApproval);

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
