import {Injectable} from "../../../framework/core/utils";
import {UserDataService} from "../../account-module/user/user.data";
import {AppError} from "../../generated/types/common.pb";
import {
  DBEntity,
  Permission,
  PermissionOp,
} from "../../generated/types/permission.pb";
import {ProposalPermissionService} from "../../proposal-module/proposal/proposal.permission";
import {
  canReadWith,
  canReviewWith,
  getHighestPermissionOp,
  getPermission,
} from "../../shared/permission/permission.data";
import {CommentThreadDataService} from "./thread.data";

/**
 * Manages authorizations for accessing comment thread data.
 */
@Injectable()
export class CommentThreadPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly proposalPermissionService: ProposalPermissionService,
    private readonly commentThreadData: CommentThreadDataService
  ) {}
  /** Gets permission operations that apply to a targeted proposal. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.COMMENT_THREAD;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsCommentThreadPromise =
      this.commentThreadData.getCommentThread({
        commentThreadId: args.resourceId,
      });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsCommentThread = await resourceAsCommentThreadPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsCommentThread.$type === AppError.$type)
      return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.COMMENT_THREAD,
      resourceId: args.resourceId,
    });

    let permissionOfTeam: Promise<Permission> = Promise.resolve(
      Permission.fromPartial({operation: PermissionOp.NONE})
    );
    if (accessorAsUser.teamId) {
      permissionOfTeam = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.COMMENT_THREAD,
        resourceId: args.resourceId,
      });
    }

    const inheritedPermissionOp =
      this.proposalPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.PROPOSAL,
        resourceId: resourceAsCommentThread.proposalId!,
      });

    // Indirect permissions are always dilluted to review or below.
    const highestIndirectPermissionOp = getHighestPermissionOp([
      (await permissionOfTeam).operation,
      await inheritedPermissionOp,
    ]);
    const indirectPermissionOp = canReviewWith(highestIndirectPermissionOp)
      ? PermissionOp.REVIEW
      : canReadWith(highestIndirectPermissionOp)
      ? PermissionOp.READ
      : PermissionOp.NONE;

    return getHighestPermissionOp([
      (await permissionOfUser).operation,
      indirectPermissionOp,
    ]);
  }
}
