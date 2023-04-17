import {Injectable} from "@dimetrail/firebase/core/utils";
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
import {ProposalReviewDataService} from "./review.data";

/**
 * Manages authorizations for accessing proposal review data.
 */
@Injectable()
export class ProposalReviewPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly proposalPermissionService: ProposalPermissionService,
    private readonly proposalReviewData: ProposalReviewDataService
  ) {}
  /** Gets permission operations that apply to a targeted proposal. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.PROPOSAL_REVIEW;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsProposalReviewPromise =
      this.proposalReviewData.getProposalReview({
        proposalReviewId: args.resourceId,
      });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsProposalReview = await resourceAsProposalReviewPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsProposalReview.$type === AppError.$type)
      return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.PROPOSAL_REVIEW,
      resourceId: args.resourceId,
    });

    let permissionOfTeam: Promise<Permission> = Promise.resolve(
      Permission.fromPartial({operation: PermissionOp.NONE})
    );
    if (accessorAsUser.teamId) {
      permissionOfTeam = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.PROPOSAL_REVIEW,
        resourceId: args.resourceId,
      });
    }

    const inheritedPermissionOp =
      this.proposalPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.PROPOSAL,
        resourceId: resourceAsProposalReview.proposalId!,
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
