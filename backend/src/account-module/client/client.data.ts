import {Injectable} from "@dimetrail/firebase/core/utils";
import {Client} from "../../generated/types/account/client/client.pb";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {
  CLIENT_COLLECTION_NAME,
  CLIENT_COLLECTION_SCHEMA,
} from "./client.schema";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {TEAM_COLLECTION_NAME} from "../team/team.schema";
import {Team} from "../../generated/types/account/team/team.pb";
import {WriteClientRequest} from "../../generated/types/account/client/client.api.pb";
import {JOB_ROLE_COLLECTION_NAME} from "../job-role/job-role.schema";
import {JobRole} from "../../generated/types/account/job-role/job-role.pb";
import {OpenDefinition} from "../../generated/types/catalog/open-definition/open-definition.pb";
import {OPEN_DEFINITION_COLLECTION_NAME} from "../../_deprecated/catalog-module/open-definition/open-definition.schema";
import {AllowListDataService} from "../../_deprecated/catalog-module/allow-list/allow-list.data";
import {TeamDataService} from "../team/team.data";

/**
 * Manages operations on client data.
 */
@Injectable()
export class ClientDataService {
  readonly db = getFirestore();

  constructor(
    private readonly allowListDataService: AllowListDataService,
    private readonly teamDataService: TeamDataService
  ) {}

  async getClient(args: {clientId: string}): Promise<Client | AppError> {
    const clientSnap = await this.db
      .collection(CLIENT_COLLECTION_NAME)
      .doc(args.clientId)
      .get();
    const client: Partial<Client> | undefined = clientSnap.data();
    if (!client) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: CLIENT_COLLECTION_NAME, id: args.clientId},
      });
    }
    return Client.fromPartial({...client, id: clientSnap.id});
  }

  async getClientOfTeam(args: {teamId: string}): Promise<Client | AppError> {
    const team = await this.teamDataService.getTeam({teamId: args.teamId});
    if (team.$type === AppError.$type) return team;
    if (team.parent?.$case === "clientId") {
      return this.getClient({clientId: team.parent.clientId});
    }
    return AppError.fromPartial({
      errorCode: ErrorCode.NOT_FOUND_IN_DB,
      details:
        "Failed to retrieve client of nested team. Feature is not implemented.",
    });
  }

  async getClientByName(args: {name: string}): Promise<Client | undefined> {
    const parser = getDataParsers({
      schema: CLIENT_COLLECTION_SCHEMA,
      onlyFields: ["name"],
    });
    const sanitized = parser.sanitize(args);
    const data = await this.db
      .collection(CLIENT_COLLECTION_NAME)
      .where("name", "==", sanitized.name)
      .get();
    if (data.size > 1) {
      throw AppError.fromPartial({
        errorCode: ErrorCode.DUPLICATE_ENTRY,
        details: `more than one client with name: '${args.name}' already exist`,
      });
    }
    if (!data.empty) {
      return Client.fromPartial({...data.docs[0].data(), id: data.docs[0].id});
    }
    return undefined;
  }

  async getChildrenTeams(args: {
    parentClientId: string;
  }): Promise<readonly Team[]> {
    const data = await this.db
      .collection(TEAM_COLLECTION_NAME)
      .where("parent.clientId", "==", args.parentClientId)
      .get();
    const teams = data.docs.map((doc) =>
      Team.fromPartial({...(doc.data() as Partial<Team>), id: doc.id})
    );
    return teams;
  }

  async getJobRoles(args: {clientId: string}): Promise<readonly JobRole[]> {
    const data = await this.db
      .collection(JOB_ROLE_COLLECTION_NAME)
      .where("parent.clientId", "==", args.clientId)
      .get();
    const jobRoles = data.docs.map((doc) =>
      JobRole.fromPartial({...(doc.data() as Partial<JobRole>), id: doc.id})
    );
    return jobRoles;
  }

  async getOpenDefinitions(args: {
    clientId: string;
  }): Promise<readonly OpenDefinition[]> {
    const data = await this.db
      .collection(OPEN_DEFINITION_COLLECTION_NAME)
      .where("parent.clientId", "==", args.clientId)
      .get();
    const openDefinitions = data.docs.map((doc) =>
      OpenDefinition.fromPartial({
        ...(doc.data() as Partial<OpenDefinition>),
        id: doc.id,
      })
    );
    return openDefinitions;
  }

  async createClient(args: {
    clientData: Partial<Client>;
  }): Promise<Client | AppError> {
    const parser = getDataParsers({schema: CLIENT_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.clientData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const duplicateClient = await this.getClientByName({
      name: args.clientData.name!,
    });
    if (duplicateClient) {
      return AppError.fromPartial({
        errorCode: ErrorCode.DUPLICATE_ENTRY,
        details: `client with name '${args.clientData.name}' already exists`,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedClientData = WriteClientRequest.fromPartial(
      parser.sanitize({
        ...args.clientData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const clientRef = await this.db
      .collection(CLIENT_COLLECTION_NAME)
      .add(WriteClientRequest.toJSON(sanitizedClientData) as DocumentData);

    const clientPromise = this.getClient({clientId: clientRef.id});
    const allowListPromise = this.allowListDataService.createAllowList({
      allowListData: {clientId: clientRef.id},
    });

    const client = await clientPromise;
    const allowList = await allowListPromise;

    if (!client || !allowList)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return client;
  }

  async updateClientFields(args: {
    id: string;
    clientData: Partial<Client>;
  }): Promise<Client | AppError> {
    const client = await this.getClient({clientId: args.id});
    if (!client) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: CLIENT_COLLECTION_NAME, id: args.id},
      });
    }
    const parser = getDataParsers({
      schema: CLIENT_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.clientData),
    });
    const validationErrors = parser.validate(args.clientData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedClientData = WriteClientRequest.fromPartial(
      parser.sanitize({
        ...args.clientData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(CLIENT_COLLECTION_NAME)
      .doc(args.id)
      .update(WriteClientRequest.toJSON(sanitizedClientData) as DocumentData);
    const updatedClient = await this.getClient({clientId: args.id});
    if (!updatedClient)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedClient;
  }
}
