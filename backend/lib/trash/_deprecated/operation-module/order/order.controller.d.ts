import { Request, Response } from "@dimetrail/firebase/core/https";
import { RootDataService } from "../../../account-module/root/root.data";
import { RootPermissionService } from "../../../account-module/root/root.permission";
import { DeliveryItemDataService } from "../item/item.data";
import { TemplateDataService } from "../template/template.data";
import { OrderDataService } from "./order.data";
import { OrderPermissionService } from "./order.permission";
/** Controller for Order. */
export declare class OrderController {
    private readonly orderDataService;
    private readonly orderPermissionService;
    private readonly rootDataService;
    private readonly rootPermissionService;
    private readonly templateDataService;
    private readonly deliveryItemDataService;
    constructor(orderDataService: OrderDataService, orderPermissionService: OrderPermissionService, rootDataService: RootDataService, rootPermissionService: RootPermissionService, templateDataService: TemplateDataService, deliveryItemDataService: DeliveryItemDataService);
    getOrder(req: Request, res: Response): Promise<any>;
    createOrder(req: Request, res: Response): Promise<any>;
    updateOrderFields(req: Request, res: Response): Promise<any>;
    private buildGetOrderResponse;
}
