import {Injectable} from "../../../framework/core/utils";
import {Root} from "../../generated/types/account/root/root.pb";
import {getFirestore} from "firebase-admin/firestore";
import {ROOT_COLLECTION_NAME} from "./root.schema";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {Client} from "../../generated/types/account/client/client.pb";
import {CLIENT_COLLECTION_NAME} from "../client/client.schema";
import {JobRole} from "../../generated/types/account/job-role/job-role.pb";
import {JOB_ROLE_COLLECTION_NAME} from "../job-role/job-role.schema";

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
}
