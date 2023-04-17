export declare const protobufPackage = "catalog.open_definition";
/**
 * A full Description of an product and its attributes.
 * Example: "Shirt with the logo Company at the center" or "blue pen".
 * Next Id: 11
 */
export interface OpenDefinition {
    $type: "catalog.open_definition.OpenDefinition";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly name: string;
    readonly description: string;
    readonly imageUrl: string | undefined;
    parent?: {
        $case: "clientId";
        clientId: string;
    } | {
        $case: "rootId";
        rootId: string;
    };
    readonly coreDefinitionId: string;
    readonly isTangible: boolean;
}
export declare const OpenDefinition: {
    $type: "catalog.open_definition.OpenDefinition";
    fromJSON(object: any): OpenDefinition;
    toJSON(message: OpenDefinition): unknown;
    fromPartial<I extends {
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
        imageUrl?: string | undefined;
        coreDefinitionId?: string | undefined;
        isTangible?: boolean | undefined;
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
        } & { [K in Exclude<keyof I["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
            rootId?: string | undefined;
        } & {
            $case: "rootId";
        } & {
            rootId?: string | undefined;
            $case: "rootId";
        } & { [K_1 in Exclude<keyof I["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        imageUrl?: string | undefined;
        coreDefinitionId?: string | undefined;
        isTangible?: boolean | undefined;
    } & { [K_2 in Exclude<keyof I, "id" | "name" | "description" | "parent" | "createdAt" | "$type" | "updatedAt" | "imageUrl" | "coreDefinitionId" | "isTangible">]: never; }>(object: I): OpenDefinition;
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
