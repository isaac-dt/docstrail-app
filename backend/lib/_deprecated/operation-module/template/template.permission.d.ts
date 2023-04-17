import { UserDataService } from "../../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../../generated/types/permission.pb";
import { TemplateDataService } from "./template.data";
/**
 * Manages authorizations for accessing template data.
 */
export declare class TemplatePermissionService {
    private readonly userDataService;
    private readonly templateDataService;
    constructor(userDataService: UserDataService, templateDataService: TemplateDataService);
    /** Gets permission operations that apply to a targeted template. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.TEMPLATE;
        resourceId: string;
    }): Promise<PermissionOp>;
}
