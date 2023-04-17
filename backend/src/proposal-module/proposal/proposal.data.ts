import {Injectable} from "../../../framework/core/utils";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {getFirestore, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {
  PROPOSAL_COLLECTION_NAME,
  PROPOSAL_COLLECTION_SCHEMA,
  PROPOSAL_DELETED_COLLECTION_NAME,
} from "./proposal.schema";
import {Proposal} from "../../generated/types/trail/proposal/proposal.pb";
import {WriteProposalRequest} from "../../generated/types/trail/proposal/proposal.api.pb";
import {
  getPermissions,
  getPermissionsOnResource,
} from "../../shared/permission/permission.data";
import {DBEntity, Permission} from "../../generated/types/permission.pb";
import {UserDataService} from "../../account-module/user/user.data";
import {User} from "../../generated/types/account/user/user.pb";
import {getDateFromFireTimestamp} from "../../shared/utils";
import {getContentById} from "../../shared/https/firebase-patch";

/**
 * Manages operations on proposal data.
 */
@Injectable()
export class ProposalDataService {
  readonly db = getFirestore();

  constructor(private readonly userDataService: UserDataService) {}

  async getProposal(args: {proposalId: string}): Promise<Proposal | AppError> {
    const proposalSnap = await this.db
      .collection(PROPOSAL_COLLECTION_NAME)
      .doc(args.proposalId)
      .get();
    const proposal: Partial<Proposal> | undefined = proposalSnap.data();
    if (!proposal) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: PROPOSAL_COLLECTION_NAME,
          id: args.proposalId,
        },
      });
    }
    return Proposal.fromPartial({
      ...proposal,
      id: proposalSnap.id,
      createdAt: getDateFromFireTimestamp(proposal.createdAt),
      updatedAt: getDateFromFireTimestamp(proposal.updatedAt),
      deletedAt: getDateFromFireTimestamp(proposal.deletedAt),
    });
  }

  async getProposalsFromIds(args: {
    proposalIds: string[];
  }): Promise<readonly Proposal[]> {
    const proposals = await getContentById<Partial<Proposal>>(
      this.db,
      args.proposalIds,
      PROPOSAL_COLLECTION_NAME
    );

    return proposals.map((proposal) =>
      Proposal.fromPartial({
        ...proposal,
        createdAt: getDateFromFireTimestamp(proposal.createdAt),
        updatedAt: getDateFromFireTimestamp(proposal.updatedAt),
        deletedAt: getDateFromFireTimestamp(proposal.deletedAt),
      })
    );
  }

  async getProposalsOfUser(args: {userId: string}): Promise<{
    proposals: readonly Proposal[];
    permissions: readonly Permission[];
  }> {
    const permissions = await getPermissions({
      accessor: DBEntity.USER,
      accessorId: args.userId,
      resource: DBEntity.PROPOSAL,
    });

    if (!permissions.length) return {proposals: [], permissions: []};

    const proposalIds = permissions.map((permission) => permission.resourceId!);
    const proposals = await this.getProposalsFromIds({
      proposalIds,
    });
    return {proposals, permissions};
  }

  async getUsersOfProposal(args: {proposalId: string}): Promise<{
    users: readonly User[];
    permissions: readonly Permission[];
  }> {
    const permissions = await getPermissionsOnResource({
      accessor: DBEntity.USER,
      resource: DBEntity.PROPOSAL,
      resourceId: args.proposalId,
    });
    if (!permissions.length) return {users: [], permissions: []};

    const userIds = permissions
      .filter((permission) => permission.accessor === DBEntity.USER)
      .map((permission) => permission.accessorId!);

    const users = await this.userDataService.getUsersFromIds({
      userIds,
    });
    return {users, permissions};
  }

  async createProposal(args: {
    proposalData: Partial<Proposal>;
    userId: string;
  }): Promise<Proposal | AppError> {
    const parser = getDataParsers({schema: PROPOSAL_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.proposalData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }

    const proposalDbData = Proposal.fromPartial({
      ...parser.sanitize(args.proposalData),
      createdBy: args.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const proposalRef = await this.db
      .collection(PROPOSAL_COLLECTION_NAME)
      .add(proposalDbData as DocumentData);
    const proposal = await this.getProposal({
      proposalId: proposalRef.id,
    });
    if (!proposal) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return proposal;
  }

  async updateProposalFields(args: {
    proposalId: string;
    proposalData: WriteProposalRequest;
  }): Promise<Proposal | AppError> {
    const proposal = await this.getProposal({
      proposalId: args.proposalId,
    });
    if (!proposal) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: PROPOSAL_COLLECTION_NAME,
          id: args.proposalId,
        },
      });
    }
    const parser = getDataParsers({
      schema: PROPOSAL_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.proposalData),
    });
    const validationErrors = parser.validate(args.proposalData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const proposalDbData = Proposal.fromPartial({
      ...parser.sanitize({
        ...args.proposalData,
      }),
      updatedAt: new Date(),
    });
    await this.db
      .collection(PROPOSAL_COLLECTION_NAME)
      .doc(args.proposalId)
      .update(proposalDbData as DocumentData);
    const updatedProposal = await this.getProposal({
      proposalId: args.proposalId,
    });
    if (!updatedProposal)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedProposal;
  }

  async deleteProposal(args: {
    proposalId: string;
  }): Promise<Proposal | AppError> {
    const proposal = await this.getProposal({
      proposalId: args.proposalId,
    });
    if (!proposal) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: PROPOSAL_COLLECTION_NAME,
          id: args.proposalId,
        },
      });
    }

    // Copy proposal to deletion collection.
    const proposalDbData = Proposal.fromPartial({
      ...proposal,
      deletedAt: new Date(),
    });
    const proposalCopyResult = await this.db
      .collection(PROPOSAL_DELETED_COLLECTION_NAME)
      .doc(args.proposalId)
      .set(proposalDbData as DocumentData);
    if (!proposalCopyResult.writeTime) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }

    // Delete proposal from regular collection.
    const deletionResult = await this.db
      .collection(PROPOSAL_COLLECTION_NAME)
      .doc(args.proposalId)
      .delete();
    if (!deletionResult.writeTime) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }

    return proposal;
  }
}
