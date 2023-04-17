import { HttpsRequest, Response, FirebaseAdmin } from "@dimetrail/firebase/core/utils";
/**
 * Contains functions to handle write requests.
 */
export declare class WriteProfileCollection {
    readonly veve: string;
    readonly admin: FirebaseAdmin;
    constructor(veve: string, admin: FirebaseAdmin);
    createProfile(req: HttpsRequest, res: Response): Promise<void>;
}
