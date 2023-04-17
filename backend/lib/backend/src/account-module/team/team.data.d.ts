import { Team } from "../../generated/types/account/team/team.pb";
import { AppError } from "../../generated/types/common.pb";
/**
 * Manages operations on team data.
 */
export declare class TeamDataService {
    readonly db: FirebaseFirestore.Firestore;
    getTeam(args: {
        teamId: string;
    }): Promise<Team | AppError>;
    getChildrenTeams(args: {
        parentTeamId: string;
    }): Promise<readonly Team[]>;
    getTeamsFromIds(args: {
        teamIds: string[];
    }): Promise<readonly Team[]>;
    getTeamsOfTarget(args: {
        targetId: string;
    }): Promise<readonly Team[]>;
    createTeam(args: {
        teamData: Partial<Team>;
    }): Promise<Team | AppError>;
    updateTeamFields(args: {
        id: string;
        teamData: Partial<Team>;
    }): Promise<Team | AppError>;
}
