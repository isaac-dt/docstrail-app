import { Root } from "../../generated/types/account/root/root.pb";
import { AppError } from "../../generated/types/common.pb";
import { Client } from "../../generated/types/account/client/client.pb";
import { JobRole } from "../../generated/types/account/job-role/job-role.pb";
/**
 * Manages operations on root data.
 */
export declare class RootDataService {
    readonly db: FirebaseFirestore.Firestore;
    getRoot(args: {
        rootId: string;
    }): Promise<Root | AppError>;
    getClients(args: {
        rootId: string;
    }): Promise<readonly Client[]>;
    getJobRoles(args: {
        rootId: string;
    }): Promise<readonly JobRole[]>;
}
