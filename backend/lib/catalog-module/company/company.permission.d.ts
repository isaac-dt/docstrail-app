import { RootPermissionService } from "../../account-module/root/root.permission";
import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { CompanyDataService } from "./company.data";
/**
 * Manages authorizations for accessing company data.
 */
export declare class CompanyPermissionService {
    private readonly userDataService;
    private readonly rootPermissionService;
    private readonly companyDataService;
    constructor(userDataService: UserDataService, rootPermissionService: RootPermissionService, companyDataService: CompanyDataService);
    /** Gets permission operations that apply to a targeted company. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.COMPANY;
        resourceId: string;
    }): Promise<PermissionOp>;
}
