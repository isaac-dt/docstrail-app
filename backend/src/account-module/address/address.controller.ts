import {
  get,
  patch,
  post,
  Request,
  Response,
} from "../../../framework/core/https";
import {Controller} from "../../../framework/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {
  GetUserAddressResponse,
  ListUserAddressResponse,
} from "../../generated/types/account/user/address.api.pb";
import {UserAddress} from "../../generated/types/account/user/address.pb";
import {AppError, AuthData, ErrorCode} from "../../generated/types/common.pb";
import {DBEntity} from "../../generated/types/permission.pb";
import {guard} from "../../shared/authentication/auth";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {buildRes} from "../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../shared/permission/permission.data";
import {UserDataService} from "../user/user.data";
import {UserPermissionService} from "../user/user.permission";
import {AddressDataService} from "./address.data";
import {AddressPermissionService} from "./address.permission";
import {ADDRESS_COLLECTION_SCHEMA} from "./address.schema";

/** Controller for User Address. */
@Controller({
  path: "user-address",
  runHttpAfter: [guard],
})
export class UserAddressController {
  readonly db = getFirestore();

  constructor(
    private readonly addressDataService: AddressDataService,
    private readonly addressPermissionService: AddressPermissionService,
    private readonly userDataSerivce: UserDataService,
    private readonly userPermissionService: UserPermissionService
  ) {}

  @get({path: "/:addressId"})
  async getAddress(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.addressPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ADDRESS,
      resourceId: req.params.addressId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const address = await this.addressDataService.getAddress({
      addressId: req.params.addressId,
    });
    if (address.$type === AppError.$type) {
      const resData = buildRes({appError: address});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetAddressResponse(address);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @get({path: "/list/:userId"})
  async getAddresses(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: req.params.userId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    const addresses = await this.userDataSerivce.getAddresses({
      userId: req.params.userId,
    });
    const listAddressResponse = ListUserAddressResponse.fromPartial({
      addresses,
      matchCount: addresses.length,
    });
    const resData = buildRes({data: listAddressResponse});
    return res.json(resData);
  }

  @post({path: "/"})
  async createAddress(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: ADDRESS_COLLECTION_SCHEMA});
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
    const targetUser = await this.userDataSerivce.getUser({
      userId: req.body.userId,
    });
    if (targetUser.$type === AppError.$type) {
      const resData = buildRes({appError: targetUser});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: targetUser.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const address = await this.addressDataService.createAddress({
      addressData: req.body,
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
    const response = await this.buildGetAddressResponse(address);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:addressId"})
  async updateAddressFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: ADDRESS_COLLECTION_SCHEMA,
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
    const targetAddress = await this.addressDataService.getAddress({
      addressId: req.params.addressId,
    });
    if (targetAddress.$type === AppError.$type) {
      const resData = buildRes({appError: targetAddress});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.addressPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ADDRESS,
      resourceId: targetAddress.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const address = await this.addressDataService.updateAddressFields({
      id: req.params.addressId,
      addressData: req.body,
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
    const response = await this.buildGetAddressResponse(address);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetAddressResponse(
    address: UserAddress
  ): Promise<GetUserAddressResponse> {
    const user = await this.userDataSerivce.getUser({userId: address.userId});
    const response = GetUserAddressResponse.fromPartial({user, address});
    return response;
  }
}
