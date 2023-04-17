import { Request, Response } from "@dimetrail/firebase/core/https";
import * as admin from "firebase-admin";
/** Controller for Profile requests. */
export declare class ProfileController {
    readonly app: admin.app.App;
    createProfile(req: Request, res: Response): Promise<void>;
}
