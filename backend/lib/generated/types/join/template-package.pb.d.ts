import { Package } from "../operation/package/package.pb";
import { Template } from "../operation/template/template.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinTemplatePackageRequest {
    $type: "join.JoinTemplatePackageRequest";
    readonly templateId: string;
    readonly packageId: string;
}
/** Next Id: 3 */
export interface JoinTemplatePackageResponse {
    $type: "join.JoinTemplatePackageResponse";
    readonly template: Template | undefined;
    readonly package: Package | undefined;
}
export declare const JoinTemplatePackageRequest: {
    $type: "join.JoinTemplatePackageRequest";
    fromJSON(object: any): JoinTemplatePackageRequest;
    toJSON(message: JoinTemplatePackageRequest): unknown;
    fromPartial<I extends {
        packageId?: string | undefined;
        templateId?: string | undefined;
    } & {
        packageId?: string | undefined;
        templateId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "packageId" | "templateId">]: never; }>(object: I): JoinTemplatePackageRequest;
};
export declare const JoinTemplatePackageResponse: {
    $type: "join.JoinTemplatePackageResponse";
    fromJSON(object: any): JoinTemplatePackageResponse;
    toJSON(message: JoinTemplatePackageResponse): unknown;
    fromPartial<I extends {
        template?: {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } | undefined;
        package?: {
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
        package?: ({
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
            } & { [K_1 in Exclude<keyof I["package"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_2 in Exclude<keyof I["package"]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_3 in Exclude<keyof I["package"], "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "template" | "$type" | "package">]: never; }>(object: I): JoinTemplatePackageResponse;
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
