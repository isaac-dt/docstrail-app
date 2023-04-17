import { AppError } from "../../../generated/types/common.pb";
import { Order } from "../../../generated/types/operation/order/order.pb";
/** Order data service. */
export declare class OrderDataService {
    readonly db: FirebaseFirestore.Firestore;
    getOrder(args: {
        orderId: string;
    }): Promise<Order | AppError>;
    createOrder(args: {
        orderData: Partial<Order>;
    }): Promise<Order | AppError>;
    updateOrderFields(args: {
        orderId: string;
        orderData: Partial<Order>;
    }): Promise<Order | AppError>;
}
