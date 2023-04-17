import { CoreDefinition } from "../../../generated/types/catalog/core-definition/core-definition.pb";
/**
 * Contains openrations that could be used by several data services.
 */
export declare class CoreDefinitionSharedService {
    readonly db: any;
    getCoreDefinitionsFromIds(args: {
        coreDefIds: string[];
    }): Promise<readonly CoreDefinition[]>;
}
