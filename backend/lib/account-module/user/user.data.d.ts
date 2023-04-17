import { User } from "../../generated/types/account/user/user.pb";
import { AppError } from "../../generated/types/common.pb";
import { WriteUserRequest } from "../../generated/types/account/user/user.api.pb";
import { JobRole } from "../../generated/types/account/job-role/job-role.pb";
import { JoinUserJobRoleRequest, JoinUserJobRoleResponse } from "../../generated/types/join/user-job-role.pb";
import { UserAddress } from "../../generated/types/account/user/address.pb";
import { JobRoleDataService } from "../job-role/job-role.data";
/**
 * Manages User data.
 */
export declare class UserDataService {
    private readonly jobRoleDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(jobRoleDataService: JobRoleDataService);
    getUser(args: {
        userId: string;
    }): Promise<User | AppError>;
    getUserWithEmail(args: {
        userEmail: string;
    }): Promise<User | AppError | undefined>;
    getUsersInTeam(args: {
        teamId: string;
    }): Promise<readonly User[]>;
    getJobRoles(args: {
        userId: string;
    }): Promise<readonly JobRole[]>;
    getAddresses(args: {
        userId: string;
    }): Promise<readonly UserAddress[]>;
    getUsersFromIds(args: {
        userIds: string[];
    }): Promise<readonly User[]>;
    getUsersOfJobRole(args: {
        jobRoleId: string;
    }): Promise<readonly User[]>;
    createOrReplaceUser(args: {
        id: string;
        userData: Partial<User>;
    }): Promise<User | AppError>;
    addJobRoleToUser(args: JoinUserJobRoleRequest): Promise<JoinUserJobRoleResponse | AppError>;
    deleteJobRoleFromUser(args: JoinUserJobRoleRequest): Promise<Date | AppError>;
    updateUserFields(args: {
        id: string;
        userData: Partial<WriteUserRequest>;
    }): Promise<User | AppError>;
}
