import { Request, Response } from "@dimetrail/firebase/core/https";
import { ProfileFirebaseAccessor } from "./accessor";
/** Controller for Profile requests. */
export declare class ProfileController {
    readonly profileDB: ProfileFirebaseAccessor;
    constructor(profileDB: ProfileFirebaseAccessor);
    createProfile(req: Request, res: Response): Promise<void>;
    hello(req: Request, res: Response): void;
}
