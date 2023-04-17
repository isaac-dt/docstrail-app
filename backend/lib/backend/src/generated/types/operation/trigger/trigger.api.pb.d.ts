import { ScheduledEvent, SpecialEvent, Trigger } from "./trigger.pb";
export declare const protobufPackage = "operation.trigger";
/** Next Id: 7 */
export interface WriteTriggerRequest {
    $type: "operation.trigger.WriteTriggerRequest";
    readonly name: string | undefined;
    readonly description: string | undefined;
    readonly expiresAt: Date | undefined;
    expectedDeliveryDate?: {
        $case: "scheduledEvent";
        scheduledEvent: ScheduledEvent;
    } | {
        $case: "specialEvent";
        specialEvent: SpecialEvent;
    };
    readonly rootId: string | undefined;
}
/** Next Id: 3 */
export interface GetTriggerResponse {
    $type: "operation.trigger.GetTriggerResponse";
    readonly trigger: Trigger | undefined;
}
/** Next Id: 3 */
export interface ListTriggerResponse {
    $type: "operation.trigger.ListTriggerResponse";
    readonly triggers: readonly Trigger[];
    readonly matchCount: number;
}
export declare const WriteTriggerRequest: {
    $type: "operation.trigger.WriteTriggerRequest";
    fromJSON(object: any): WriteTriggerRequest;
    toJSON(message: WriteTriggerRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        description?: string | undefined;
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
            specialEvent?: SpecialEvent | undefined;
        } & {
            $case: "specialEvent";
        }) | undefined;
    } & {
        name?: string | undefined;
        description?: string | undefined;
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
            } & { [K in Exclude<keyof I["expectedDeliveryDate"]["scheduledEvent"], "day" | "month" | "$type">]: never; }) | undefined;
            $case: "scheduledEvent";
        } & { [K_1 in Exclude<keyof I["expectedDeliveryDate"], "$type" | "$case" | "scheduledEvent">]: never; }) | ({
            specialEvent?: SpecialEvent | undefined;
        } & {
            $case: "specialEvent";
        } & {
            specialEvent?: SpecialEvent | undefined;
            $case: "specialEvent";
        } & { [K_2 in Exclude<keyof I["expectedDeliveryDate"], "$type" | "$case" | "specialEvent">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "name" | "description" | "$type" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; }>(object: I): WriteTriggerRequest;
};
export declare const GetTriggerResponse: {
    $type: "operation.trigger.GetTriggerResponse";
    fromJSON(object: any): GetTriggerResponse;
    toJSON(message: GetTriggerResponse): unknown;
    fromPartial<I extends {
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
                specialEvent?: SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            }) | undefined;
        } | undefined;
    } & {
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
                specialEvent?: SpecialEvent | undefined;
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
                } & { [K in Exclude<keyof I["trigger"]["expectedDeliveryDate"]["scheduledEvent"], "day" | "month" | "$type">]: never; }) | undefined;
                $case: "scheduledEvent";
            } & { [K_1 in Exclude<keyof I["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "scheduledEvent">]: never; }) | ({
                specialEvent?: SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            } & {
                specialEvent?: SpecialEvent | undefined;
                $case: "specialEvent";
            } & { [K_2 in Exclude<keyof I["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "specialEvent">]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["trigger"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "$type" | "trigger">]: never; }>(object: I): GetTriggerResponse;
};
export declare const ListTriggerResponse: {
    $type: "operation.trigger.ListTriggerResponse";
    fromJSON(object: any): ListTriggerResponse;
    toJSON(message: ListTriggerResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        triggers?: readonly {
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
                specialEvent?: SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            }) | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        triggers?: (readonly {
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
                specialEvent?: SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            }) | undefined;
        }[] & readonly ({
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
                specialEvent?: SpecialEvent | undefined;
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
                } & { [K in Exclude<keyof I["triggers"][number]["expectedDeliveryDate"]["scheduledEvent"], "day" | "month" | "$type">]: never; }) | undefined;
                $case: "scheduledEvent";
            } & { [K_1 in Exclude<keyof I["triggers"][number]["expectedDeliveryDate"], "$type" | "$case" | "scheduledEvent">]: never; }) | ({
                specialEvent?: SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            } & {
                specialEvent?: SpecialEvent | undefined;
                $case: "specialEvent";
            } & { [K_2 in Exclude<keyof I["triggers"][number]["expectedDeliveryDate"], "$type" | "$case" | "specialEvent">]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["triggers"][number], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; })[] & { [K_4 in Exclude<keyof I["triggers"], "$type" | keyof readonly {
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
                specialEvent?: SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            }) | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "$type" | "matchCount" | "triggers">]: never; }>(object: I): ListTriggerResponse;
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
