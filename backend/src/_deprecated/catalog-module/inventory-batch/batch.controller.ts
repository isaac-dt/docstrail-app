import {
  get,
  patch,
  post,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {GetInventoryBatchResponse} from "../../../generated/types/catalog/inventory/batch.api.pb";
import {InventoryBatch} from "../../../generated/types/catalog/inventory/batch.pb";
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
import {ProductDataService} from "../product/product.data";
import {ProductPermissionService} from "../product/product.permission";
import {InventoryBatchDataService} from "./batch.data";
import {InventoryBatchPermissionService} from "./batch.permission";
import {INVENTORY_BATCH_COLLECTION_SCHEMA} from "./batch.schema";

/** Controller for Inventory Batch. */
@Controller({
  path: "inventory-batch",
  runHttpAfter: [guard],
})
export class InventoryBatchController {
  readonly db = getFirestore();

  constructor(
    private readonly batchDataService: InventoryBatchDataService,
    private readonly batchPermissionService: InventoryBatchPermissionService,
    private readonly productDataService: ProductDataService,
    private readonly productPermissionService: ProductPermissionService
  ) {}

  @get({path: "/:batchId"})
  async getBatch(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.batchPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.INVENTORY_BATCH,
      resourceId: req.params.batchId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const batch = await this.batchDataService.getBatch({
      batchId: req.params.batchId,
    });
    if (batch.$type === AppError.$type) {
      const resData = buildRes({appError: batch});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetBatchResponse(batch);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createBatch(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: INVENTORY_BATCH_COLLECTION_SCHEMA});
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
    const targetProduct = await this.productDataService.getProduct({
      productId: req.body.productId,
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
    const batch = await this.batchDataService.createBatch({
      batchData: req.body,
    });
    if (batch.$type === AppError.$type) {
      const appError = batch;
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
    const response = await this.buildGetBatchResponse(batch);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:batchId"})
  async updateBatchFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: INVENTORY_BATCH_COLLECTION_SCHEMA,
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
    const targetBatch = await this.batchDataService.getBatch({
      batchId: req.params.batchId,
    });
    if (targetBatch.$type === AppError.$type) {
      const resData = buildRes({appError: targetBatch});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.batchPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.INVENTORY_BATCH,
      resourceId: targetBatch.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const batch = await this.batchDataService.updateBatchFields({
      batchId: req.params.batchId,
      batchData: req.body,
    });
    if (batch.$type === AppError.$type) {
      const appError = batch;
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
    const response = await this.buildGetBatchResponse(batch);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetBatchResponse(
    batch: InventoryBatch
  ): Promise<GetInventoryBatchResponse> {
    const product = await this.productDataService.getProduct({
      productId: batch.productId,
    });
    const response = GetInventoryBatchResponse.fromPartial({
      inventoryBatch: batch,
      product,
    });
    return response;
  }
}
