import {
  get,
  patch,
  post,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {GetProductResponse} from "../../../generated/types/catalog/product/product.api.pb";
import {Product} from "../../../generated/types/catalog/product/product.pb";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {DBEntity} from "../../../generated/types/permission.pb";
import {guard} from "../../../shared/authentication/auth";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {buildRes} from "../../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../../shared/permission/permission.data";
import {CoreDefinitionDataService} from "../core-definition/core-def.data";
import {DistributionOutletDataService} from "../distribution-outlet/dist-outlet.data";
import {DistributionOutletPermissionService} from "../distribution-outlet/dist-outlet.permission";
import {InventoryBatchDataService} from "../inventory-batch/batch.data";
import {OpenDefinitionDataService} from "../open-definition/open-definition.data";
import {ProductDataService} from "./product.data";
import {ProductPermissionService} from "./product.permission";
import {PRODUCT_COLLECTION_SCHEMA} from "./product.schema";

/** Controller for Product. */
@Controller({
  path: "product",
  runHttpAfter: [guard],
})
export class ProductController {
  readonly db = getFirestore();

  constructor(
    private readonly productDataService: ProductDataService,
    private readonly productPermissionService: ProductPermissionService,
    private readonly distOutletDataService: DistributionOutletDataService,
    private readonly distOutletPermissionService: DistributionOutletPermissionService,
    private readonly openDefDataService: OpenDefinitionDataService,
    private readonly coreDefDataService: CoreDefinitionDataService,
    private readonly inventoryBatchDataService: InventoryBatchDataService
  ) {}

  @get({path: "/:productId"})
  async getProduct(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.productPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PRODUCT,
      resourceId: req.params.productId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const product = await this.productDataService.getProduct({
      productId: req.params.productId,
    });
    if (product.$type === AppError.$type) {
      const resData = buildRes({appError: product});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetProductResponse(product);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createProduct(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: PRODUCT_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.json(resData);
    }
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const targetDistOutlet = await this.distOutletDataService.getDistOutlet({
      distOutletId: req.body.distributionOutletId,
    });
    if (targetDistOutlet.$type === AppError.$type) {
      const resData = buildRes({appError: targetDistOutlet});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.distOutletPermissionService.getPermissionOp(
      {
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.DISTRIBUTION_OUTLET,
        resourceId: targetDistOutlet.id,
      }
    );
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const product = await this.productDataService.createProduct({
      productData: req.body,
    });
    if (product.$type === AppError.$type) {
      const appError = product;
      switch (appError.errorCode) {
        case ErrorCode.INVALID_DATA: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
        case ErrorCode.NOT_FOUND_IN_DB: {
          const resData = buildRes({appError});
          return res.status(404).json(resData);
        }
        default: {
          const resData = buildRes({error: ErrorCode.UNKNOWN});
          return res.status(500).json(resData);
        }
      }
    }
    const response = await this.buildGetProductResponse(product);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:productId"})
  async updateProductFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: PRODUCT_COLLECTION_SCHEMA,
      onlyFields: Object.keys(req.body),
    });
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.status(400).json(resData);
    }
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const targetProduct = await this.productDataService.getProduct({
      productId: req.params.productId,
    });
    if (targetProduct.$type === AppError.$type) {
      const resData = buildRes({appError: targetProduct});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.productPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PRODUCT,
      resourceId: targetProduct.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const product = await this.productDataService.updateProductFields({
      productId: req.params.productId,
      productData: req.body,
    });
    if (product.$type === AppError.$type) {
      const appError = product;
      switch (appError.errorCode) {
        case ErrorCode.NOT_FOUND_IN_DB: {
          const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
          return res.status(404).json(resData);
        }
        case ErrorCode.INVALID_DATA: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
        default: {
          const resData = buildRes({error: ErrorCode.UNKNOWN});
          return res.status(500).json(resData);
        }
      }
    }
    const response = await this.buildGetProductResponse(product);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetProductResponse(
    product: Product
  ): Promise<GetProductResponse> {
    const openDefinitionPromise = this.openDefDataService.getOpenDefinition({
      openDefinitionId: product.openDefinitionId,
    });
    const distOutletPromise = this.distOutletDataService.getDistOutlet({
      distOutletId: product.distributionOutletId,
    });
    const inventoryBatchesPromise =
      this.inventoryBatchDataService.getInventoryBatchesOfProduct({
        productId: product.id,
      });
    const openDefinition = await openDefinitionPromise;
    let coreDefinition = undefined;
    if (openDefinition.$type !== AppError.$type) {
      coreDefinition = await this.coreDefDataService.getCoreDefinition({
        coreDefinitionId: openDefinition.coreDefinitionId,
      });
    }
    const response = GetProductResponse.fromPartial({
      distributionOutlet: await distOutletPromise,
      inventoryBatches: await inventoryBatchesPromise,
      openDefinition,
      coreDefinition,
    });
    return response;
  }
}
