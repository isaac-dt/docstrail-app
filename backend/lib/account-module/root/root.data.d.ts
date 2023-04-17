import { Root } from "../../generated/types/account/root/root.pb";
import { AppError } from "../../generated/types/common.pb";
import { Client } from "../../generated/types/account/client/client.pb";
import { JobRole } from "../../generated/types/account/job-role/job-role.pb";
import { CoreDefinition } from "../../generated/types/catalog/core-definition/core-definition.pb";
import { OpenDefinition } from "../../generated/types/catalog/open-definition/open-definition.pb";
import { Company } from "../../generated/types/catalog/distribution/company.pb";
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
    getCompanies(args: {
        rootId: string;
    }): Promise<readonly Company[]>;
    getCoreDefinitions(args: {
        rootId: string;
    }): Promise<readonly CoreDefinition[]>;
    getJobRoles(args: {
        rootId: string;
    }): Promise<readonly JobRole[]>;
    getOpenDefinitions(args: {
        rootId: string;
    }): Promise<readonly OpenDefinition[]>;
}
