import { Request, Response } from "@dimetrail/firebase/core/https";
import * as admin from "firebase-admin";
/** Controller for Group requests. */
export declare class GroupController {
    readonly app: admin.app.App;
    createProfile(req: Request, res: Response): Promise<void>;
}
