import {
  get,
  patch,
  post,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {RootDataService} from "../../../account-module/root/root.data";
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {GetOrderResponse} from "../../../generated/types/operation/order/order.api.pb";
import {Order} from "../../../generated/types/operation/order/order.pb";
import {Template} from "../../../generated/types/operation/template/template.pb";
import {DBEntity} from "../../../generated/types/permission.pb";
import {guard} from "../../../shared/authentication/auth";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {buildRes} from "../../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../../shared/permission/permission.data";
import {DeliveryItemDataService} from "../item/item.data";
import {TemplateDataService} from "../template/template.data";
import {OrderDataService} from "./order.data";
import {OrderPermissionService} from "./order.permission";
import {ORDER_COLLECTION_SCHEMA} from "./order.schema";

/** Controller for Order. */
@Controller({
  path: "order",
  runHttpAfter: [guard],
})
export class OrderController {
  constructor(
    private readonly orderDataService: OrderDataService,
    private readonly orderPermissionService: OrderPermissionService,
    private readonly rootDataService: RootDataService,
    private readonly rootPermissionService: RootPermissionService,
    private readonly templateDataService: TemplateDataService,
    private readonly deliveryItemDataService: DeliveryItemDataService
  ) {}

  @get({path: "/:orderId"})
  async getOrder(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.orderPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ORDER,
      resourceId: req.params.orderId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const order = await this.orderDataService.getOrder({
      orderId: req.params.orderId,
    });
    if (order.$type === AppError.$type) {
      const resData = buildRes({appError: order});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetOrderResponse(order);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createOrder(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: ORDER_COLLECTION_SCHEMA});
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
    const targetRoot = await this.rootDataService.getRoot({
      rootId: req.body.rootId,
    });
    if (targetRoot.$type === AppError.$type) {
      const resData = buildRes({appError: targetRoot});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.rootPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ROOT,
      resourceId: targetRoot.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const order = await this.orderDataService.createOrder({
      orderData: req.body,
    });
    if (order.$type === AppError.$type) {
      const appError = order;
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
    const response = await this.buildGetOrderResponse(order);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:orderId"})
  async updateOrderFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: ORDER_COLLECTION_SCHEMA,
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
    const targetOrder = await this.orderDataService.getOrder({
      orderId: req.params.orderId,
    });
    if (targetOrder.$type === AppError.$type) {
      const resData = buildRes({appError: targetOrder});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.orderPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ORDER,
      resourceId: targetOrder.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const order = await this.orderDataService.updateOrderFields({
      orderId: req.params.orderId,
      orderData: req.body,
    });
    if (order.$type === AppError.$type) {
      const appError = order;
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
    const response = await this.buildGetOrderResponse(order);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetOrderResponse(order: Order): Promise<GetOrderResponse> {
    let templatePromise: Promise<Template | AppError> | undefined;
    if (order.templateId) {
      templatePromise = this.templateDataService.getTemplate({
        templateId: order.templateId,
      });
    }
    const deliveryItems = this.deliveryItemDataService.getItemsOfOrder({
      orderId: order.id,
    });
    const response = GetOrderResponse.fromPartial({
      order,
      template: templatePromise ? await templatePromise : undefined,
      items: await deliveryItems,
    });
    return response;
  }
}
