import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { CommentThreadPermissionService } from "../thread/thread.permission";
import { CommentMessageDataService } from "./message.data";
/**
 * Manages authorizations for accessing comment message data.
 */
export declare class CommentMessagePermissionService {
    private readonly userDataService;
    private readonly commentMessageData;
    private readonly commentThreadPermissionService;
    constructor(userDataService: UserDataService, commentMessageData: CommentMessageDataService, commentThreadPermissionService: CommentThreadPermissionService);
    /** Gets permission operations that apply to a targeted proposal. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.COMMENT_MESSAGE;
        resourceId: string;
    }): Promise<PermissionOp>;
}
