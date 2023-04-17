import {DtModule} from "@dimetrail/firebase/core/utils";
import {AllowListController} from "./allow-list/allow-list.controller";
import {AllowListDataService} from "./allow-list/allow-list.data";
import {AllowListPermissionService} from "./allow-list/allow-list.permission";
import {CompanyController} from "./company/company.controller";
import {CompanyDataService} from "./company/company.data";
import {CompanyPermissionService} from "./company/company.permission";
import {CoreDefinitionController} from "./core-definition/core-def.controller";
import {CoreDefinitionDataService} from "./core-definition/core-def.data";
import {CoreDefinitionPermissionService} from "./core-definition/core-def.permission";
import {CoreDefinitionSharedService} from "./core-definition/core-def.shared";
import {DistributionOutletController} from "./distribution-outlet/dist-outlet.controller";
import {DistributionOutletDataService} from "./distribution-outlet/dist-outlet.data";
import {DistributionOutletPermissionService} from "./distribution-outlet/dist-outlet.permission";
import {DistributionOutletSharedService} from "./distribution-outlet/dist-outlet.shared";
import {InventoryBatchController} from "./inventory-batch/batch.controller";
import {InventoryBatchDataService} from "./inventory-batch/batch.data";
import {InventoryBatchPermissionService} from "./inventory-batch/batch.permission";
import {OpenDefinitionController} from "./open-definition/open-definition.controller";
import {OpenDefinitionDataService} from "./open-definition/open-definition.data";
import {OpenDefinitionPermissionService} from "./open-definition/open-definition.permission";
import {OutletAddressController} from "./outlet-address/outlet-address.controller";
import {OutletAddressDataService} from "./outlet-address/outlet-address.data";
import {OutletAddressPermissionService} from "./outlet-address/outlet-address.permission";
import {ProductController} from "./product/product.controller";
import {ProductDataService} from "./product/product.data";
import {ProductPermissionService} from "./product/product.permission";

/**
 * Module to manage items and catalogs.
 */
@DtModule({
  path: "catalog",
  controllers: [
    AllowListController,
    CompanyController,
    CoreDefinitionController,
    DistributionOutletController,
    InventoryBatchController,
    OpenDefinitionController,
    OutletAddressController,
    ProductController,
  ],
  providers: [
    AllowListDataService,
    AllowListPermissionService,
    CompanyDataService,
    CompanyPermissionService,
    CoreDefinitionDataService,
    CoreDefinitionPermissionService,
    CoreDefinitionSharedService,
    DistributionOutletDataService,
    DistributionOutletPermissionService,
    DistributionOutletSharedService,
    InventoryBatchDataService,
    InventoryBatchPermissionService,
    OpenDefinitionDataService,
    OpenDefinitionPermissionService,
    OutletAddressDataService,
    OutletAddressPermissionService,
    ProductDataService,
    ProductPermissionService,
  ],
})
export class CatalogModule {}
