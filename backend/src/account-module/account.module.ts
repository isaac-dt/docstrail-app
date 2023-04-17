import {UserController} from "./user/user.controller";
import {TeamController} from "./team/team.controller";
import {ClientController} from "./client/client.controller";
import {DtModule} from "../../framework/core/utils";
import {TeamDataService} from "./team/team.data";
import {TeamPermissionService} from "./team/team.permission";
import {UserDataService} from "./user/user.data";
import {UserPermissionService} from "./user/user.permission";
import {AddressDataService} from "./address/address.data";
import {ClientDataService} from "./client/client.data";
import {ClientPermissionService} from "./client/client.permission";
import {RootDataService} from "./root/root.data";
import {RootPermissionService} from "./root/root.permission";
import {UserAddressController} from "./address/address.controller";
import {AddressPermissionService} from "./address/address.permission";
import {JobRoleController} from "./job-role/job-role.controller";
import {JobRoleDataService} from "./job-role/job-role.data";
import {JobRolePermissionService} from "./job-role/job-role.permission";
import {RootController} from "./root/root.controller";

/**
 * Module for Account management.
 */
@DtModule({
  path: "account",
  controllers: [
    UserController,
    TeamController,
    ClientController,
    UserAddressController,
    JobRoleController,
    RootController,
  ],
  providers: [
    TeamDataService,
    TeamPermissionService,
    UserDataService,
    UserPermissionService,
    AddressDataService,
    AddressPermissionService,
    ClientDataService,
    ClientPermissionService,
    RootDataService,
    RootPermissionService,
    JobRoleDataService,
    JobRolePermissionService,
  ],
})
export class AccountModule {}
