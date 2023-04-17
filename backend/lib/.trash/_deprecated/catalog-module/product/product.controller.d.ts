import { Request, Response } from "@dimetrail/firebase/core/https";
import { CoreDefinitionDataService } from "../core-definition/core-def.data";
import { DistributionOutletDataService } from "../distribution-outlet/dist-outlet.data";
import { DistributionOutletPermissionService } from "../distribution-outlet/dist-outlet.permission";
import { InventoryBatchDataService } from "../inventory-batch/batch.data";
import { OpenDefinitionDataService } from "../open-definition/open-definition.data";
import { ProductDataService } from "./product.data";
import { ProductPermissionService } from "./product.permission";
/** Controller for Product. */
export declare class ProductController {
    private readonly productDataService;
    private readonly productPermissionService;
    private readonly distOutletDataService;
    private readonly distOutletPermissionService;
    private readonly openDefDataService;
    private readonly coreDefDataService;
    private readonly inventoryBatchDataService;
    readonly db: any;
    constructor(productDataService: ProductDataService, productPermissionService: ProductPermissionService, distOutletDataService: DistributionOutletDataService, distOutletPermissionService: DistributionOutletPermissionService, openDefDataService: OpenDefinitionDataService, coreDefDataService: CoreDefinitionDataService, inventoryBatchDataService: InventoryBatchDataService);
    getProduct(req: Request, res: Response): Promise<any>;
    createProduct(req: Request, res: Response): Promise<any>;
    updateProductFields(req: Request, res: Response): Promise<any>;
    private buildGetProductResponse;
}
