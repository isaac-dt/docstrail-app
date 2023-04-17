import { Request, Response } from "@dimetrail/firebase/core/https";
import { RootDataService } from "../../account-module/root/root.data";
import { RootPermissionService } from "../../account-module/root/root.permission";
/** Controller for Root. */
export declare class RootController {
    private readonly rootDataService;
    private readonly rootPermissionService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(rootDataService: RootDataService, rootPermissionService: RootPermissionService);
    getRoot(req: Request, res: Response): Promise<Response>;
    private buildGetRootResponse;
}
