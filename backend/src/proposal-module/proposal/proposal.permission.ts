import {Injectable} from "@dimetrail/firebase/core/utils";
import {UserDataService} from "../../account-module/user/user.data";
import {AppError} from "../../generated/types/common.pb";
import {
  DBEntity,
  Permission,
  PermissionOp,
} from "../../generated/types/permission.pb";
import {
  getHighestPermissionOp,
  getPermission,
} from "../../shared/permission/permission.data";
import {ProposalDataService} from "./proposal.data";

/**
 * Manages authorizations for accessing proposal data.
 */
@Injectable()
export class ProposalPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly proposalData: ProposalDataService
  ) {}
  /** Gets permission operations that apply to a targeted proposal. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.PROPOSAL;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsProposalPromise = this.proposalData.getProposal({
      proposalId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsProposal = await resourceAsProposalPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsProposal.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.PROPOSAL,
      resourceId: args.resourceId,
    });

    let permissionOfTeam: Promise<Permission> = Promise.resolve(
      Permission.fromPartial({operation: PermissionOp.NONE})
    );
    if (accessorAsUser.teamId) {
      permissionOfTeam = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.PROPOSAL,
        resourceId: args.resourceId,
      });
    }

    return getHighestPermissionOp([
      (await permissionOfUser).operation,
      (await permissionOfTeam).operation,
    ]);
  }
}
