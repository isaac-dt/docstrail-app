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
    readonly db: FirebaseFirestore.Firestore;
    constructor(batchDataService: InventoryBatchDataService, batchPermissionService: InventoryBatchPermissionService, productDataService: ProductDataService, productPermissionService: ProductPermissionService);
    getBatch(req: Request, res: Response): Promise<Response>;
    createBatch(req: Request, res: Response): Promise<Response>;
    updateBatchFields(req: Request, res: Response): Promise<Response>;
    private buildGetBatchResponse;
}
