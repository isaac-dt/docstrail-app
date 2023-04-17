import { AppError } from "../../../generated/types/common.pb";
import { Target } from "../../../generated/types/operation/target/target.pb";
import { JoinTargetUserRequest, JoinTargetUserResponse } from "../../../generated/types/join/target-user.pb";
import { UserDataService } from "../../../account-module/user/user.data";
import { JoinTargetTeamRequest, JoinTargetTeamResponse } from "../../../generated/types/join/target-team.pb";
import { TeamDataService } from "../../../account-module/team/team.data";
import { JobRoleDataService } from "../../../account-module/job-role/job-role.data";
import { JoinTargetJobRoleRequest, JoinTargetJobRoleResponse } from "../../../generated/types/join/target-job-role.pb";
/**
 * Manages operations on target data.
 */
export declare class TargetDataService {
    private readonly userDataService;
    private readonly teamDataService;
    private readonly jobRoleDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(userDataService: UserDataService, teamDataService: TeamDataService, jobRoleDataService: JobRoleDataService);
    getTarget(args: {
        targetId: string;
    }): Promise<Target | AppError>;
    getTargetsFromIds(args: {
        targetIds: string[];
    }): Promise<readonly Target[]>;
    getTargetsOfTemplate(args: {
        templateId: string;
    }): Promise<readonly Target[]>;
    createTarget(args: {
        targetData: Partial<Target>;
    }): Promise<Target | AppError>;
    updateTargetFields(args: {
        targetId: string;
        targetData: Partial<Target>;
    }): Promise<Target | AppError>;
    addUserToTarget(args: JoinTargetUserRequest): Promise<JoinTargetUserResponse | AppError>;
    deleteUserFromTarget(args: JoinTargetUserRequest): Promise<Date | AppError>;
    addTeamToTarget(args: JoinTargetTeamRequest): Promise<JoinTargetTeamResponse | AppError>;
    deleteTeamFromTarget(args: JoinTargetTeamRequest): Promise<Date | AppError>;
    addJobRoleToTarget(args: JoinTargetJobRoleRequest): Promise<JoinTargetJobRoleResponse | AppError>;
    deleteJobRoleFromTarget(args: JoinTargetJobRoleRequest): Promise<Date | AppError>;
}
