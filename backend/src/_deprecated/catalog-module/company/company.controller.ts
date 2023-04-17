import {
  get,
  patch,
  post,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {RootDataService} from "../../../account-module/root/root.data";
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {GetCompanyResponse} from "../../../generated/types/catalog/distribution/company.api.pb";
import {Company} from "../../../generated/types/catalog/distribution/company.pb";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {DBEntity} from "../../../generated/types/permission.pb";
import {guard} from "../../../shared/authentication/auth";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {buildRes} from "../../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../../shared/permission/permission.data";
import {CompanyDataService} from "./company.data";
import {CompanyPermissionService} from "./company.permission";
import {COMPANY_COLLECTION_SCHEMA} from "./company.schema";

/** Controller for Company. */
@Controller({
  path: "company",
  runHttpAfter: [guard],
})
export class CompanyController {
  constructor(
    private readonly companyDataService: CompanyDataService,
    private readonly companyPermissionService: CompanyPermissionService,
    private readonly rootDataService: RootDataService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  @get({path: "/:companyId"})
  async getCompany(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.companyPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.COMPANY,
      resourceId: req.params.companyId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const company = await this.companyDataService.getCompany({
      companyId: req.params.companyId,
    });
    if (company.$type === AppError.$type) {
      const resData = buildRes({appError: company});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetCompanyResponse(company);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createCompany(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: COMPANY_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.json(resData);
    }
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const targetRoot = await this.rootDataService.getRoot({
      rootId: req.body.rootId,
    });
    if (targetRoot.$type === AppError.$type) {
      const resData = buildRes({appError: targetRoot});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.rootPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ROOT,
      resourceId: targetRoot.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const company = await this.companyDataService.createCompany({
      companyData: req.body,
    });
    if (company.$type === AppError.$type) {
      const appError = company;
      switch (appError.errorCode) {
        case ErrorCode.INVALID_DATA: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
        case ErrorCode.NOT_FOUND_IN_DB: {
          const resData = buildRes({appError});
          return res.status(404).json(resData);
        }
        default: {
          const resData = buildRes({error: ErrorCode.UNKNOWN});
          return res.status(500).json(resData);
        }
      }
    }
    const response = await this.buildGetCompanyResponse(company);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:companyId"})
  async updateCompanyFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: COMPANY_COLLECTION_SCHEMA,
      onlyFields: Object.keys(req.body),
    });
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.status(400).json(resData);
    }
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const targetCompany = await this.companyDataService.getCompany({
      companyId: req.params.companyId,
    });
    if (targetCompany.$type === AppError.$type) {
      const resData = buildRes({appError: targetCompany});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.companyPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.COMPANY,
      resourceId: targetCompany.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const company = await this.companyDataService.updateCompanyFields({
      companyId: req.params.companyId,
      companyData: req.body,
    });
    if (company.$type === AppError.$type) {
      const appError = company;
      switch (appError.errorCode) {
        case ErrorCode.NOT_FOUND_IN_DB: {
          const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
          return res.status(404).json(resData);
        }
        case ErrorCode.INVALID_DATA: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
        default: {
          const resData = buildRes({error: ErrorCode.UNKNOWN});
          return res.status(500).json(resData);
        }
      }
    }
    const response = await this.buildGetCompanyResponse(company);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetCompanyResponse(
    company: Company
  ): Promise<GetCompanyResponse> {
    const distributionOutlets = await this.companyDataService.getDistOutlets({
      companyId: company.id,
    });
    const response = GetCompanyResponse.fromPartial({
      company,
      distributionOutlets,
    });
    return response;
  }
}
