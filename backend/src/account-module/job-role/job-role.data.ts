import {Injectable} from "../../../framework/core/utils";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {
  getFirestore,
  FieldValue,
  DocumentData,
  FieldPath,
} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {JobRole} from "../../generated/types/account/job-role/job-role.pb";
import {
  JOB_ROLE_COLLECTION_NAME,
  JOB_ROLE_COLLECTION_SCHEMA,
} from "./job-role.schema";
import {WriteJobRoleRequest} from "../../generated/types/account/job-role/job-role.api.pb";

/**
 * Manages operations on job role data.
 */
@Injectable()
export class JobRoleDataService {
  readonly db = getFirestore();

  async getJobRole(args: {jobRoleId: string}): Promise<JobRole | AppError> {
    const jobRoleSnap = await this.db
      .collection(JOB_ROLE_COLLECTION_NAME)
      .doc(args.jobRoleId)
      .get();
    const jobRole: Partial<JobRole> | undefined = jobRoleSnap.data();
    if (!jobRole)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: JOB_ROLE_COLLECTION_NAME, id: args.jobRoleId},
      });
    return JobRole.fromJSON({...jobRole, id: jobRoleSnap.id});
  }

  async getJobRoles(args: {
    parent: "rootId" | "clientId";
    id: string;
  }): Promise<readonly JobRole[]> {
    const data = await this.db
      .collection(JOB_ROLE_COLLECTION_NAME)
      .where(args.parent, "==", args.id)
      .get();
    const jobRoles = data.docs.map((doc) =>
      JobRole.fromPartial({...(doc.data() as Partial<JobRole>), id: doc.id})
    );
    return jobRoles;
  }

  async getJobRolesFromIds(args: {
    jobRoleIds: string[];
  }): Promise<readonly JobRole[]> {
    const data = await this.db
      .collection(JOB_ROLE_COLLECTION_NAME)
      .where(FieldPath.documentId(), "in", args.jobRoleIds)
      .get();
    const jobRoles = data.docs.map((doc) =>
      JobRole.fromPartial({...(doc.data() as Partial<JobRole>), id: doc.id})
    );
    return jobRoles;
  }

  async createJobRole(args: {
    jobRoleData: Partial<JobRole>;
  }): Promise<JobRole | AppError> {
    const parser = getDataParsers({schema: JOB_ROLE_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.jobRoleData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedJobRoleData = WriteJobRoleRequest.fromPartial(
      parser.sanitize({
        ...args.jobRoleData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const jobRoleRef = await this.db
      .collection(JOB_ROLE_COLLECTION_NAME)
      .add(WriteJobRoleRequest.toJSON(sanitizedJobRoleData) as DocumentData);
    const jobRole = await this.getJobRole({
      jobRoleId: jobRoleRef.id,
    });
    if (!jobRole) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return jobRole;
  }

  async updateJobRoleFields(args: {
    id: string;
    jobRoleData: Partial<JobRole>;
  }): Promise<JobRole | AppError> {
    const jobRole = await this.getJobRole({
      jobRoleId: args.id,
    });
    if (!jobRole) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: JOB_ROLE_COLLECTION_NAME, id: args.id},
      });
    }
    const parser = getDataParsers({
      schema: JOB_ROLE_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.jobRoleData),
    });
    const validationErrors = parser.validate(args.jobRoleData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedJobRoleData = WriteJobRoleRequest.fromPartial(
      parser.sanitize({
        ...args.jobRoleData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(JOB_ROLE_COLLECTION_NAME)
      .doc(args.id)
      .update(WriteJobRoleRequest.toJSON(sanitizedJobRoleData) as DocumentData);
    const updatedJobRole = await this.getJobRole({
      jobRoleId: args.id,
    });
    if (!updatedJobRole)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedJobRole;
  }
}
