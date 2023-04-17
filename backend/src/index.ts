require("firebase-admin").initializeApp();
import * as cors from "cors";
import {readPath} from "./shared/audit/logger";
import {AccountModule} from "./account-module/account.module";
import * as bodyParser from "body-parser";
import {
  DtModule,
  bootstrapModule,
  getExpressInstance,
} from "@dimetrail/firebase/core/utils";
import * as firestore from "firebase-admin";
import {ProposalModule} from "./proposal-module/proposal.module";
import {CatalogModule} from "./_deprecated/catalog-module/catalog.module";
import {CommentModule} from "./comment-module/comment.module";
import {LogicModule} from "./logic-module/logic.module";

/** The module loaded by Firbase as the root. */
@DtModule({
  imports: [
    AccountModule,
    CatalogModule,
    ProposalModule,
    CommentModule,
    LogicModule,
  ],
  runHttpAfter: [readPath],
})
class RootModule {}

const rootModule = new RootModule();
const app = getExpressInstance(rootModule);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({origin: true}));

const db = firestore.firestore();
db.settings({ignoreUndefinedProperties: true});

/** Main cloud function. */
const _main = bootstrapModule(rootModule);

// Show all routes generated from main.
// console.log([
//   ...new Set(
//     app._router.stack.filter((r: any) => r.route).map((r: any) => r.route.path)
//   ),
// ]);

/** Main cloud function. */
export const main = _main;
