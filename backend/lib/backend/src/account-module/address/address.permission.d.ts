import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { UserDataService } from "../user/user.data";
import { UserPermissionService } from "../user/user.permission";
import { AddressDataService } from "./address.data";
/**
 * Manages authorizations for accessing address data.
 */
export declare class AddressPermissionService {
    private readonly userDataService;
    private readonly userPermissionService;
    private readonly addressDataService;
    constructor(userDataService: UserDataService, userPermissionService: UserPermissionService, addressDataService: AddressDataService);
    /** Gets permission operations that apply to a targeted address. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.ADDRESS;
        resourceId: string;
    }): Promise<PermissionOp>;
}
