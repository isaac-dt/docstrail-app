import {
  get,
  patch,
  post,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {GetOutletAddressResponse} from "../../../generated/types/catalog/distribution/address.api.pb";
import {OutletAddress} from "../../../generated/types/catalog/distribution/address.pb";
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
import {DistributionOutletDataService} from "../distribution-outlet/dist-outlet.data";
import {DistributionOutletPermissionService} from "../distribution-outlet/dist-outlet.permission";
import {OutletAddressDataService} from "./outlet-address.data";
import {OutletAddressPermissionService} from "./outlet-address.permission";
import {OUTLET_ADDRESS_COLLECTION_SCHEMA} from "./outlet-address.schema";

/** Controller for Outlet Address. */
@Controller({
  path: "outlet-address",
  runHttpAfter: [guard],
})
export class OutletAddressController {
  readonly db = getFirestore();

  constructor(
    private readonly outletAddressPermissionService: OutletAddressPermissionService,
    private readonly outletAddressDataService: OutletAddressDataService,
    private readonly distOutletDataService: DistributionOutletDataService,
    private readonly distOutletPermissionService: DistributionOutletPermissionService
  ) {}

  @get({path: "/:addressId"})
  async getOutletAddress(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.outletAddressPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.OUTLET_ADDRESS,
        resourceId: req.params.addressId,
      });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const address = await this.outletAddressDataService.getOutletAddress({
      outletAddressId: req.params.addressId,
    });
    if (address.$type === AppError.$type) {
      const resData = buildRes({appError: address});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetOutletAddressResponse(address);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createOutletAddress(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: OUTLET_ADDRESS_COLLECTION_SCHEMA});
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
    const targetDistOutlet = await this.distOutletDataService.getDistOutlet({
      distOutletId: req.body.distributionOutletId,
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
    const address = await this.outletAddressDataService.createOutletAddress({
      outletAddressData: req.body,
    });
    if (address.$type === AppError.$type) {
      const appError = address;
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
    const response = await this.buildGetOutletAddressResponse(address);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:addressId"})
  async updateOutletAddressFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: OUTLET_ADDRESS_COLLECTION_SCHEMA,
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
    const targetAddress = await this.outletAddressDataService.getOutletAddress({
      outletAddressId: req.params.addressId,
    });
    if (targetAddress.$type === AppError.$type) {
      const resData = buildRes({appError: targetAddress});
      return res.status(404).json(resData);
    }
    const permissionOp =
      await this.outletAddressPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.OUTLET_ADDRESS,
        resourceId: targetAddress.id,
      });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const address =
      await this.outletAddressDataService.updateOutletAddressFields({
        outletAddressId: req.params.addressId,
        outletAddressData: req.body,
      });
    if (address.$type === AppError.$type) {
      const appError = address;
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
    const response = await this.buildGetOutletAddressResponse(address);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetOutletAddressResponse(
    outletAddress: OutletAddress
  ): Promise<GetOutletAddressResponse> {
    const distributionOutlet = await this.distOutletDataService.getDistOutlet({
      distOutletId: outletAddress.distributionOutletId,
    });
    const response = GetOutletAddressResponse.fromPartial({
      distributionOutlet,
      address: outletAddress,
    });
    return response;
  }
}
