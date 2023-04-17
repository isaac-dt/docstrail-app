import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {Order} from "../../../generated/types/operation/order/order.pb";
import {ORDER_COLLECTION_NAME, ORDER_COLLECTION_SCHEMA} from "./order.schema";
import {WriteOrderRequest} from "../../../generated/types/operation/order/order.api.pb";

/** Order data service. */
@Injectable()
export class OrderDataService {
  readonly db = getFirestore();

  async getOrder(args: {orderId: string}): Promise<Order | AppError> {
    const orderSnap = await this.db
      .collection(ORDER_COLLECTION_NAME)
      .doc(args.orderId)
      .get();
    const order: Partial<Order> | undefined = orderSnap.data();
    if (!order) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: ORDER_COLLECTION_NAME, id: args.orderId},
      });
    }
    return Order.fromPartial({...order, id: orderSnap.id});
  }

  async createOrder(args: {
    orderData: Partial<Order>;
  }): Promise<Order | AppError> {
    const parser = getDataParsers({schema: ORDER_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.orderData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedOrderData = WriteOrderRequest.fromPartial(
      parser.sanitize({
        ...args.orderData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const orderRef = await this.db
      .collection(ORDER_COLLECTION_NAME)
      .add(WriteOrderRequest.toJSON(sanitizedOrderData) as DocumentData);
    const order = await this.getOrder({orderId: orderRef.id});
    if (!order) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return order;
  }

  async updateOrderFields(args: {
    orderId: string;
    orderData: Partial<Order>;
  }): Promise<Order | AppError> {
    const order = await this.getOrder({orderId: args.orderId});
    if (!order) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: ORDER_COLLECTION_NAME, id: args.orderId},
      });
    }
    const parser = getDataParsers({
      schema: ORDER_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.orderData),
    });
    const validationErrors = parser.validate(args.orderData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedOrderData = WriteOrderRequest.fromPartial(
      parser.sanitize({
        ...args.orderData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(ORDER_COLLECTION_NAME)
      .doc(args.orderId)
      .update(WriteOrderRequest.toJSON(sanitizedOrderData) as DocumentData);
    const updatedOrder = await this.getOrder({orderId: args.orderId});
    if (!updatedOrder)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedOrder;
  }
}
