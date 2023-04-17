import { UserAddress } from "../../account/user/address.pb";
import { User } from "../../account/user/user.pb";
import { Trigger } from "../trigger/trigger.pb";
export declare const protobufPackage = "operation.order";
/**
 * Status of an order.
 * Next Id: 4
 */
export declare enum OrderStatus {
    REQUESTED = "REQUESTED",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function orderStatusFromJSON(object: any): OrderStatus;
export declare function orderStatusToJSON(object: OrderStatus): string;
/**
 * Approval Status of an order.
 * Next Id: 2
 */
export declare enum OrderApprovalStatus {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function orderApprovalStatusFromJSON(object: any): OrderApprovalStatus;
export declare function orderApprovalStatusToJSON(object: OrderApprovalStatus): string;
/**
 * An order to deliver items.
 * Next Id: 15
 */
export interface Order {
    $type: "operation.order.Order";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly templateId: string | undefined;
    readonly expectedDeliveryDate: Date | undefined;
    readonly estimatedDeliveryDate: Date | undefined;
    readonly shippingDate: Date | undefined;
    readonly trackingNumber: string | undefined;
    readonly status: OrderStatus;
    readonly approval: OrderApproval | undefined;
    readonly trigger: Trigger | undefined;
    readonly deliveryAddress: UserAddress | undefined;
    readonly user: User | undefined;
    readonly rootId: string;
}
/**
 * Approval data for an order.
 * Next Id: 5
 */
export interface OrderApproval {
    $type: "operation.order.OrderApproval";
    readonly time: Date | undefined;
    readonly userId: string;
    readonly status: OrderApprovalStatus;
    readonly note: string | undefined;
}
export declare const Order: {
    $type: "operation.order.Order";
    fromJSON(object: any): Order;
    toJSON(message: Order): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        status?: OrderStatus | undefined;
        user?: {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        rootId?: string | undefined;
        templateId?: string | undefined;
        expectedDeliveryDate?: Date | undefined;
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
                specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            }) | undefined;
        } | undefined;
        estimatedDeliveryDate?: Date | undefined;
        shippingDate?: Date | undefined;
        trackingNumber?: string | undefined;
        approval?: {
            time?: Date | undefined;
            status?: OrderApprovalStatus | undefined;
            userId?: string | undefined;
            note?: string | undefined;
        } | undefined;
        deliveryAddress?: {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        status?: OrderStatus | undefined;
        user?: ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K in Exclude<keyof I["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        rootId?: string | undefined;
        templateId?: string | undefined;
        expectedDeliveryDate?: Date | undefined;
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
                specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
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
                specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            } & {
                specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
                $case: "specialEvent";
            } & { [K_3 in Exclude<keyof I["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "specialEvent">]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["trigger"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; }) | undefined;
        estimatedDeliveryDate?: Date | undefined;
        shippingDate?: Date | undefined;
        trackingNumber?: string | undefined;
        approval?: ({
            time?: Date | undefined;
            status?: OrderApprovalStatus | undefined;
            userId?: string | undefined;
            note?: string | undefined;
        } & {
            time?: Date | undefined;
            status?: OrderApprovalStatus | undefined;
            userId?: string | undefined;
            note?: string | undefined;
        } & { [K_5 in Exclude<keyof I["approval"], "time" | "status" | "$type" | "userId" | "note">]: never; }) | undefined;
        deliveryAddress?: ({
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
        } & {
            id?: string | undefined;
            unit?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            street?: string | undefined;
            city?: string | undefined;
            zip?: string | undefined;
            countryCode?: number | undefined;
        } & { [K_6 in Exclude<keyof I["deliveryAddress"], "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "userId" | "street" | "city" | "zip" | "countryCode">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, "id" | "status" | "user" | "createdAt" | "$type" | "updatedAt" | "rootId" | "templateId" | "expectedDeliveryDate" | "trigger" | "estimatedDeliveryDate" | "shippingDate" | "trackingNumber" | "approval" | "deliveryAddress">]: never; }>(object: I): Order;
};
export declare const OrderApproval: {
    $type: "operation.order.OrderApproval";
    fromJSON(object: any): OrderApproval;
    toJSON(message: OrderApproval): unknown;
    fromPartial<I extends {
        time?: Date | undefined;
        status?: OrderApprovalStatus | undefined;
        userId?: string | undefined;
        note?: string | undefined;
    } & {
        time?: Date | undefined;
        status?: OrderApprovalStatus | undefined;
        userId?: string | undefined;
        note?: string | undefined;
    } & { [K in Exclude<keyof I, "time" | "status" | "$type" | "userId" | "note">]: never; }>(object: I): OrderApproval;
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
