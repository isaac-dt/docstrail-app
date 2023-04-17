/* eslint-disable */
import { UserAddress } from "../../account/user/address.pb";
import { User } from "../../account/user/user.pb";
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { DeliveryItem } from "../item/item.pb";
import { Template } from "../template/template.pb";
import { Trigger } from "../trigger/trigger.pb";
import { Order, OrderApproval, OrderStatus, orderStatusFromJSON, orderStatusToJSON } from "./order.pb";

export const protobufPackage = "operation.order";

/** Next Id: 11 */
export interface WriteOrderRequest {
  $type: "operation.order.WriteOrderRequest";
  readonly status: OrderStatus;
  readonly approval: OrderApproval | undefined;
  readonly trackingNumber: string | undefined;
  readonly expectedDeliveryDate: Date | undefined;
  readonly estimatedDeliveryDate: Date | undefined;
  readonly shippingDate: Date | undefined;
  readonly trigger: Trigger | undefined;
  readonly deliveryAddress: UserAddress | undefined;
  readonly user: User | undefined;
  readonly rootId: string | undefined;
}

/** Next Id: 4 */
export interface GetOrderResponse {
  $type: "operation.order.GetOrderResponse";
  readonly order:
    | Order
    | undefined;
  /**
   * The template might have been modified after the order is created.
   * The system should rely on the order field as source of truth.
   */
  readonly template: Template | undefined;
  readonly items: readonly DeliveryItem[];
}

/** Next Id: 3 */
export interface ListOrderResponse {
  $type: "operation.order.ListOrderResponse";
  readonly orders: readonly Order[];
  readonly matchCount: number;
}

function createBaseWriteOrderRequest(): WriteOrderRequest {
  return {
    $type: "operation.order.WriteOrderRequest",
    status: OrderStatus.REQUESTED,
    approval: undefined,
    trackingNumber: undefined,
    expectedDeliveryDate: undefined,
    estimatedDeliveryDate: undefined,
    shippingDate: undefined,
    trigger: undefined,
    deliveryAddress: undefined,
    user: undefined,
    rootId: undefined,
  };
}

export const WriteOrderRequest = {
  $type: "operation.order.WriteOrderRequest" as const,

  fromJSON(object: any): WriteOrderRequest {
    return {
      $type: WriteOrderRequest.$type,
      status: isSet(object.status) ? orderStatusFromJSON(object.status) : OrderStatus.REQUESTED,
      approval: isSet(object.approval) ? OrderApproval.fromJSON(object.approval) : undefined,
      trackingNumber: isSet(object.trackingNumber) ? String(object.trackingNumber) : undefined,
      expectedDeliveryDate: isSet(object.expectedDeliveryDate)
        ? fromJsonTimestamp(object.expectedDeliveryDate)
        : undefined,
      estimatedDeliveryDate: isSet(object.estimatedDeliveryDate)
        ? fromJsonTimestamp(object.estimatedDeliveryDate)
        : undefined,
      shippingDate: isSet(object.shippingDate) ? fromJsonTimestamp(object.shippingDate) : undefined,
      trigger: isSet(object.trigger) ? Trigger.fromJSON(object.trigger) : undefined,
      deliveryAddress: isSet(object.deliveryAddress) ? UserAddress.fromJSON(object.deliveryAddress) : undefined,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      rootId: isSet(object.rootId) ? String(object.rootId) : undefined,
    };
  },

  toJSON(message: WriteOrderRequest): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = orderStatusToJSON(message.status));
    message.approval !== undefined &&
      (obj.approval = message.approval ? OrderApproval.toJSON(message.approval) : undefined);
    message.trackingNumber !== undefined && (obj.trackingNumber = message.trackingNumber);
    message.expectedDeliveryDate !== undefined &&
      (obj.expectedDeliveryDate = message.expectedDeliveryDate.toISOString());
    message.estimatedDeliveryDate !== undefined &&
      (obj.estimatedDeliveryDate = message.estimatedDeliveryDate.toISOString());
    message.shippingDate !== undefined && (obj.shippingDate = message.shippingDate.toISOString());
    message.trigger !== undefined && (obj.trigger = message.trigger ? Trigger.toJSON(message.trigger) : undefined);
    message.deliveryAddress !== undefined &&
      (obj.deliveryAddress = message.deliveryAddress ? UserAddress.toJSON(message.deliveryAddress) : undefined);
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.rootId !== undefined && (obj.rootId = message.rootId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteOrderRequest>, I>>(object: I): WriteOrderRequest {
    const message = createBaseWriteOrderRequest() as any;
    message.status = object.status ?? OrderStatus.REQUESTED;
    message.approval = (object.approval !== undefined && object.approval !== null)
      ? OrderApproval.fromPartial(object.approval)
      : undefined;
    message.trackingNumber = object.trackingNumber ?? undefined;
    message.expectedDeliveryDate = object.expectedDeliveryDate ?? undefined;
    message.estimatedDeliveryDate = object.estimatedDeliveryDate ?? undefined;
    message.shippingDate = object.shippingDate ?? undefined;
    message.trigger = (object.trigger !== undefined && object.trigger !== null)
      ? Trigger.fromPartial(object.trigger)
      : undefined;
    message.deliveryAddress = (object.deliveryAddress !== undefined && object.deliveryAddress !== null)
      ? UserAddress.fromPartial(object.deliveryAddress)
      : undefined;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.rootId = object.rootId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteOrderRequest.$type, WriteOrderRequest);

function createBaseGetOrderResponse(): GetOrderResponse {
  return { $type: "operation.order.GetOrderResponse", order: undefined, template: undefined, items: [] };
}

export const GetOrderResponse = {
  $type: "operation.order.GetOrderResponse" as const,

  fromJSON(object: any): GetOrderResponse {
    return {
      $type: GetOrderResponse.$type,
      order: isSet(object.order) ? Order.fromJSON(object.order) : undefined,
      template: isSet(object.template) ? Template.fromJSON(object.template) : undefined,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => DeliveryItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetOrderResponse): unknown {
    const obj: any = {};
    message.order !== undefined && (obj.order = message.order ? Order.toJSON(message.order) : undefined);
    message.template !== undefined && (obj.template = message.template ? Template.toJSON(message.template) : undefined);
    if (message.items) {
      obj.items = message.items.map((e) => e ? DeliveryItem.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOrderResponse>, I>>(object: I): GetOrderResponse {
    const message = createBaseGetOrderResponse() as any;
    message.order = (object.order !== undefined && object.order !== null) ? Order.fromPartial(object.order) : undefined;
    message.template = (object.template !== undefined && object.template !== null)
      ? Template.fromPartial(object.template)
      : undefined;
    message.items = object.items?.map((e) => DeliveryItem.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetOrderResponse.$type, GetOrderResponse);

function createBaseListOrderResponse(): ListOrderResponse {
  return { $type: "operation.order.ListOrderResponse", orders: [], matchCount: 0 };
}

export const ListOrderResponse = {
  $type: "operation.order.ListOrderResponse" as const,

  fromJSON(object: any): ListOrderResponse {
    return {
      $type: ListOrderResponse.$type,
      orders: Array.isArray(object?.orders) ? object.orders.map((e: any) => Order.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListOrderResponse): unknown {
    const obj: any = {};
    if (message.orders) {
      obj.orders = message.orders.map((e) => e ? Order.toJSON(e) : undefined);
    } else {
      obj.orders = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListOrderResponse>, I>>(object: I): ListOrderResponse {
    const message = createBaseListOrderResponse() as any;
    message.orders = object.orders?.map((e) => Order.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListOrderResponse.$type, ListOrderResponse);

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
