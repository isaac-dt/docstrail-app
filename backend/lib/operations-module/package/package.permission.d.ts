import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { UserDataService } from "../../account-module/user/user.data";
import { ClientPermissionService } from "../../account-module/client/client.permission";
import { RootPermissionService } from "../../account-module/root/root.permission";
import { PackageDataService } from "./package.data";
/**
 * Manages authorizations for accessing package data.
 */
export declare class PackagePermissionService {
    private readonly packageDataService;
    private readonly userDataService;
    private readonly clientPermissionService;
    private readonly rootPermissionService;
    constructor(packageDataService: PackageDataService, userDataService: UserDataService, clientPermissionService: ClientPermissionService, rootPermissionService: RootPermissionService);
    /** Gets highest permission operation that apply to a targeted package. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.PACKAGE;
        resourceId: string;
    }): Promise<PermissionOp>;
}
