import { AppError } from "../../generated/types/common.pb";
import { JobRole } from "../../generated/types/account/job-role/job-role.pb";
/**
 * Manages operations on job role data.
 */
export declare class JobRoleDataService {
    readonly db: FirebaseFirestore.Firestore;
    getJobRole(args: {
        jobRoleId: string;
    }): Promise<JobRole | AppError>;
    getJobRoles(args: {
        parent: "rootId" | "clientId";
        id: string;
    }): Promise<readonly JobRole[]>;
    getJobRolesFromIds(args: {
        jobRoleIds: string[];
    }): Promise<readonly JobRole[]>;
    createJobRole(args: {
        jobRoleData: Partial<JobRole>;
    }): Promise<JobRole | AppError>;
    updateJobRoleFields(args: {
        id: string;
        jobRoleData: Partial<JobRole>;
    }): Promise<JobRole | AppError>;
}
