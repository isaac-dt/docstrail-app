import { AppError } from "../../../generated/types/common.pb";
import { OpenDefinition } from "../../../generated/types/catalog/open-definition/open-definition.pb";
import { WriteOpenDefinitionRequest } from "../../../generated/types/catalog/open-definition/open-definition.api.pb";
/**
 * Manages operations on open definition data.
 */
export declare class OpenDefinitionDataService {
    readonly db: FirebaseFirestore.Firestore;
    getOpenDefinition(args: {
        openDefinitionId: string;
    }): Promise<OpenDefinition | AppError>;
    getOpenDefsFromIds(args: {
        openDefIds: string[];
    }): Promise<readonly OpenDefinition[]>;
    getOpenDefsOfAllowList(args: {
        allowListId: string;
    }): Promise<readonly OpenDefinition[]>;
    getOpenDefsOfPackage(args: {
        packageId: string;
    }): Promise<readonly OpenDefinition[]>;
    createOpenDefinition(args: {
        openDefData: Partial<OpenDefinition>;
    }): Promise<OpenDefinition | AppError>;
    updateOpenDefinitionFields(args: {
        openDefinitionId: string;
        openDefinitionData: WriteOpenDefinitionRequest;
    }): Promise<OpenDefinition | AppError>;
}
