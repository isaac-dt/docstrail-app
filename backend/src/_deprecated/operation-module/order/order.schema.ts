import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";
import {
  OrderApproval,
  OrderStatus,
} from "../../../generated/types/operation/order/order.pb";
import {User} from "../../../generated/types/account/user/user.pb";
import {UserAddress} from "../../../generated/types/account/user/address.pb";
import {Trigger} from "../../../generated/types/operation/trigger/trigger.pb";

/** Collection reference for firestore. */
export const ORDER_COLLECTION_NAME = "operation-order";

/** Validation schema for the companies collection. */
export const ORDER_COLLECTION_SCHEMA: CollectionSchema = {
  rootId: {
    description: "root alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  status: {
    description: "the delivery status of an order",
    pattern: (status: any) => Object.values(OrderStatus).includes(status),
  },
  approval: {
    description: "a struct as the approval state of an order",
    pattern: (approval: any) =>
      approval.$type === "operation.order.OrderApproval",
    sanitize: (approval: any) => OrderApproval.fromPartial(approval),
  },
  trackingNumber: {
    description: "the order's tracking number",
    pattern: (num: string) =>
      validator.isInt(num, {allow_leading_zeroes: true}),
  },
  expectedDeliveryDate: {
    description: "The expected delivery date",
    pattern: validator.isDate,
  },
  estimatedDeliveryDate: {
    description: "The delivery date as estimated by the shipping entity",
    pattern: validator.isDate,
  },
  shippingDate: {
    description: "The date at which order was shipped",
    pattern: validator.isDate,
  },
  trigger: {
    description: "the 'Trigger' that created the order",
    pattern: (trigger: any) => trigger.$type === "operation.trigger.Trigger",
    sanitize: (trigger: any) => Trigger.fromPartial(trigger),
  },
  deliveryAddress: {
    description: "the address at which to deliver the order",
    pattern: (address: any) => address.$type === "account.user.UserAddress",
    sanitize: (address: any) => UserAddress.fromPartial(address),
  },
  user: {
    description: "the user to whom the order is sent",
    pattern: (user: any) => user.$type === "account.user.User",
    sanitize: (user: any) => User.fromPartial(user),
  },
};
