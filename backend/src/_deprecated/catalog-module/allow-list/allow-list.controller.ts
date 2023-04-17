import {
  dtDelete,
  get,
  put,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {ClientDataService} from "../../../account-module/client/client.data";
import {GetAllowListResponse} from "../../../generated/types/catalog/allow-list/allow-list.api.pb";
import {AllowList} from "../../../generated/types/catalog/allow-list/allow-list.pb";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {JoinAllowListOpenDefinitionRequest} from "../../../generated/types/join/allow-list-open-def.pb";
import {DBEntity} from "../../../generated/types/permission.pb";
import {guard} from "../../../shared/authentication/auth";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {buildRes} from "../../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../../shared/permission/permission.data";
import {OpenDefinitionDataService} from "../open-definition/open-definition.data";
import {OpenDefinitionPermissionService} from "../open-definition/open-definition.permission";
import {AllowListDataService} from "./allow-list.data";
import {AllowListPermissionService} from "./allow-list.permission";
import {JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_SCHEMA} from "./allow-list.schema";

/** Controller for Allow List. */
@Controller({
  path: "allow-list",
  runHttpAfter: [guard],
})
export class AllowListController {
  readonly db = getFirestore();

  constructor(
    private readonly allowListDataService: AllowListDataService,
    private readonly allowListPermissionService: AllowListPermissionService,
    private readonly openDefDataService: OpenDefinitionDataService,
    private readonly openDefPermissionService: OpenDefinitionPermissionService,
    private readonly clientDataService: ClientDataService
  ) {}

  @get({path: "/:allowListId"})
  async getAllowList(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.allowListPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ALLOW_LIST,
      resourceId: req.params.allowListId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const allowList = await this.allowListDataService.getAllowList({
      allowListId: req.params.allowListId,
    });
    if (allowList.$type === AppError.$type) {
      const resData = buildRes({appError: allowList});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetAllowListResponse(allowList);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  // Note: Allow List entries are created in the Account.ClientDataService, at createClient.

  @put({path: "/open-definition"})
  async addOpenDefinition(req: Request, res: Response) {
    const writeJoinReq = JoinAllowListOpenDefinitionRequest.fromPartial(
      req.body
    );
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_SCHEMA,
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
    const allowListPermissionOp =
      await this.allowListPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ALLOW_LIST,
        resourceId: writeJoinReq.allowListId,
      });
    const openDef = await this.openDefDataService.getOpenDefinition({
      openDefinitionId: writeJoinReq.openDefinitionId,
    });
    if (openDef.$type === AppError.$type) {
      const resData = buildRes({appError: openDef});
      return res.status(404).json(resData);
    }
    const openDefPermissionOp =
      await this.openDefPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.OPEN_DEFINITION,
        resourceId: writeJoinReq.openDefinitionId,
      });

    if (
      !canWriteWith(allowListPermissionOp) ||
      !canWriteWith(openDefPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.allowListDataService.addOpenDefToAllowList(
      writeJoinReq
    );
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/open-definition/:allowListId/:openDefinitionId"})
  async deleteOpenDef(req: Request, res: Response) {
    const deleteJoinReq = JoinAllowListOpenDefinitionRequest.fromPartial({
      openDefinitionId: req.params.openDefinitionId,
      allowListId: req.params.allowListId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const allowListPermissionOp =
      await this.allowListPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ALLOW_LIST,
        resourceId: deleteJoinReq.allowListId,
      });
    const openDef = await this.openDefDataService.getOpenDefinition({
      openDefinitionId: deleteJoinReq.openDefinitionId,
    });
    if (openDef.$type === AppError.$type) {
      const resData = buildRes({appError: openDef});
      return res.status(404).json(resData);
    }
    const openDefPermissionOp =
      await this.openDefPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.OPEN_DEFINITION,
        resourceId: deleteJoinReq.openDefinitionId,
      });

    if (
      !canWriteWith(allowListPermissionOp) ||
      !canReadWith(openDefPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.allowListDataService.deleteOpenDefFromAllowList(
      deleteJoinReq
    );
    if (response instanceof Date) {
      const resData = buildRes({data: {deletedAt: response}});
      return res.json(resData);
    }
    const resData = buildRes({error: ErrorCode.UNKNOWN});
    return res.status(500).json(resData);
  }

  private async buildGetAllowListResponse(
    allowList: AllowList
  ): Promise<GetAllowListResponse> {
    const response = GetAllowListResponse.fromPartial({
      allowList,
      client: await this.clientDataService.getClient({
        clientId: allowList.clientId,
      }),
    });
    return response;
  }
}
