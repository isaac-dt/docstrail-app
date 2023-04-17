import {DtModule} from "../../framework/core/utils";
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
