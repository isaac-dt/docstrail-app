import { Request, Response } from "@dimetrail/firebase/core/https";
import { RootDataService } from "../../account-module/root/root.data";
import { RootPermissionService } from "../../account-module/root/root.permission";
import { CompanyDataService } from "./company.data";
import { CompanyPermissionService } from "./company.permission";
/** Controller for Company. */
export declare class CompanyController {
    private readonly companyDataService;
    private readonly companyPermissionService;
    private readonly rootDataService;
    private readonly rootPermissionService;
    constructor(companyDataService: CompanyDataService, companyPermissionService: CompanyPermissionService, rootDataService: RootDataService, rootPermissionService: RootPermissionService);
    getCompany(req: Request, res: Response): Promise<Response>;
    createCompany(req: Request, res: Response): Promise<Response>;
    updateCompanyFields(req: Request, res: Response): Promise<Response>;
    private buildGetCompanyResponse;
}
