import { AppError } from "../../../generated/types/common.pb";
import { DeliveryItem } from "../../../generated/types/operation/item/item.pb";
/** Delivery Item data service. */
export declare class DeliveryItemDataService {
    readonly db: any;
    getItem(args: {
        itemId: string;
    }): Promise<DeliveryItem | AppError>;
    getItemsOfOrder(args: {
        orderId: string;
    }): Promise<readonly DeliveryItem[]>;
    createItem(args: {
        itemData: Partial<DeliveryItem>;
    }): Promise<DeliveryItem | AppError>;
    updateItemFields(args: {
        itemId: string;
        itemData: Partial<DeliveryItem>;
    }): Promise<DeliveryItem | AppError>;
}
