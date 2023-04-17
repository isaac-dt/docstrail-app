import { Request, Response } from "../../../framework/core/https";
import { CommentMessageDataService } from "../message/message.data";
import { CommentThreadPermissionService } from "./thread.permission";
import { CommentThreadDataService } from "./thread.data";
import { ProposalPermissionService } from "../../proposal-module/proposal/proposal.permission";
import { ProposalDataService } from "../../proposal-module/proposal/proposal.data";
import { UserDataService } from "../../account-module/user/user.data";
/** Controller for comment thread requests. */
export declare class CommentThreadController {
    private readonly commentMessageDataService;
    private readonly commentThreadPermissionService;
    private readonly commentThreadDataService;
    private readonly proposalPermissionService;
    private readonly proposalDataService;
    private readonly userDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(commentMessageDataService: CommentMessageDataService, commentThreadPermissionService: CommentThreadPermissionService, commentThreadDataService: CommentThreadDataService, proposalPermissionService: ProposalPermissionService, proposalDataService: ProposalDataService, userDataService: UserDataService);
    getCommentThread(req: Request, res: Response): Promise<Response>;
    getCommentThreads(req: Request, res: Response): Promise<Response>;
    createCommentThread(req: Request, res: Response): Promise<Response>;
    updateCommentThreadFields(req: Request, res: Response): Promise<Response>;
    deleteCommentThread(req: Request, res: Response): Promise<Response>;
    private buildGetCommentThreadResponse;
}
