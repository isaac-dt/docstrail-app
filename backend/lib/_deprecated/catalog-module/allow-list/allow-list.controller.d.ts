import { Request, Response } from "@dimetrail/firebase/core/https";
import { ClientDataService } from "../../../account-module/client/client.data";
import { OpenDefinitionDataService } from "../open-definition/open-definition.data";
import { OpenDefinitionPermissionService } from "../open-definition/open-definition.permission";
import { AllowListDataService } from "./allow-list.data";
import { AllowListPermissionService } from "./allow-list.permission";
/** Controller for Allow List. */
export declare class AllowListController {
    private readonly allowListDataService;
    private readonly allowListPermissionService;
    private readonly openDefDataService;
    private readonly openDefPermissionService;
    private readonly clientDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(allowListDataService: AllowListDataService, allowListPermissionService: AllowListPermissionService, openDefDataService: OpenDefinitionDataService, openDefPermissionService: OpenDefinitionPermissionService, clientDataService: ClientDataService);
    getAllowList(req: Request, res: Response): Promise<Response>;
    addOpenDefinition(req: Request, res: Response): Promise<Response>;
    deleteOpenDef(req: Request, res: Response): Promise<Response>;
    private buildGetAllowListResponse;
}
