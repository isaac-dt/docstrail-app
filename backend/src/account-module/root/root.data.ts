import {Injectable} from "@dimetrail/firebase/core/utils";
import {Root} from "../../generated/types/account/root/root.pb";
import {getFirestore} from "firebase-admin/firestore";
import {ROOT_COLLECTION_NAME} from "./root.schema";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {Client} from "../../generated/types/account/client/client.pb";
import {CLIENT_COLLECTION_NAME} from "../client/client.schema";
import {JobRole} from "../../generated/types/account/job-role/job-role.pb";
import {JOB_ROLE_COLLECTION_NAME} from "../job-role/job-role.schema";
import {CoreDefinition} from "../../generated/types/catalog/core-definition/core-definition.pb";
import {CORE_DEFINITION_COLLECTION_NAME} from "../../_deprecated/catalog-module/core-definition/core-def.schema";
import {OpenDefinition} from "../../generated/types/catalog/open-definition/open-definition.pb";
import {OPEN_DEFINITION_COLLECTION_NAME} from "../../_deprecated/catalog-module/open-definition/open-definition.schema";
import {Company} from "../../generated/types/catalog/distribution/company.pb";
import {COMPANY_COLLECTION_NAME} from "../../_deprecated/catalog-module/company/company.schema";

/**
 * Manages operations on root data.
 */
@Injectable()
export class RootDataService {
  readonly db = getFirestore();

  async getRoot(args: {rootId: string}): Promise<Root | AppError> {
    const rootSnap = await this.db
      .collection(ROOT_COLLECTION_NAME)
      .doc(args.rootId)
      .get();
    const root: Partial<Root> | undefined = rootSnap.data();
    if (!root)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: ROOT_COLLECTION_NAME, id: args.rootId},
      });
    return Root.fromPartial({...root, id: rootSnap.id});
  }

  async getClients(args: {rootId: string}): Promise<readonly Client[]> {
    const data = await this.db
      .collection(CLIENT_COLLECTION_NAME)
      .where("rootId", "==", args.rootId)
      .get();
    const clients = data.docs.map((doc) =>
      Client.fromPartial({...(doc.data() as Partial<Client>), id: doc.id})
    );
    return clients;
  }

  async getCompanies(args: {rootId: string}): Promise<readonly Company[]> {
    const data = await this.db
      .collection(COMPANY_COLLECTION_NAME)
      .where("rootId", "==", args.rootId)
      .get();
    const companies = data.docs.map((doc) =>
      Company.fromPartial({...(doc.data() as Partial<Company>), id: doc.id})
    );
    return companies;
  }

  async getCoreDefinitions(args: {
    rootId: string;
  }): Promise<readonly CoreDefinition[]> {
    const data = await this.db
      .collection(CORE_DEFINITION_COLLECTION_NAME)
      .where("rootId", "==", args.rootId)
      .get();
    const coreDefs = data.docs.map((doc) =>
      CoreDefinition.fromPartial({
        ...(doc.data() as Partial<CoreDefinition>),
        id: doc.id,
      })
    );
    return coreDefs;
  }

  async getJobRoles(args: {rootId: string}): Promise<readonly JobRole[]> {
    const data = await this.db
      .collection(JOB_ROLE_COLLECTION_NAME)
      .where("parent.rootId", "==", args.rootId)
      .get();
    const jobRoles = data.docs.map((doc) =>
      JobRole.fromPartial({...(doc.data() as Partial<JobRole>), id: doc.id})
    );
    return jobRoles;
  }

  async getOpenDefinitions(args: {
    rootId: string;
  }): Promise<readonly OpenDefinition[]> {
    const data = await this.db
      .collection(OPEN_DEFINITION_COLLECTION_NAME)
      .where("parent.rootId", "==", args.rootId)
      .get();
    const openDefs = data.docs.map((doc) =>
      OpenDefinition.fromPartial({
        ...(doc.data() as Partial<OpenDefinition>),
        id: doc.id,
      })
    );
    return openDefs;
  }
}
