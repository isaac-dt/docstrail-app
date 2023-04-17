export declare const protobufPackage = "trail.review";
/** Proposal review. */
export interface ProposalReview {
    $type: "trail.review.ProposalReview";
    readonly id: string | undefined;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly deletedAt: Date | undefined;
    readonly proposalId: string | undefined;
    readonly userId: string | undefined;
    readonly status: ProposalReview_Status;
}
export declare enum ProposalReview_Status {
    UNKNOWN_TYPE = "UNKNOWN_TYPE",
    PENDING = "PENDING",
    HOLD = "HOLD",
    LGTM = "LGTM",
    END_REVIEW = "END_REVIEW",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function proposalReview_StatusFromJSON(object: any): ProposalReview_Status;
export declare function proposalReview_StatusToJSON(object: ProposalReview_Status): string;
export declare const ProposalReview: {
    $type: "trail.review.ProposalReview";
    fromJSON(object: any): ProposalReview;
    toJSON(message: ProposalReview): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        status?: ProposalReview_Status | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        userId?: string | undefined;
        proposalId?: string | undefined;
        deletedAt?: Date | undefined;
    } & {
        id?: string | undefined;
        status?: ProposalReview_Status | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        userId?: string | undefined;
        proposalId?: string | undefined;
        deletedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, "id" | "status" | "createdAt" | "$type" | "updatedAt" | "userId" | "proposalId" | "deletedAt">]: never; }>(object: I): ProposalReview;
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
