export declare const protobufPackage = "catalog.core_definition";
/**
 * While OpenDefinition and CoreDefinition describe objects, ProductCategory categorizes objects.
 * Next Id: 7
 */
export declare enum CoreDefinitionCategory {
    OFFICE = "OFFICE",
    CLOTHING = "CLOTHING",
    FOOD = "FOOD",
    ELECTRONICS = "ELECTRONICS",
    E_GIFT = "E_GIFT",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function coreDefinitionCategoryFromJSON(object: any): CoreDefinitionCategory;
export declare function coreDefinitionCategoryToJSON(object: CoreDefinitionCategory): string;
/**
 * Abstraction of one or more OpenDefinition entries.
 * Every OpenDefinition must map to one CoreDefinition, which are set by system admins only.
 * Example: OpenDefinition("shirt with a freedom flag") maps to CoreDefinition("shirt with logo").
 * This entity lives at the root level.
 * A rule of thumb on what could be a Core Definition: anything we can build an inventory of.
 * Next Id: 8
 */
export interface CoreDefinition {
    $type: "catalog.core_definition.CoreDefinition";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly name: string;
    readonly description: string;
    readonly category: CoreDefinitionCategory;
    readonly rootId: string;
}
export declare const CoreDefinition: {
    $type: "catalog.core_definition.CoreDefinition";
    fromJSON(object: any): CoreDefinition;
    toJSON(message: CoreDefinition): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        createdAt?: Date | undefined;
        category?: CoreDefinitionCategory | undefined;
        updatedAt?: Date | undefined;
        rootId?: string | undefined;
    } & {
        id?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        createdAt?: Date | undefined;
        category?: CoreDefinitionCategory | undefined;
        updatedAt?: Date | undefined;
        rootId?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "name" | "description" | "createdAt" | "category" | "$type" | "updatedAt" | "rootId">]: never; }>(object: I): CoreDefinition;
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
