import { Client } from "../../account/client/client.pb";
import { Schedule } from "./schedule.pb";
export declare const protobufPackage = "operation.schedule";
/** Next Id: 4 */
export interface WriteScheduleRequest {
    $type: "operation.schedule.WriteScheduleRequest";
    readonly name: string | undefined;
    readonly description: string | undefined;
    readonly clientId: string | undefined;
}
/** Next Id: 3 */
export interface GetScheduleResponse {
    $type: "operation.schedule.GetScheduleResponse";
    readonly schedule: Schedule | undefined;
    readonly client: Client | undefined;
}
/** Next Id: 3 */
export interface ListScheduleResponse {
    $type: "operation.schedule.ListScheduleResponse";
    readonly schedules: readonly Schedule[];
    readonly matchCount: number;
}
export declare const WriteScheduleRequest: {
    $type: "operation.schedule.WriteScheduleRequest";
    fromJSON(object: any): WriteScheduleRequest;
    toJSON(message: WriteScheduleRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        description?: string | undefined;
        clientId?: string | undefined;
    } & {
        name?: string | undefined;
        description?: string | undefined;
        clientId?: string | undefined;
    } & { [K in Exclude<keyof I, "name" | "description" | "clientId" | "$type">]: never; }>(object: I): WriteScheduleRequest;
};
export declare const GetScheduleResponse: {
    $type: "operation.schedule.GetScheduleResponse";
    fromJSON(object: any): GetScheduleResponse;
    toJSON(message: GetScheduleResponse): unknown;
    fromPartial<I extends {
        schedule?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        client?: {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } | undefined;
    } & {
        schedule?: ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["schedule"], "id" | "name" | "description" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
        client?: ({
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["client"], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "rootId">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "schedule" | "$type" | "client">]: never; }>(object: I): GetScheduleResponse;
};
export declare const ListScheduleResponse: {
    $type: "operation.schedule.ListScheduleResponse";
    fromJSON(object: any): ListScheduleResponse;
    toJSON(message: ListScheduleResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        schedules?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        schedules?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] & readonly ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["schedules"][number], "id" | "name" | "description" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_1 in Exclude<keyof I["schedules"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "schedules">]: never; }>(object: I): ListScheduleResponse;
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
