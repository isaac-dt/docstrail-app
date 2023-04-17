import { AppError } from "../../../generated/types/common.pb";
import { Trigger } from "../../../generated/types/operation/trigger/trigger.pb";
/**
 * Manages operations on trigger data.
 */
export declare class TriggerDataService {
    readonly db: any;
    getTrigger(args: {
        triggerId: string;
    }): Promise<Trigger | AppError>;
    getTriggersFromIds(args: {
        triggerIds: string[];
    }): Promise<readonly Trigger[]>;
    getTriggersOfTemplate(args: {
        templateId: string;
    }): Promise<readonly Trigger[]>;
    createTrigger(args: {
        triggerData: Partial<Trigger>;
    }): Promise<Trigger | AppError>;
    updateTriggerFields(args: {
        triggerId: string;
        triggerData: Partial<Trigger>;
    }): Promise<Trigger | AppError>;
}
