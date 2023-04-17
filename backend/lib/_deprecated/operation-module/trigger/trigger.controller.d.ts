import { Request, Response } from "@dimetrail/firebase/core/https";
import { RootPermissionService } from "../../../account-module/root/root.permission";
import { TriggerDataService } from "./trigger.data";
import { TriggerPermissionService } from "./trigger.permission";
import { RootDataService } from "../../../account-module/root/root.data";
/** Controller for Trigger requests. */
export declare class TriggerController {
    private readonly triggerDataService;
    private readonly triggerPermissionService;
    private readonly rootDataService;
    private readonly rootPermissionService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(triggerDataService: TriggerDataService, triggerPermissionService: TriggerPermissionService, rootDataService: RootDataService, rootPermissionService: RootPermissionService);
    getTrigger(req: Request, res: Response): Promise<Response>;
    createTrigger(req: Request, res: Response): Promise<Response>;
    updateTriggerFields(req: Request, res: Response): Promise<Response>;
    shareAccess(req: Request, res: Response): Promise<Response>;
    private buildGetTriggerResponse;
}
