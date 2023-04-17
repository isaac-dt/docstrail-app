export declare const protobufPackage = "operation.item";
/**
 * An item which is delivered via an order.
 * Next Id: 7
 */
export interface DeliveryItem {
    $type: "operation.item.DeliveryItem";
    readonly id: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly quantity: number | undefined;
    readonly productId: string;
    readonly orderId: string;
}
export declare const DeliveryItem: {
    $type: "operation.item.DeliveryItem";
    fromJSON(object: any): DeliveryItem;
    toJSON(message: DeliveryItem): unknown;
    fromPartial<I extends {
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
    } & { [K in Exclude<keyof I, "id" | "createdAt" | "$type" | "updatedAt" | "productId" | "quantity" | "orderId">]: never; }>(object: I): DeliveryItem;
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
