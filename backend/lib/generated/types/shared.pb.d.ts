export declare const protobufPackage = "shared";
/**
 * Allowed monetary currencies.
 * Next Id: 1
 */
export declare enum Currency {
    USD = "USD",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function currencyFromJSON(object: any): Currency;
export declare function currencyToJSON(object: Currency): string;
/**
 * The price of a product
 * Next Id: 4
 */
export interface Price {
    $type: "shared.Price";
    readonly date: Date | undefined;
    readonly amount: number;
    readonly currency: Currency;
}
export declare const Price: {
    $type: "shared.Price";
    fromJSON(object: any): Price;
    toJSON(message: Price): unknown;
    fromPartial<I extends {
        currency?: Currency | undefined;
        date?: Date | undefined;
        amount?: number | undefined;
    } & {
        currency?: Currency | undefined;
        date?: Date | undefined;
        amount?: number | undefined;
    } & { [K in Exclude<keyof I, "currency" | "date" | "$type" | "amount">]: never; }>(object: I): Price;
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
