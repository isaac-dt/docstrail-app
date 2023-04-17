import {
  dtDelete,
  get,
  patch,
  post,
  put,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {GetDistributionOutletResponse} from "../../../generated/types/catalog/distribution/distribution.api.pb";
import {DistributionOutlet} from "../../../generated/types/catalog/distribution/distribution.pb";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {JoinCoreDefDistOutletRequest} from "../../../generated/types/join/core-def-dist-outlet.pb";
import {DBEntity} from "../../../generated/types/permission.pb";
import {guard} from "../../../shared/authentication/auth";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {buildRes} from "../../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../../shared/permission/permission.data";
import {CompanyDataService} from "../company/company.data";
import {CompanyPermissionService} from "../company/company.permission";
import {CoreDefinitionDataService} from "../core-definition/core-def.data";
import {CoreDefinitionPermissionService} from "../core-definition/core-def.permission";
import {JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_SCHEMA} from "../core-definition/core-def.schema";
import {OutletAddressDataService} from "../outlet-address/outlet-address.data";
import {DistributionOutletDataService} from "./dist-outlet.data";
import {DistributionOutletPermissionService} from "./dist-outlet.permission";
import {DIST_OUTLET_COLLECTION_SCHEMA} from "./dist-outlet.schema";

/** Controller for Distribution Outlet. */
@Controller({
  path: "distribution-outlet",
  runHttpAfter: [guard],
})
export class DistributionOutletController {
  readonly db = getFirestore();

  constructor(
    private readonly distOutletDataService: DistributionOutletDataService,
    private readonly distOutletPermissionService: DistributionOutletPermissionService,
    private readonly coreDefDataService: CoreDefinitionDataService,
    private readonly coreDefPermissionService: CoreDefinitionPermissionService,
    private readonly companyDataService: CompanyDataService,
    private readonly companyPermissionService: CompanyPermissionService,
    private readonly outletAddressDataService: OutletAddressDataService
  ) {}

  @get({path: "/:distOutletId"})
  async getDistOutlet(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.distOutletPermissionService.getPermissionOp(
      {
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.DISTRIBUTION_OUTLET,
        resourceId: req.params.distOutletId,
      }
    );
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const distOutlet = await this.distOutletDataService.getDistOutlet({
      distOutletId: req.params.distOutletId,
    });
    if (distOutlet.$type === AppError.$type) {
      const resData = buildRes({appError: distOutlet});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetDistOutletResponse(distOutlet);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createDistOutlet(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: DIST_OUTLET_COLLECTION_SCHEMA});
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
    const targetCompany = await this.companyDataService.getCompany({
      companyId: req.body.companyId,
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
    const distOutlet = await this.distOutletDataService.createDistOutlet({
      distOutletData: req.body,
    });
    if (distOutlet.$type === AppError.$type) {
      const appError = distOutlet;
      switch (appError.errorCode) {
        case ErrorCode.DUPLICATE_ENTRY: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
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
    const response = await this.buildGetDistOutletResponse(distOutlet);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:distOutletId"})
  async updateDistOutletFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: DIST_OUTLET_COLLECTION_SCHEMA,
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
    const targetDistOutlet = await this.distOutletDataService.getDistOutlet({
      distOutletId: req.params.distOutletId,
    });
    if (targetDistOutlet.$type === AppError.$type) {
      const resData = buildRes({appError: targetDistOutlet});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.distOutletPermissionService.getPermissionOp(
      {
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.DISTRIBUTION_OUTLET,
        resourceId: targetDistOutlet.id,
      }
    );
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const distOutlet = await this.distOutletDataService.updateDistOutletFields({
      distOutletId: req.params.distOutletId,
      distOutletData: req.body,
    });
    if (distOutlet.$type === AppError.$type) {
      const appError = distOutlet;
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
    const response = await this.buildGetDistOutletResponse(distOutlet);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @put({path: "/core-definition"})
  async addCoreDef(req: Request, res: Response) {
    const writeJoinReq = JoinCoreDefDistOutletRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_SCHEMA,
    });
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.json(resData);
    }
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const distOutletPermissionOp =
      await this.distOutletPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.DISTRIBUTION_OUTLET,
        resourceId: writeJoinReq.distributionOutletId,
      });
    const coreDef = await this.coreDefDataService.getCoreDefinition({
      coreDefinitionId: writeJoinReq.coreDefinitionId,
    });
    if (coreDef.$type === AppError.$type) {
      const resData = buildRes({appError: coreDef});
      return res.status(404).json(resData);
    }
    const coreDefPermissionOp =
      await this.coreDefPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CORE_DEFINITION,
        resourceId: writeJoinReq.coreDefinitionId,
      });

    if (
      !canWriteWith(distOutletPermissionOp) ||
      !canWriteWith(coreDefPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.distOutletDataService.addCoreDefToDistOutlet(
      writeJoinReq
    );
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/core-definition/:distOutletId/:coreDefId"})
  async deleteCoreDef(req: Request, res: Response) {
    const deleteJoinReq = JoinCoreDefDistOutletRequest.fromPartial({
      distributionOutletId: req.params.distOutletId,
      coreDefinitionId: req.params.coreDefId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const distOutletPermissionOp =
      await this.distOutletPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.DISTRIBUTION_OUTLET,
        resourceId: deleteJoinReq.distributionOutletId,
      });
    const coreDef = await this.coreDefDataService.getCoreDefinition({
      coreDefinitionId: deleteJoinReq.coreDefinitionId,
    });
    if (coreDef.$type === AppError.$type) {
      const resData = buildRes({appError: coreDef});
      return res.status(404).json(resData);
    }
    const coreDefPermissionOp =
      await this.coreDefPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CORE_DEFINITION,
        resourceId: deleteJoinReq.coreDefinitionId,
      });

    if (
      !canWriteWith(distOutletPermissionOp) ||
      !canReadWith(coreDefPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response =
      await this.distOutletDataService.deleteCoreDefFromDistOutlet(
        deleteJoinReq
      );
    if (response instanceof Date) {
      const resData = buildRes({data: {deletedAt: response}});
      return res.json(resData);
    }
    const resData = buildRes({error: ErrorCode.UNKNOWN});
    return res.status(500).json(resData);
  }

  private async buildGetDistOutletResponse(
    distOutlet: DistributionOutlet
  ): Promise<GetDistributionOutletResponse> {
    const company = this.companyDataService.getCompany({
      companyId: distOutlet.companyId,
    });
    const physicalAddress = this.outletAddressDataService.getOutletAddress({
      outletAddressId: distOutlet.physicalAddressId,
    });
    const coreDefinitions =
      this.coreDefDataService.getCoreDefOfDitributionOutlet({
        distOutletId: distOutlet.id,
      });
    const products = this.distOutletDataService.getProducts({
      distOutletId: distOutlet.id,
    });
    return GetDistributionOutletResponse.fromPartial({
      distributionOutlet: distOutlet,
      company: await company,
      physicalAddress: await physicalAddress,
      coreDefinitions: await coreDefinitions,
      products: await products,
    });
  }
}
