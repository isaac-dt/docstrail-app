import { Client } from "../../generated/types/account/client/client.pb";
import { AppError } from "../../generated/types/common.pb";
import { Team } from "../../generated/types/account/team/team.pb";
import { JobRole } from "../../generated/types/account/job-role/job-role.pb";
import { OpenDefinition } from "../../generated/types/catalog/open-definition/open-definition.pb";
import { AllowListDataService } from "../../_deprecated/catalog-module/allow-list/allow-list.data";
import { TeamDataService } from "../team/team.data";
/**
 * Manages operations on client data.
 */
export declare class ClientDataService {
    private readonly allowListDataService;
    private readonly teamDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(allowListDataService: AllowListDataService, teamDataService: TeamDataService);
    getClient(args: {
        clientId: string;
    }): Promise<Client | AppError>;
    getClientOfTeam(args: {
        teamId: string;
    }): Promise<Client | AppError>;
    getClientByName(args: {
        name: string;
    }): Promise<Client | undefined>;
    getChildrenTeams(args: {
        parentClientId: string;
    }): Promise<readonly Team[]>;
    getJobRoles(args: {
        clientId: string;
    }): Promise<readonly JobRole[]>;
    getOpenDefinitions(args: {
        clientId: string;
    }): Promise<readonly OpenDefinition[]>;
    createClient(args: {
        clientData: Partial<Client>;
    }): Promise<Client | AppError>;
    updateClientFields(args: {
        id: string;
        clientData: Partial<Client>;
    }): Promise<Client | AppError>;
}
