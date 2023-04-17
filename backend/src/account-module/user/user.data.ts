import {Injectable} from "../../../framework/core/utils";
import {User} from "../../generated/types/account/user/user.pb";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {
  JOIN_USER_JOB_ROLE_COLLECTION_NAME,
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
} from "./user.schema";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {WriteUserRequest} from "../../generated/types/account/user/user.api.pb";
import {JobRole} from "../../generated/types/account/job-role/job-role.pb";
import {
  JoinUserJobRoleRequest,
  JoinUserJobRoleResponse,
} from "../../generated/types/join/user-job-role.pb";
import {UserAddress} from "../../generated/types/account/user/address.pb";
import {ADDRESS_COLLECTION_NAME} from "../address/address.schema";
import {JobRoleDataService} from "../job-role/job-role.data";
import {getContentById} from "../../shared/https/firebase-patch";
import {getDateFromFireTimestamp} from "../../shared/utils";

/**
 * Manages User data.
 */
@Injectable()
export class UserDataService {
  readonly db = getFirestore();

  constructor(private readonly jobRoleDataService: JobRoleDataService) {}

  async getUser(args: {userId: string}): Promise<User | AppError> {
    const userSnap = await this.db
      .collection(USER_COLLECTION_NAME)
      .doc(args.userId)
      .get();
    const user: Partial<User> | undefined = userSnap.data();
    if (!user)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: USER_COLLECTION_NAME, id: args.userId},
      });
    return User.fromPartial({...user, id: userSnap.id});
  }

  async getUserWithEmail(args: {
    userEmail: string;
  }): Promise<User | AppError | undefined> {
    const data = await this.db
      .collection(USER_COLLECTION_NAME)
      .where("email", "==", args.userEmail)
      .get();
    const users = data.docs.map((doc) =>
      User.fromPartial({...(doc.data() as Partial<User>), id: doc.id})
    );
    return users[0];
  }

  async getUsersInTeam(args: {teamId: string}): Promise<readonly User[]> {
    const data = await this.db
      .collection(USER_COLLECTION_NAME)
      .where("teamId", "==", args.teamId)
      .get();
    const users = data.docs.map((doc) =>
      User.fromPartial({...(doc.data() as Partial<User>), id: doc.id})
    );
    return users;
  }

  async getJobRoles(args: {userId: string}): Promise<readonly JobRole[]> {
    const data = await this.db
      .collection(JOIN_USER_JOB_ROLE_COLLECTION_NAME)
      .where("userId", "==", args.userId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinUserJobRoleRequest.fromPartial({
        ...(doc.data() as Partial<JoinUserJobRoleRequest>),
      })
    );
    const jobRoleIds = joins.map((join) => join.jobRoleId);
    const jobRoles = await this.jobRoleDataService.getJobRolesFromIds({
      jobRoleIds,
    });
    return jobRoles;
  }

  async getAddresses(args: {userId: string}): Promise<readonly UserAddress[]> {
    const data = await this.db
      .collection(ADDRESS_COLLECTION_NAME)
      .where("userId", "==", args.userId)
      .get();
    const addresses = data.docs.map((doc) =>
      UserAddress.fromPartial({
        ...(doc.data() as Partial<UserAddress>),
        id: doc.id,
      })
    );
    return addresses;
  }

  async getUsersFromIds(args: {userIds: string[]}): Promise<readonly User[]> {
    const users = await getContentById<Partial<User>>(
      this.db,
      args.userIds,
      USER_COLLECTION_NAME
    );
    return users.map((user) =>
      User.fromPartial({
        ...user,
        createdAt: getDateFromFireTimestamp(user.createdAt),
        updatedAt: getDateFromFireTimestamp(user.updatedAt),
      })
    );
  }

  async getUsersOfJobRole(args: {jobRoleId: string}): Promise<readonly User[]> {
    const data = await this.db
      .collection(JOIN_USER_JOB_ROLE_COLLECTION_NAME)
      .where("jobRoleId", "==", args.jobRoleId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinUserJobRoleRequest.fromPartial({
        ...(doc.data() as Partial<JoinUserJobRoleRequest>),
      })
    );
    const userIds = joins.map((join) => join.userId);
    const users = await this.getUsersFromIds({
      userIds,
    });
    return users;
  }

  async createOrReplaceUser(args: {
    id: string;
    userData: Partial<User>;
  }): Promise<User | AppError> {
    const parser = getDataParsers({schema: USER_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.userData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedUserData = WriteUserRequest.fromPartial(
      parser.sanitize({
        ...args.userData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(USER_COLLECTION_NAME)
      .doc(args.id)
      .set(WriteUserRequest.toJSON(sanitizedUserData) as DocumentData);
    const user = await this.getUser({userId: args.id});
    if (!user) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return user;
  }

  async addJobRoleToUser(
    args: JoinUserJobRoleRequest
  ): Promise<JoinUserJobRoleResponse | AppError> {
    const jobRoles = await this.getJobRoles({userId: args.userId});
    const duplicateJobRole = jobRoles.find(
      (jobRole) => jobRole.id === args.jobRoleId
    );
    if (duplicateJobRole) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_USER_JOB_ROLE_COLLECTION_NAME)
      .add(JoinUserJobRoleRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const user = await this.getUser({userId: args.userId});
    const jobRole = await this.jobRoleDataService.getJobRole({
      jobRoleId: args.jobRoleId,
    });
    if ([user.$type, jobRole.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinUserJobRoleResponse.fromPartial({user, jobRole});
  }

  async deleteJobRoleFromUser(
    args: JoinUserJobRoleRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_USER_JOB_ROLE_COLLECTION_NAME)
      .where("jobRoleId", "==", args.jobRoleId)
      .where("userId", "==", args.userId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_USER_JOB_ROLE_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }

  async updateUserFields(args: {
    id: string;
    userData: Partial<WriteUserRequest>;
  }): Promise<User | AppError> {
    const user = await this.getUser({userId: args.id});
    if (!user)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: USER_COLLECTION_NAME, id: args.id},
      });
    const parser = getDataParsers({
      schema: USER_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.userData),
    });
    const validationErrors = parser.validate(args.userData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedUserData = WriteUserRequest.fromPartial(
      parser.sanitize({
        ...args.userData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(USER_COLLECTION_NAME)
      .doc(args.id)
      .update(WriteUserRequest.toJSON(sanitizedUserData) as DocumentData);
    const updatedUser = await this.getUser({userId: args.id});
    if (!updatedUser)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedUser;
  }
}
