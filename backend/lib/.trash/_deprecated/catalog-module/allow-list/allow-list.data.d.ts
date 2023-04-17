import { AppError } from "../../../generated/types/common.pb";
import { AllowList } from "../../../generated/types/catalog/allow-list/allow-list.pb";
import { JoinAllowListOpenDefinitionRequest, JoinAllowListOpenDefinitionResponse } from "../../../generated/types/join/allow-list-open-def.pb";
import { OpenDefinitionDataService } from "../open-definition/open-definition.data";
/** Allow List data service. */
export declare class AllowListDataService {
    private readonly openDefDataService;
    readonly db: any;
    constructor(openDefDataService: OpenDefinitionDataService);
    getAllowList(args: {
        allowListId: string;
    }): Promise<AllowList | AppError>;
    createAllowList(args: {
        allowListData: Partial<AllowList>;
    }): Promise<AllowList | AppError>;
    addOpenDefToAllowList(args: JoinAllowListOpenDefinitionRequest): Promise<JoinAllowListOpenDefinitionResponse | AppError>;
    deleteOpenDefFromAllowList(args: JoinAllowListOpenDefinitionRequest): Promise<Date | AppError>;
}
