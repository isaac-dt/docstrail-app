import { Request, Response } from "../../../framework/core/https";
import { CommentMessageDataService } from "./message.data";
import { CommentMessagePermissionService } from "./message.permission";
import { CommentThreadPermissionService } from "../thread/thread.permission";
import { CommentThreadDataService } from "../thread/thread.data";
import { UserDataService } from "../../account-module/user/user.data";
/** Controller for comment message requests. */
export declare class CommentMessageController {
    private readonly commentMessageDataService;
    private readonly commentMessagePermissionService;
    private readonly commentThreadPermissionService;
    private readonly commentThreadDataService;
    private readonly userDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(commentMessageDataService: CommentMessageDataService, commentMessagePermissionService: CommentMessagePermissionService, commentThreadPermissionService: CommentThreadPermissionService, commentThreadDataService: CommentThreadDataService, userDataService: UserDataService);
    getCommentMessage(req: Request, res: Response): Promise<Response>;
    getCommentMessages(req: Request, res: Response): Promise<Response>;
    createCommentMessage(req: Request, res: Response): Promise<Response>;
    updateCommentMessageFields(req: Request, res: Response): Promise<Response>;
    deleteCommentMessage(req: Request, res: Response): Promise<Response>;
    private buildGetCommentMessageResponse;
}
