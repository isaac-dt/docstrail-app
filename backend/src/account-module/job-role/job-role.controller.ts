import {Controller} from "@dimetrail/firebase/core/utils";
import {
  get,
  put,
  patch,
  Request,
  Response,
  post,
} from "@dimetrail/firebase/core/https";
import {guard} from "../../shared/authentication/auth";
import {getFirestore} from "firebase-admin/firestore";
import {AppError, AuthData, ErrorCode} from "../../generated/types/common.pb";
import {DBEntity, PermissionOp} from "../../generated/types/permission.pb";
import {ClientPermissionService} from "../client/client.permission";
import {ClientDataService} from "../client/client.data";
import {buildRes} from "../../shared/https/response";
import {
  buildGetPermissionResponse,
  canReadWith,
  canWriteWith,
  isPermissionOpGte,
  setPermission,
} from "../../shared/permission/permission.data";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {PERMISSION_COLLECTION_SCHEMA} from "../../shared/permission/permission.schema";
import {JobRoleDataService} from "./job-role.data";
import {JobRolePermissionService} from "./job-role.permission";
import {RootPermissionService} from "../root/root.permission";
import {JobRole} from "../../generated/types/account/job-role/job-role.pb";
import {
  GetJobRoleResponse,
  ListJobRoleResponse,
  WriteJobRoleRequest,
} from "../../generated/types/account/job-role/job-role.api.pb";
import {JOB_ROLE_COLLECTION_SCHEMA} from "./job-role.schema";
import {RootDataService} from "../root/root.data";

/** Controller for Job role requests. */
@Controller({
  path: "job-role",
  runHttpAfter: [guard],
})
export class JobRoleController {
  readonly db = getFirestore();

  constructor(
    private readonly jobRoleDataService: JobRoleDataService,
    private readonly jobRolePermissionService: JobRolePermissionService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly rootPermissionService: RootPermissionService,
    private readonly rootDataService: RootDataService,
    private readonly clientDataService: ClientDataService,
  ) {}

  @get({path: "/:jobRoleId"})
  async getJobRole(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.jobRolePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.JOB_ROLE,
      resourceId: req.params.jobRoleId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const jobRole = await this.jobRoleDataService.getJobRole({
      jobRoleId: req.params.jobRoleId,
    });
    if (jobRole.$type === AppError.$type) {
      const resData = buildRes({appError: jobRole});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetJobRoleResponse(jobRole);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @get({path: "/list/root/:id"})
  async getJobRolesAtRoot(req: Request, res: Response) {
    return this.getJobRoles(req, res, "rootId");
  }
  @get({path: "/list/client/:id"})
  async getJobRolesAtClient(req: Request, res: Response) {
    return this.getJobRoles(req, res, "clientId");
  }
  private async getJobRoles(
    req: Request,
    res: Response,
    parent: "rootId" | "clientId"
  ) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    let permissionOp: PermissionOp = PermissionOp.NONE;
    if (parent === "rootId") {
      permissionOp = await this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ROOT,
        resourceId: req.params.id,
      });
    }
    if (parent === "clientId") {
      permissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: req.params.id,
      });
    }
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    const jobRoles = await this.jobRoleDataService.getJobRoles({
      parent,
      id: req.params.id,
    });
    const listJobRoleResponse = ListJobRoleResponse.fromPartial({
      jobRoles,
      matchCount: jobRoles.length,
    });
    const resData = buildRes({data: listJobRoleResponse});
    return res.json(resData);
  }

  @post({path: "/"})
  async createJobRole(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: JOB_ROLE_COLLECTION_SCHEMA});
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
    let permissionOp: PermissionOp = PermissionOp.NONE;
    const reqJobRole = WriteJobRoleRequest.fromPartial(req.body);
    if (reqJobRole.parent?.$case === "rootId") {
      const parentRoot = await this.rootDataService.getRoot({
        rootId: reqJobRole.parent.rootId,
      });
      if (parentRoot.$type === AppError.$type) {
        const resData = buildRes({appError: parentRoot});
        return res.status(404).json(resData);
      }
      permissionOp = await this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ROOT,
        resourceId: parentRoot.id,
      });
    } else if (reqJobRole.parent?.$case === "clientId") {
      const parentClient = await this.clientDataService.getClient({
        clientId: reqJobRole.parent.clientId,
      });
      if (parentClient.$type === AppError.$type) {
        const resData = buildRes({appError: parentClient});
        return res.status(404).json(resData);
      }
      permissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: parentClient.id,
      });
    }
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const jobRole = await this.jobRoleDataService.createJobRole({
      jobRoleData: req.body,
    });
    if (jobRole.$type === AppError.$type) {
      const appError = jobRole;
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
    const response = await this.buildGetJobRoleResponse(jobRole);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:jobRoleId"})
  async updateJobRoleFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOB_ROLE_COLLECTION_SCHEMA,
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
    let permissionOp: PermissionOp = PermissionOp.NONE;
    const reqJobRole = await this.jobRoleDataService.getJobRole({
      jobRoleId: req.params.jobRoleId,
    });
    if (reqJobRole.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    if (reqJobRole.parent?.$case === "rootId") {
      permissionOp = await this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ROOT,
        resourceId: reqJobRole.parent.rootId,
      });
    } else if (reqJobRole.parent?.$case === "clientId") {
      permissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: reqJobRole.parent.clientId,
      });
    }
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const jobRole = await this.jobRoleDataService.updateJobRoleFields({
      id: req.params.jobRoleId,
      jobRoleData: req.body,
    });
    if (jobRole.$type === AppError.$type) {
      const appError = jobRole;
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
    const response = this.buildGetJobRoleResponse(jobRole);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @put({path: "/permission"})
  async shareAccess(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: PERMISSION_COLLECTION_SCHEMA});
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
    const permissionOp = await this.jobRolePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.JOB_ROLE,
      resourceId: req.body.resourceId,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Ensure that requestor is only allowed to share up to their own permission operation.
    if (!isPermissionOpGte(permissionOp, req.body.operation)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const permission = await setPermission(req.body);
    if (permission.$type === AppError.$type) {
      const appError = permission;
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
    const response = await buildGetPermissionResponse(permission);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetJobRoleResponse(
    jobRole: JobRole
  ): Promise<GetJobRoleResponse> {
    const response = GetJobRoleResponse.fromPartial({jobRole});
    return response;
  }
}
