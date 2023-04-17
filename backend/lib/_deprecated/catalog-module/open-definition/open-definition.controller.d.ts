import { Request, Response } from "@dimetrail/firebase/core/https";
import { ClientDataService } from "../../../account-module/client/client.data";
import { ClientPermissionService } from "../../../account-module/client/client.permission";
import { RootDataService } from "../../../account-module/root/root.data";
import { RootPermissionService } from "../../../account-module/root/root.permission";
import { CoreDefinitionDataService } from "../core-definition/core-def.data";
import { OpenDefinitionDataService } from "./open-definition.data";
import { OpenDefinitionPermissionService } from "./open-definition.permission";
/** Controller for Open Definition. */
export declare class OpenDefinitionController {
    private readonly openDefinitionDataService;
    private readonly openDefinitionPermissionService;
    private readonly rootDataService;
    private readonly rootPermissionService;
    private readonly clientPermissionService;
    private readonly clientDataService;
    private readonly coreDefinitionDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(openDefinitionDataService: OpenDefinitionDataService, openDefinitionPermissionService: OpenDefinitionPermissionService, rootDataService: RootDataService, rootPermissionService: RootPermissionService, clientPermissionService: ClientPermissionService, clientDataService: ClientDataService, coreDefinitionDataService: CoreDefinitionDataService);
    getOpenDefinition(req: Request, res: Response): Promise<Response>;
    createOpenDefinition(req: Request, res: Response): Promise<Response>;
    updateOpenDefinitionFields(req: Request, res: Response): Promise<Response>;
    private buildGetOpenDefResponse;
}
