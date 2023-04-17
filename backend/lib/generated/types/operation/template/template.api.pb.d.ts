import { Bundle } from "../bundle/bundle.pb";
import { Package } from "../package/package.pb";
import { Target } from "../target/target.pb";
import { Trigger } from "../trigger/trigger.pb";
import { Template } from "./template.pb";
export declare const protobufPackage = "operation.template";
/** Next Id: 5 */
export interface WriteTemplateRequest {
    $type: "operation.template.WriteTemplateRequest";
    readonly name: string | undefined;
    readonly description: string | undefined;
    readonly bundleId: string | undefined;
}
/** Next Id: 6 */
export interface GetTemplateResponse {
    $type: "operation.template.GetTemplateResponse";
    readonly template: Template | undefined;
    readonly bundle: Bundle | undefined;
    readonly packages: readonly Package[];
    readonly triggers: readonly Trigger[];
    readonly targets: readonly Target[];
}
/** Next Id: 3 */
export interface ListTemplateResponse {
    $type: "operation.template.ListTemplateResponse";
    readonly templates: readonly Template[];
    readonly matchCount: number;
}
export declare const WriteTemplateRequest: {
    $type: "operation.template.WriteTemplateRequest";
    fromJSON(object: any): WriteTemplateRequest;
    toJSON(message: WriteTemplateRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        description?: string | undefined;
        bundleId?: string | undefined;
    } & {
        name?: string | undefined;
        description?: string | undefined;
        bundleId?: string | undefined;
    } & { [K in Exclude<keyof I, "name" | "description" | "$type" | "bundleId">]: never; }>(object: I): WriteTemplateRequest;
};
export declare const GetTemplateResponse: {
    $type: "operation.template.GetTemplateResponse";
    fromJSON(object: any): GetTemplateResponse;
    toJSON(message: GetTemplateResponse): unknown;
    fromPartial<I extends {
        template?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } | undefined;
        bundle?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        packages?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
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
                specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            }) | undefined;
        }[] | undefined;
        targets?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
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
        bundle?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            } & {
                clientId?: string | undefined;
                $case: "clientId";
            } & { [K_1 in Exclude<keyof I["bundle"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_2 in Exclude<keyof I["bundle"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_3 in Exclude<keyof I["bundle"], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
        packages?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] & readonly ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            } & {
                clientId?: string | undefined;
                $case: "clientId";
            } & { [K_4 in Exclude<keyof I["packages"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_5 in Exclude<keyof I["packages"][number]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_6 in Exclude<keyof I["packages"][number], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_7 in Exclude<keyof I["packages"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[]>]: never; }) | undefined;
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
                specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
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
                } & { [K_8 in Exclude<keyof I["triggers"][number]["expectedDeliveryDate"]["scheduledEvent"], "day" | "month" | "$type">]: never; }) | undefined;
                $case: "scheduledEvent";
            } & { [K_9 in Exclude<keyof I["triggers"][number]["expectedDeliveryDate"], "$type" | "$case" | "scheduledEvent">]: never; }) | ({
                specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
            } & {
                $case: "specialEvent";
            } & {
                specialEvent?: import("../trigger/trigger.pb").SpecialEvent | undefined;
                $case: "specialEvent";
            } & { [K_10 in Exclude<keyof I["triggers"][number]["expectedDeliveryDate"], "$type" | "$case" | "specialEvent">]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I["triggers"][number], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "rootId" | "expiresAt" | "expectedDeliveryDate">]: never; })[] & { [K_12 in Exclude<keyof I["triggers"], "$type" | keyof readonly {
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
        }[]>]: never; }) | undefined;
        targets?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] & readonly ({
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_13 in Exclude<keyof I["targets"][number], "id" | "name" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_14 in Exclude<keyof I["targets"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_15 in Exclude<keyof I, "template" | "$type" | "bundle" | "packages" | "triggers" | "targets">]: never; }>(object: I): GetTemplateResponse;
};
export declare const ListTemplateResponse: {
    $type: "operation.template.ListTemplateResponse";
    fromJSON(object: any): ListTemplateResponse;
    toJSON(message: ListTemplateResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        templates?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        templates?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["templates"][number], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "bundleId">]: never; })[] & { [K_1 in Exclude<keyof I["templates"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "templates">]: never; }>(object: I): ListTemplateResponse;
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
