import { OpenDefinition } from "../../generated/types/catalog/open-definition/open-definition.pb";
/**
 * Contains openrations that could be used by several data services.
 */
export declare class OpenDefinitionSharedService {
    readonly db: FirebaseFirestore.Firestore;
    getOpenDefsFromIds(args: {
        openDefIds: string[];
    }): Promise<readonly OpenDefinition[]>;
}
