import {DtModule} from "@dimetrail/firebase/core/utils";
import { BundleController } from "./bundle/bundle.controller";
import { BundleDataService } from "./bundle/bundle.data";
import { BundlePermissionService } from "./bundle/bundle.permission";
import { DeliveryItemDataService } from "./item/item.data";
import { DeliveryItemPermissionService } from "./item/item.permission";
import { OrderController } from "./order/order.controller";
import { OrderDataService } from "./order/order.data";
import { OrderPermissionService } from "./order/order.permission";
import { PackageController } from "./package/package.controller";
import { PackageDataService } from "./package/package.data";
import { PackagePermissionService } from "./package/package.permission";
import { TargetController } from "./target/target.controller";
import { TargetDataService } from "./target/target.data";
import { TargetPermissionService } from "./target/target.permission";
import { TemplateController } from "./template/template.controller";
import { TemplateDataService } from "./template/template.data";
import { TemplatePermissionService } from "./template/template.permission";
import { TriggerController } from "./trigger/trigger.controller";
import { TriggerDataService } from "./trigger/trigger.data";
import { TriggerPermissionService } from "./trigger/trigger.permission";

/**
 * Module for operations that result in deliveries.
 */
@DtModule({
  path: "operation",
  controllers: [
    BundleController,
    PackageController,
    TargetController,
    TemplateController,
    TriggerController,
    OrderController
  ],
  providers: [
    BundleDataService,
    BundlePermissionService,
    PackageDataService,
    PackagePermissionService,
    TargetDataService,
    TargetPermissionService,
    TemplateDataService,
    TemplatePermissionService,
    TriggerDataService,
    TriggerPermissionService,
    OrderDataService,
    OrderPermissionService,
    DeliveryItemDataService,
    DeliveryItemPermissionService
  ],
})
export class OperationsModule {}
