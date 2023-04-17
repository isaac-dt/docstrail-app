import { Request, Response } from "../../../framework/core/https";
import { UserDataService } from "../user/user.data";
import { UserPermissionService } from "../user/user.permission";
import { AddressDataService } from "./address.data";
import { AddressPermissionService } from "./address.permission";
/** Controller for User Address. */
export declare class UserAddressController {
    private readonly addressDataService;
    private readonly addressPermissionService;
    private readonly userDataSerivce;
    private readonly userPermissionService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(addressDataService: AddressDataService, addressPermissionService: AddressPermissionService, userDataSerivce: UserDataService, userPermissionService: UserPermissionService);
    getAddress(req: Request, res: Response): Promise<Response>;
    getAddresses(req: Request, res: Response): Promise<Response>;
    createAddress(req: Request, res: Response): Promise<Response>;
    updateAddressFields(req: Request, res: Response): Promise<Response>;
    private buildGetAddressResponse;
}
