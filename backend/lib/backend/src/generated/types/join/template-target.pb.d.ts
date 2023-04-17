import { Target } from "../operation/target/target.pb";
import { Template } from "../operation/template/template.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinTemplateTargetRequest {
    $type: "join.JoinTemplateTargetRequest";
    readonly templateId: string;
    readonly targetId: string;
}
/** Next Id: 3 */
export interface JoinTemplateTargetResponse {
    $type: "join.JoinTemplateTargetResponse";
    readonly template: Template | undefined;
    readonly target: Target | undefined;
}
export declare const JoinTemplateTargetRequest: {
    $type: "join.JoinTemplateTargetRequest";
    fromJSON(object: any): JoinTemplateTargetRequest;
    toJSON(message: JoinTemplateTargetRequest): unknown;
    fromPartial<I extends {
        targetId?: string | undefined;
        templateId?: string | undefined;
    } & {
        targetId?: string | undefined;
        templateId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "targetId" | "templateId">]: never; }>(object: I): JoinTemplateTargetRequest;
};
export declare const JoinTemplateTargetResponse: {
    $type: "join.JoinTemplateTargetResponse";
    fromJSON(object: any): JoinTemplateTargetResponse;
    toJSON(message: JoinTemplateTargetResponse): unknown;
    fromPartial<I extends {
        template?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } | undefined;
        target?: {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
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
        target?: ({
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
        } & { [K_1 in Exclude<keyof I["target"], "id" | "name" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "template" | "target" | "$type">]: never; }>(object: I): JoinTemplateTargetResponse;
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
