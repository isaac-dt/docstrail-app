export declare const protobufPackage = "operation.trigger";
/** List of special trigger events. */
export declare enum SpecialEvent {
    BIRTH_MONTH = "BIRTH_MONTH",
    NEW_HIRE = "NEW_HIRE",
    WORK_ANNIVERSARY = "WORK_ANNIVERSARY",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function specialEventFromJSON(object: any): SpecialEvent;
export declare function specialEventToJSON(object: SpecialEvent): string;
/**
 * Determies when a template runs (i.e,. when to create orders).
 * Next Id: 10
 */
export interface Trigger {
    $type: "operation.trigger.Trigger";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
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
    readonly rootId: string;
}
/** Day and month on which to trigger an event. */
export interface ScheduledEvent {
    $type: "operation.trigger.ScheduledEvent";
    readonly day: number;
    /** Counting from 1 to 12. */
    readonly month: number;
}
export declare const Trigger: {
    $type: "operation.trigger.Trigger";
    fromJSON(object: any): Trigger;
    toJSON(message: Trigger): unknown;
    fromPartial<I extends {
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
    } & { [K_3 in Exclude<keyof I, "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; }>(object: I): Trigger;
};
export declare const ScheduledEvent: {
    $type: "operation.trigger.ScheduledEvent";
    fromJSON(object: any): ScheduledEvent;
    toJSON(message: ScheduledEvent): unknown;
    fromPartial<I extends {
        day?: number | undefined;
        month?: number | undefined;
    } & {
        day?: number | undefined;
        month?: number | undefined;
    } & { [K in Exclude<keyof I, "day" | "month" | "$type">]: never; }>(object: I): ScheduledEvent;
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
