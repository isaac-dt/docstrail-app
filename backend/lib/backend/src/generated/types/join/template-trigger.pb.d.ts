import { Template } from "../operation/template/template.pb";
import { Trigger } from "../operation/trigger/trigger.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinTemplateTriggerRequest {
    $type: "join.JoinTemplateTriggerRequest";
    readonly templateId: string;
    readonly triggerId: string;
}
/** Next Id: 3 */
export interface JoinTemplateTriggerResponse {
    $type: "join.JoinTemplateTriggerResponse";
    readonly template: Template | undefined;
    readonly trigger: Trigger | undefined;
}
export declare const JoinTemplateTriggerRequest: {
    $type: "join.JoinTemplateTriggerRequest";
    fromJSON(object: any): JoinTemplateTriggerRequest;
    toJSON(message: JoinTemplateTriggerRequest): unknown;
    fromPartial<I extends {
        templateId?: string | undefined;
        triggerId?: string | undefined;
    } & {
        templateId?: string | undefined;
        triggerId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "templateId" | "triggerId">]: never; }>(object: I): JoinTemplateTriggerRequest;
};
export declare const JoinTemplateTriggerResponse: {
    $type: "join.JoinTemplateTriggerResponse";
    fromJSON(object: any): JoinTemplateTriggerResponse;
    toJSON(message: JoinTemplateTriggerResponse): unknown;
    fromPartial<I extends {
        template?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } | undefined;
        trigger?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            expiresAt?: Date | undefined;
            expectedDeliveryDate?: ({
                scheduledEvent?: {
                    day?: number | undefined;
                    month?: number | undefined;
                } | undefined;
            } & {
                $case: "scheduledEvent";
            }) | ({
                specialEvent?: import("../operation/trigger/trigger.pb").SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            }) | undefined;
        } | undefined;
    } & {
        template?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } & { [K in Exclude<keyof I["template"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "bundleId">]: never; }) | undefined;
        trigger?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            expiresAt?: Date | undefined;
            expectedDeliveryDate?: ({
                scheduledEvent?: {
                    day?: number | undefined;
                    month?: number | undefined;
                } | undefined;
            } & {
                $case: "scheduledEvent";
            }) | ({
                specialEvent?: import("../operation/trigger/trigger.pb").SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            }) | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
            expiresAt?: Date | undefined;
            expectedDeliveryDate?: ({
                scheduledEvent?: {
                    day?: number | undefined;
                    month?: number | undefined;
                } | undefined;
            } & {
                $case: "scheduledEvent";
            } & {
                scheduledEvent?: ({
                    day?: number | undefined;
                    month?: number | undefined;
                } & {
                    day?: number | undefined;
                    month?: number | undefined;
                } & { [K_1 in Exclude<keyof I["trigger"]["expectedDeliveryDate"]["scheduledEvent"], "day" | "month" | "$type">]: never; }) | undefined;
                $case: "scheduledEvent";
            } & { [K_2 in Exclude<keyof I["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "scheduledEvent">]: never; }) | ({
                specialEvent?: import("../operation/trigger/trigger.pb").SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            } & {
                specialEvent?: import("../operation/trigger/trigger.pb").SpecialEvent | undefined;
                $case: "specialEvent";
            } & { [K_3 in Exclude<keyof I["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "specialEvent">]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["trigger"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "template" | "$type" | "trigger">]: never; }>(object: I): JoinTemplateTriggerResponse;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]>;
} & {
    $case: T["$case"];
} : T extends {} ? {
    [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never;
};
export {};
