import {DtModule} from "@dimetrail/firebase/core/utils";
import {OrgSignupController} from "./org-signup/org-signup.controller";

/**
 * Module for Business Logic.
 */
@DtModule({
  path: "logic",
  controllers: [OrgSignupController],
  providers: [],
})
export class LogicModule {}
