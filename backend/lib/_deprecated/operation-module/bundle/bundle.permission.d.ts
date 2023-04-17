import { DBEntity, PermissionOp } from "../../../generated/types/permission.pb";
import { UserDataService } from "../../../account-module/user/user.data";
import { ClientPermissionService } from "../../../account-module/client/client.permission";
import { RootPermissionService } from "../../../account-module/root/root.permission";
import { BundleDataService } from "./bundle.data";
/**
 * Manages authorizations for accessing bundle data.
 */
export declare class BundlePermissionService {
    private readonly bundleDataService;
    private readonly userDataService;
    private readonly clientPermissionService;
    private readonly rootPermissionService;
    constructor(bundleDataService: BundleDataService, userDataService: UserDataService, clientPermissionService: ClientPermissionService, rootPermissionService: RootPermissionService);
    /** Gets highest permission operation that apply to a targeted bundle. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.BUNDLE;
        resourceId: string;
    }): Promise<PermissionOp>;
}
