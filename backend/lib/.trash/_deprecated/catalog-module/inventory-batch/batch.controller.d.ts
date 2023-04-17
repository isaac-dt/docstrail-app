import { Request, Response } from "@dimetrail/firebase/core/https";
import { ProductDataService } from "../product/product.data";
import { ProductPermissionService } from "../product/product.permission";
import { InventoryBatchDataService } from "./batch.data";
import { InventoryBatchPermissionService } from "./batch.permission";
/** Controller for Inventory Batch. */
export declare class InventoryBatchController {
    private readonly batchDataService;
    private readonly batchPermissionService;
    private readonly productDataService;
    private readonly productPermissionService;
    readonly db: any;
    constructor(batchDataService: InventoryBatchDataService, batchPermissionService: InventoryBatchPermissionService, productDataService: ProductDataService, productPermissionService: ProductPermissionService);
    getBatch(req: Request, res: Response): Promise<any>;
    createBatch(req: Request, res: Response): Promise<any>;
    updateBatchFields(req: Request, res: Response): Promise<any>;
    private buildGetBatchResponse;
}
