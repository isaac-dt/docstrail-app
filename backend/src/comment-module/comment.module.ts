import {DtModule} from "../../framework/core/utils";
import {CommentMessageController} from "./message/message.controller";
import {CommentMessageDataService} from "./message/message.data";
import {CommentMessagePermissionService} from "./message/message.permission";
import {CommentThreadController} from "./thread/thread.controller";
import {CommentThreadDataService} from "./thread/thread.data";
import {CommentThreadPermissionService} from "./thread/thread.permission";

/**
 * Module for Comment management.
 */
@DtModule({
  path: "comment",
  controllers: [CommentMessageController, CommentThreadController],
  providers: [
    CommentThreadDataService,
    CommentThreadPermissionService,
    CommentMessageDataService,
    CommentMessagePermissionService,
  ],
})
export class CommentModule {}
