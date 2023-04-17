import {Injectable} from "../../../framework/core/utils";
import {UserDataService} from "../../account-module/user/user.data";
import {AppError} from "../../generated/types/common.pb";
import {
  DBEntity,
  Permission,
  PermissionOp,
} from "../../generated/types/permission.pb";
import {
  canReadWith,
  canReviewWith,
  getHighestPermissionOp,
  getPermission,
} from "../../shared/permission/permission.data";
import {CommentThreadPermissionService} from "../thread/thread.permission";
import {CommentMessageDataService} from "./message.data";

/**
 * Manages authorizations for accessing comment message data.
 */
@Injectable()
export class CommentMessagePermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly commentMessageData: CommentMessageDataService,
    private readonly commentThreadPermissionService: CommentThreadPermissionService
  ) {}
  /** Gets permission operations that apply to a targeted proposal. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.COMMENT_MESSAGE;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsCommentMessagePromise =
      this.commentMessageData.getCommentMessage({
        commentMessageId: args.resourceId,
      });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsCommentMessage = await resourceAsCommentMessagePromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsCommentMessage.$type === AppError.$type)
      return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.COMMENT_MESSAGE,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp =
      this.commentThreadPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.COMMENT_THREAD,
        resourceId: resourceAsCommentMessage.commentThreadId!,
      });

    let permissionOfTeam: Promise<Permission> = Promise.resolve(
      Permission.fromPartial({operation: PermissionOp.NONE})
    );
    if (accessorAsUser.teamId) {
      permissionOfTeam = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.COMMENT_MESSAGE,
        resourceId: args.resourceId,
      });
    }

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
