import {get, Request, Response} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {RootDataService} from "../../account-module/root/root.data";
import {RootPermissionService} from "../../account-module/root/root.permission";
import {GetRootResponse} from "../../generated/types/account/root/root.api.pb";
import {Root} from "../../generated/types/account/root/root.pb";
import {AppError, AuthData, ErrorCode} from "../../generated/types/common.pb";
import {DBEntity} from "../../generated/types/permission.pb";
import {guard} from "../../shared/authentication/auth";
import {buildRes} from "../../shared/https/response";
import {canReadWith} from "../../shared/permission/permission.data";

/** Controller for Root. */
@Controller({
  path: "root",
  runHttpAfter: [guard],
})
export class RootController {
  readonly db = getFirestore();

  constructor(
    private readonly rootDataService: RootDataService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  @get({path: "/:rootId"})
  async getRoot(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.rootPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ROOT,
      resourceId: req.params.rootId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const root = await this.rootDataService.getRoot({
      rootId: req.params.rootId,
    });
    if (root.$type === AppError.$type) {
      const resData = buildRes({appError: root});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetRootResponse(root);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetRootResponse(root: Root): Promise<GetRootResponse> {
    const clients = this.rootDataService.getClients({rootId: root.id});
    const companies = this.rootDataService.getCompanies({rootId: root.id});
    const jobRoles = this.rootDataService.getJobRoles({rootId: root.id});
    const openDefinitions = this.rootDataService.getOpenDefinitions({
      rootId: root.id,
    });
    const coreDefinitions = this.rootDataService.getCoreDefinitions({
      rootId: root.id,
    });
    const response = GetRootResponse.fromPartial({
      clients: await clients,
      jobRoles: await jobRoles,
      companies: await companies,
      openDefinitions: await openDefinitions,
      coreDefinitions: await coreDefinitions,
    });
    return response;
  }
}
