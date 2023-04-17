import { AppError } from "../../../generated/types/common.pb";
import { CoreDefinition } from "../../../generated/types/catalog/core-definition/core-definition.pb";
import { WriteCoreDefinitionRequest } from "../../../generated/types/catalog/core-definition/core-definition.api.pb";
import { CoreDefinitionSharedService } from "./core-def.shared";
/**
 * Manages operations on core definition data.
 */
export declare class CoreDefinitionDataService {
    private readonly coreDefinitionSharedService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(coreDefinitionSharedService: CoreDefinitionSharedService);
    getCoreDefinition(args: {
        coreDefinitionId: string;
    }): Promise<CoreDefinition | AppError>;
    getCoreDefOfDitributionOutlet(args: {
        distOutletId: string;
    }): Promise<readonly CoreDefinition[]>;
    createCoreDefinition(args: {
        coreDefData: Partial<CoreDefinition>;
    }): Promise<CoreDefinition | AppError>;
    updateCoreDefinitionFields(args: {
        coreDefinitionId: string;
        coreDefinitionData: WriteCoreDefinitionRequest;
    }): Promise<CoreDefinition | AppError>;
}
