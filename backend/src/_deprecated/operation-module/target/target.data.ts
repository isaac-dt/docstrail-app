import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {
  getFirestore,
  FieldValue,
  DocumentData,
  FieldPath,
} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {JOIN_TEMPLATE_TARGET_COLLECTION_NAME} from "../template/template.schema";
import {Target} from "../../../generated/types/operation/target/target.pb";
import {
  JOIN_TARGET_JOB_ROLE_COLLECTION_NAME,
  JOIN_TARGET_TEAM_COLLECTION_NAME,
  JOIN_TARGET_USER_COLLECTION_NAME,
  TARGET_COLLECTION_NAME,
  TARGET_COLLECTION_SCHEMA,
} from "./target.schema";
import {JoinTemplateTargetRequest} from "../../../generated/types/join/template-target.pb";
import {WriteTargetRequest} from "../../../generated/types/operation/target/target.api.pb";
import {
  JoinTargetUserRequest,
  JoinTargetUserResponse,
} from "../../../generated/types/join/target-user.pb";
import {UserDataService} from "../../../account-module/user/user.data";
import {
  JoinTargetTeamRequest,
  JoinTargetTeamResponse,
} from "../../../generated/types/join/target-team.pb";
import {TeamDataService} from "../../../account-module/team/team.data";
import {JobRoleDataService} from "../../../account-module/job-role/job-role.data";
import {
  JoinTargetJobRoleRequest,
  JoinTargetJobRoleResponse,
} from "../../../generated/types/join/target-job-role.pb";

/**
 * Manages operations on target data.
 */
@Injectable()
export class TargetDataService {
  readonly db = getFirestore();

  constructor(
    private readonly userDataService: UserDataService,
    private readonly teamDataService: TeamDataService,
    private readonly jobRoleDataService: JobRoleDataService
  ) {}

  async getTarget(args: {targetId: string}): Promise<Target | AppError> {
    const targetSnap = await this.db
      .collection(TARGET_COLLECTION_NAME)
      .doc(args.targetId)
      .get();
    const target: Partial<Target> | undefined = targetSnap.data();
    if (!target)
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: TARGET_COLLECTION_NAME, id: args.targetId},
      });
    return Target.fromJSON({...target, id: targetSnap.id});
  }

  async getTargetsFromIds(args: {
    targetIds: string[];
  }): Promise<readonly Target[]> {
    const data = await this.db
      .collection(TARGET_COLLECTION_NAME)
      .where(FieldPath.documentId(), "in", args.targetIds)
      .get();
    const targets = data.docs.map((doc) =>
      Target.fromPartial({
        ...(doc.data() as Partial<Target>),
        id: doc.id,
      })
    );
    return targets;
  }

  async getTargetsOfTemplate(args: {
    templateId: string;
  }): Promise<readonly Target[]> {
    const data = await this.db
      .collection(JOIN_TEMPLATE_TARGET_COLLECTION_NAME)
      .where("templateId", "==", args.templateId)
      .get();
    if (data.empty) return [];
    const joins = data.docs.map((doc) =>
      JoinTemplateTargetRequest.fromPartial({
        ...(doc.data() as Partial<JoinTemplateTargetRequest>),
      })
    );
    const targetIds = joins.map((join) => join.targetId);
    const targets = await this.getTargetsFromIds({
      targetIds,
    });
    return targets;
  }

  async createTarget(args: {
    targetData: Partial<Target>;
  }): Promise<Target | AppError> {
    const parser = getDataParsers({schema: TARGET_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.targetData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedTargetData = WriteTargetRequest.fromPartial(
      parser.sanitize({
        ...args.targetData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const targetRef = await this.db
      .collection(TARGET_COLLECTION_NAME)
      .add(WriteTargetRequest.toJSON(sanitizedTargetData) as DocumentData);
    const target = await this.getTarget({targetId: targetRef.id});
    if (!target) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return target;
  }

  async updateTargetFields(args: {
    targetId: string;
    targetData: Partial<Target>;
  }): Promise<Target | AppError> {
    const target = await this.getTarget({targetId: args.targetId});
    if (!target) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: TARGET_COLLECTION_NAME, id: args.targetId},
      });
    }
    const parser = getDataParsers({
      schema: TARGET_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.targetData),
    });
    const validationErrors = parser.validate(args.targetData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedTargetData = WriteTargetRequest.fromPartial(
      parser.sanitize({
        ...args.targetData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(TARGET_COLLECTION_NAME)
      .doc(args.targetId)
      .update(WriteTargetRequest.toJSON(sanitizedTargetData) as DocumentData);
    const updatedTarget = await this.getTarget({targetId: args.targetId});
    if (!updatedTarget)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedTarget;
  }

  async addUserToTarget(
    args: JoinTargetUserRequest
  ): Promise<JoinTargetUserResponse | AppError> {
    const users = await this.userDataService.getUsersOfTarget({
      targetId: args.targetId,
    });
    const duplicateUser = users.find((user) => user.id === args.userId);
    if (duplicateUser) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_TARGET_USER_COLLECTION_NAME)
      .add(JoinTargetUserRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const target = await this.getTarget({targetId: args.targetId});
    const user = await this.userDataService.getUser({
      userId: args.userId,
    });
    if ([target.$type, user.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinTargetUserResponse.fromPartial({
      target,
      user,
    });
  }

  async deleteUserFromTarget(
    args: JoinTargetUserRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_TARGET_USER_COLLECTION_NAME)
      .where("userId", "==", args.userId)
      .where("targetId", "==", args.targetId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_TARGET_USER_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }

  async addTeamToTarget(
    args: JoinTargetTeamRequest
  ): Promise<JoinTargetTeamResponse | AppError> {
    const teams = await this.teamDataService.getTeamsOfTarget({
      targetId: args.targetId,
    });
    const duplicateTeam = teams.find((team) => team.id === args.teamId);
    if (duplicateTeam) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_TARGET_TEAM_COLLECTION_NAME)
      .add(JoinTargetTeamRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const target = await this.getTarget({targetId: args.targetId});
    const team = await this.teamDataService.getTeam({
      teamId: args.teamId,
    });
    if ([target.$type, team.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinTargetTeamResponse.fromPartial({
      target,
      team,
    });
  }

  async deleteTeamFromTarget(
    args: JoinTargetTeamRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_TARGET_TEAM_COLLECTION_NAME)
      .where("teamId", "==", args.teamId)
      .where("targetId", "==", args.targetId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_TARGET_TEAM_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }

  async addJobRoleToTarget(
    args: JoinTargetJobRoleRequest
  ): Promise<JoinTargetJobRoleResponse | AppError> {
    const jobRoles = await this.jobRoleDataService.getJobRolesOfTarget({
      targetId: args.targetId,
    });
    const duplicateJobRole = jobRoles.find(
      (jobRole) => jobRole.id === args.jobRoleId
    );
    if (duplicateJobRole) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_TARGET_JOB_ROLE_COLLECTION_NAME)
      .add(JoinTargetJobRoleRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const target = await this.getTarget({targetId: args.targetId});
    const jobRole = await this.jobRoleDataService.getJobRole({
      jobRoleId: args.jobRoleId,
    });
    if ([target.$type, jobRole.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinTargetJobRoleResponse.fromPartial({
      target,
      jobRole,
    });
  }

  async deleteJobRoleFromTarget(
    args: JoinTargetJobRoleRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_TARGET_JOB_ROLE_COLLECTION_NAME)
      .where("jobRoleId", "==", args.jobRoleId)
      .where("targetId", "==", args.targetId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_TARGET_JOB_ROLE_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }
}
