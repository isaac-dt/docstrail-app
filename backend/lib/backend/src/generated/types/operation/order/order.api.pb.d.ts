import { UserAddress } from "../../account/user/address.pb";
import { User } from "../../account/user/user.pb";
import { DeliveryItem } from "../item/item.pb";
import { Template } from "../template/template.pb";
import { Trigger } from "../trigger/trigger.pb";
import { Order, OrderApproval, OrderStatus } from "./order.pb";
export declare const protobufPackage = "operation.order";
/** Next Id: 11 */
export interface WriteOrderRequest {
    $type: "operation.order.WriteOrderRequest";
    readonly status: OrderStatus;
    readonly approval: OrderApproval | undefined;
    readonly trackingNumber: string | undefined;
    readonly expectedDeliveryDate: Date | undefined;
    readonly estimatedDeliveryDate: Date | undefined;
    readonly shippingDate: Date | undefined;
    readonly trigger: Trigger | undefined;
    readonly deliveryAddress: UserAddress | undefined;
    readonly user: User | undefined;
    readonly rootId: string | undefined;
}
/** Next Id: 4 */
export interface GetOrderResponse {
    $type: "operation.order.GetOrderResponse";
    readonly order: Order | undefined;
    /**
     * The template might have been modified after the order is created.
     * The system should rely on the order field as source of truth.
     */
    readonly template: Template | undefined;
    readonly items: readonly DeliveryItem[];
}
/** Next Id: 3 */
export interface ListOrderResponse {
    $type: "operation.order.ListOrderResponse";
    readonly orders: readonly Order[];
    readonly matchCount: number;
}
export declare const WriteOrderRequest: {
    $type: "operation.order.WriteOrderRequest";
    fromJSON(object: any): WriteOrderRequest;
    toJSON(message: WriteOrderRequest): unknown;
    fromPartial<I extends {
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
        rootId?: string | undefined;
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
            status?: import("./order.pb").OrderApprovalStatus | undefined;
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
        rootId?: string | undefined;
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
            status?: import("./order.pb").OrderApprovalStatus | undefined;
            userId?: string | undefined;
            note?: string | undefined;
        } & {
            time?: Date | undefined;
            status?: import("./order.pb").OrderApprovalStatus | undefined;
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
    } & { [K_7 in Exclude<keyof I, "status" | "user" | "$type" | "rootId" | "expectedDeliveryDate" | "trigger" | "estimatedDeliveryDate" | "shippingDate" | "trackingNumber" | "approval" | "deliveryAddress">]: never; }>(object: I): WriteOrderRequest;
};
export declare const GetOrderResponse: {
    $type: "operation.order.GetOrderResponse";
    fromJSON(object: any): GetOrderResponse;
    toJSON(message: GetOrderResponse): unknown;
    fromPartial<I extends {
        order?: {
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
                status?: import("./order.pb").OrderApprovalStatus | undefined;
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
        } | undefined;
        template?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } | undefined;
        items?: readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        }[] | undefined;
    } & {
        order?: ({
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
                status?: import("./order.pb").OrderApprovalStatus | undefined;
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
            } & { [K in Exclude<keyof I["order"]["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
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
                    } & { [K_1 in Exclude<keyof I["order"]["trigger"]["expectedDeliveryDate"]["scheduledEvent"], "day" | "month" | "$type">]: never; }) | undefined;
                    $case: "scheduledEvent";
                } & { [K_2 in Exclude<keyof I["order"]["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "scheduledEvent">]: never; }) | ({
                    specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
                } & {
                    $case: "specialEvent";
                } & {
                    specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
                    $case: "specialEvent";
                } & { [K_3 in Exclude<keyof I["order"]["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "specialEvent">]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["order"]["trigger"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; }) | undefined;
            estimatedDeliveryDate?: Date | undefined;
            shippingDate?: Date | undefined;
            trackingNumber?: string | undefined;
            approval?: ({
                time?: Date | undefined;
                status?: import("./order.pb").OrderApprovalStatus | undefined;
                userId?: string | undefined;
                note?: string | undefined;
            } & {
                time?: Date | undefined;
                status?: import("./order.pb").OrderApprovalStatus | undefined;
                userId?: string | undefined;
                note?: string | undefined;
            } & { [K_5 in Exclude<keyof I["order"]["approval"], "time" | "status" | "$type" | "userId" | "note">]: never; }) | undefined;
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
            } & { [K_6 in Exclude<keyof I["order"]["deliveryAddress"], "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "userId" | "street" | "city" | "zip" | "countryCode">]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I["order"], "id" | "status" | "user" | "createdAt" | "$type" | "updatedAt" | "rootId" | "templateId" | "expectedDeliveryDate" | "trigger" | "estimatedDeliveryDate" | "shippingDate" | "trackingNumber" | "approval" | "deliveryAddress">]: never; }) | undefined;
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
        } & { [K_8 in Exclude<keyof I["template"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "bundleId">]: never; }) | undefined;
        items?: (readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        } & { [K_9 in Exclude<keyof I["items"][number], "id" | "createdAt" | "$type" | "updatedAt" | "productId" | "quantity" | "orderId">]: never; })[] & { [K_10 in Exclude<keyof I["items"], "$type" | keyof readonly {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            productId?: string | undefined;
            quantity?: number | undefined;
            orderId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I, "order" | "template" | "$type" | "items">]: never; }>(object: I): GetOrderResponse;
};
export declare const ListOrderResponse: {
    $type: "operation.order.ListOrderResponse";
    fromJSON(object: any): ListOrderResponse;
    toJSON(message: ListOrderResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        orders?: readonly {
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
                status?: import("./order.pb").OrderApprovalStatus | undefined;
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
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        orders?: (readonly {
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
                status?: import("./order.pb").OrderApprovalStatus | undefined;
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
        }[] & readonly ({
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
                status?: import("./order.pb").OrderApprovalStatus | undefined;
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
            } & { [K in Exclude<keyof I["orders"][number]["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
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
                    } & { [K_1 in Exclude<keyof I["orders"][number]["trigger"]["expectedDeliveryDate"]["scheduledEvent"], "day" | "month" | "$type">]: never; }) | undefined;
                    $case: "scheduledEvent";
                } & { [K_2 in Exclude<keyof I["orders"][number]["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "scheduledEvent">]: never; }) | ({
                    specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
                } & {
                    $case: "specialEvent";
                } & {
                    specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
                    $case: "specialEvent";
                } & { [K_3 in Exclude<keyof I["orders"][number]["trigger"]["expectedDeliveryDate"], "$type" | "$case" | "specialEvent">]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["orders"][number]["trigger"], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; }) | undefined;
            estimatedDeliveryDate?: Date | undefined;
            shippingDate?: Date | undefined;
            trackingNumber?: string | undefined;
            approval?: ({
                time?: Date | undefined;
                status?: import("./order.pb").OrderApprovalStatus | undefined;
                userId?: string | undefined;
                note?: string | undefined;
            } & {
                time?: Date | undefined;
                status?: import("./order.pb").OrderApprovalStatus | undefined;
                userId?: string | undefined;
                note?: string | undefined;
            } & { [K_5 in Exclude<keyof I["orders"][number]["approval"], "time" | "status" | "$type" | "userId" | "note">]: never; }) | undefined;
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
            } & { [K_6 in Exclude<keyof I["orders"][number]["deliveryAddress"], "id" | "unit" | "createdAt" | "$type" | "updatedAt" | "userId" | "street" | "city" | "zip" | "countryCode">]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I["orders"][number], "id" | "status" | "user" | "createdAt" | "$type" | "updatedAt" | "rootId" | "templateId" | "expectedDeliveryDate" | "trigger" | "estimatedDeliveryDate" | "shippingDate" | "trackingNumber" | "approval" | "deliveryAddress">]: never; })[] & { [K_8 in Exclude<keyof I["orders"], "$type" | keyof readonly {
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
                status?: import("./order.pb").OrderApprovalStatus | undefined;
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
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, "$type" | "matchCount" | "orders">]: never; }>(object: I): ListOrderResponse;
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
