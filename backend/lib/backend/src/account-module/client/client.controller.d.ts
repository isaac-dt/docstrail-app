import { Request, Response } from "@dimetrail/firebase/core/https";
import { RootDataService } from "../root/root.data";
import { RootPermissionService } from "../root/root.permission";
import { ClientDataService } from "./client.data";
import { ClientPermissionService } from "./client.permission";
/** Controller for Client. */
export declare class ClientController {
    private readonly clientDataService;
    private readonly clientPermissionService;
    private readonly rootDataService;
    private readonly rootPermissionService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(clientDataService: ClientDataService, clientPermissionService: ClientPermissionService, rootDataService: RootDataService, rootPermissionService: RootPermissionService);
    getClient(req: Request, res: Response): Promise<Response>;
    createClient(req: Request, res: Response): Promise<Response>;
    updateClientFields(req: Request, res: Response): Promise<Response>;
    private buildGetClientResponse;
}
