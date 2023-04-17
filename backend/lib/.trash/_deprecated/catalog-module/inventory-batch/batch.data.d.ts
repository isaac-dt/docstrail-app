import { AppError } from "../../../generated/types/common.pb";
import { InventoryBatch } from "../../../generated/types/catalog/inventory/batch.pb";
/** Inventory Batch Data service. */
export declare class InventoryBatchDataService {
    readonly db: any;
    getBatch(args: {
        batchId: string;
    }): Promise<InventoryBatch | AppError>;
    getInventoryBatchesOfProduct(args: {
        productId: string;
    }): Promise<readonly InventoryBatch[]>;
    createBatch(args: {
        batchData: Partial<InventoryBatch>;
    }): Promise<InventoryBatch | AppError>;
    updateBatchFields(args: {
        batchId: string;
        batchData: Partial<InventoryBatch>;
    }): Promise<InventoryBatch | AppError>;
}
