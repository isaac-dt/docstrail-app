import {Injectable} from "../../../framework/core/utils";
import {Team} from "../../generated/types/account/team/team.pb";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {
  getFirestore,
  FieldValue,
  DocumentData,
  FieldPath,
} from "firebase-admin/firestore";
import {TEAM_COLLECTION_NAME, TEAM_COLLECTION_SCHEMA} from "./team.schema";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {WriteTeamRequest} from "../../generated/types/account/team/team.api.pb";

const DEFAULT_TEAM_NAME = "default";

/**
 * Manages operations on team data.
 */
@Injectable()
export class TeamDataService {
  readonly db = getFirestore();

  async getTeam(args: {teamId: string}): Promise<Team | AppError> {
    const teamSnap = await this.db
      .collection(TEAM_COLLECTION_NAME)
      .doc(args.teamId)
      .get();
    const team: Partial<Team> | undefined = teamSnap.data();
    if (!team)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: TEAM_COLLECTION_NAME, id: args.teamId},
      });
    return Team.fromJSON({...team, id: teamSnap.id});
  }

  async getChildrenTeams(args: {
    parentTeamId: string;
  }): Promise<readonly Team[]> {
    const data = await this.db
      .collection(TEAM_COLLECTION_NAME)
      .where("parent.teamId", "==", args.parentTeamId)
      .get();
    const teams = data.docs.map((doc) =>
      Team.fromJSON({...(doc.data() as Partial<Team>), id: doc.id})
    );
    return teams;
  }

  async getTeamsFromIds(args: {teamIds: string[]}): Promise<readonly Team[]> {
    const data = await this.db
      .collection(TEAM_COLLECTION_NAME)
      .where(FieldPath.documentId(), "in", args.teamIds)
      .get();
    const teams = data.docs.map((doc) =>
      Team.fromPartial({
        ...(doc.data() as Partial<Team>),
        id: doc.id,
      })
    );
    return teams;
  }

  async createTeam(args: {teamData: Partial<Team>}): Promise<Team | AppError> {
    const teamDataWithName: Partial<Team> = {
      ...args.teamData,
      name: args.teamData.name || DEFAULT_TEAM_NAME,
    };
    const parser = getDataParsers({schema: TEAM_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(teamDataWithName);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedTeamData = WriteTeamRequest.fromPartial(
      parser.sanitize({
        ...teamDataWithName,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const teamRef = await this.db
      .collection(TEAM_COLLECTION_NAME)
      .add(WriteTeamRequest.toJSON(sanitizedTeamData) as DocumentData);
    const team = await this.getTeam({teamId: teamRef.id});
    if (!team) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return team;
  }

  async updateTeamFields(args: {
    id: string;
    teamData: Partial<Team>;
  }): Promise<Team | AppError> {
    const team = await this.getTeam({teamId: args.id});
    if (!team) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: TEAM_COLLECTION_NAME, id: args.id},
      });
    }
    const parser = getDataParsers({
      schema: TEAM_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.teamData),
    });
    const validationErrors = parser.validate(args.teamData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedTeamData = WriteTeamRequest.fromPartial(
      parser.sanitize({
        ...args.teamData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(TEAM_COLLECTION_NAME)
      .doc(args.id)
      .update(WriteTeamRequest.toJSON(sanitizedTeamData) as DocumentData);
    const updatedTeam = await this.getTeam({teamId: args.id});
    if (!updatedTeam)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedTeam;
  }
}
