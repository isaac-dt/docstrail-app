import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { ProposalPermissionService } from "../../proposal-module/proposal/proposal.permission";
import { CommentThreadDataService } from "./thread.data";
/**
 * Manages authorizations for accessing comment thread data.
 */
export declare class CommentThreadPermissionService {
    private readonly userDataService;
    private readonly proposalPermissionService;
    private readonly commentThreadData;
    constructor(userDataService: UserDataService, proposalPermissionService: ProposalPermissionService, commentThreadData: CommentThreadDataService);
    /** Gets permission operations that apply to a targeted proposal. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.COMMENT_THREAD;
        resourceId: string;
    }): Promise<PermissionOp>;
}
