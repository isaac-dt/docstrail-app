import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { ProposalDataService } from "./proposal.data";
/**
 * Manages authorizations for accessing proposal data.
 */
export declare class ProposalPermissionService {
    private readonly userDataService;
    private readonly proposalData;
    constructor(userDataService: UserDataService, proposalData: ProposalDataService);
    /** Gets permission operations that apply to a targeted proposal. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.PROPOSAL;
        resourceId: string;
    }): Promise<PermissionOp>;
}
