import { AppError } from "../../generated/types/common.pb";
import { Proposal } from "../../generated/types/trail/proposal/proposal.pb";
import { WriteProposalRequest } from "../../generated/types/trail/proposal/proposal.api.pb";
import { Permission } from "../../generated/types/permission.pb";
import { UserDataService } from "../../account-module/user/user.data";
import { User } from "../../generated/types/account/user/user.pb";
/**
 * Manages operations on proposal data.
 */
export declare class ProposalDataService {
    private readonly userDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(userDataService: UserDataService);
    getProposal(args: {
        proposalId: string;
    }): Promise<Proposal | AppError>;
    getProposalsFromIds(args: {
        proposalIds: string[];
    }): Promise<readonly Proposal[]>;
    getProposalsOfUser(args: {
        userId: string;
    }): Promise<{
        proposals: readonly Proposal[];
        permissions: readonly Permission[];
    }>;
    getUsersOfProposal(args: {
        proposalId: string;
    }): Promise<{
        users: readonly User[];
        permissions: readonly Permission[];
    }>;
    createProposal(args: {
        proposalData: Partial<Proposal>;
        userId: string;
    }): Promise<Proposal | AppError>;
    updateProposalFields(args: {
        proposalId: string;
        proposalData: WriteProposalRequest;
    }): Promise<Proposal | AppError>;
    deleteProposal(args: {
        proposalId: string;
    }): Promise<Proposal | AppError>;
}
