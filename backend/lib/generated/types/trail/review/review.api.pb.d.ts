import { User } from "../../account/user/user.pb";
import { ProposalReview, ProposalReview_Status } from "./review.pb";
export declare const protobufPackage = "trail.review";
/** Used for POST, PUT, and PATCH. */
export interface WriteProposalReviewRequest {
    $type: "trail.review.WriteProposalReviewRequest";
    readonly proposalId: string | undefined;
    readonly status: ProposalReview_Status;
}
/** Used for fetching a single item. */
export interface GetProposalReviewResponse {
    $type: "trail.review.GetProposalReviewResponse";
    readonly proposalReview: ProposalReview | undefined;
    readonly user: User | undefined;
}
/** Used for Listing items. */
export interface ListProposalReviewResponse {
    $type: "trail.review.ListProposalReviewResponse";
    readonly proposalReviews: readonly ProposalReview[];
    readonly matchCount: number;
}
export declare const WriteProposalReviewRequest: {
    $type: "trail.review.WriteProposalReviewRequest";
    fromJSON(object: any): WriteProposalReviewRequest;
    toJSON(message: WriteProposalReviewRequest): unknown;
    fromPartial<I extends {
        status?: ProposalReview_Status | undefined;
        proposalId?: string | undefined;
    } & {
        status?: ProposalReview_Status | undefined;
        proposalId?: string | undefined;
    } & { [K in Exclude<keyof I, "status" | "$type" | "proposalId">]: never; }>(object: I): WriteProposalReviewRequest;
};
export declare const GetProposalReviewResponse: {
    $type: "trail.review.GetProposalReviewResponse";
    fromJSON(object: any): GetProposalReviewResponse;
    toJSON(message: GetProposalReviewResponse): unknown;
    fromPartial<I extends {
        user?: {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            birthMonth?: number | undefined;
            birthDay?: number | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } | undefined;
        proposalReview?: {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
        } | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            birthMonth?: number | undefined;
            birthDay?: number | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            birthMonth?: number | undefined;
            birthDay?: number | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K in Exclude<keyof I["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "birthMonth" | "birthDay" | "role" | "teamId">]: never; }) | undefined;
        proposalReview?: ({
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
        } & { [K_1 in Exclude<keyof I["proposalReview"], "id" | "status" | "createdAt" | "$type" | "updatedAt" | "userId" | "proposalId" | "deletedAt">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "user" | "$type" | "proposalReview">]: never; }>(object: I): GetProposalReviewResponse;
};
export declare const ListProposalReviewResponse: {
    $type: "trail.review.ListProposalReviewResponse";
    fromJSON(object: any): ListProposalReviewResponse;
    toJSON(message: ListProposalReviewResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        proposalReviews?: readonly {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        proposalReviews?: (readonly {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["proposalReviews"][number], "id" | "status" | "createdAt" | "$type" | "updatedAt" | "userId" | "proposalId" | "deletedAt">]: never; })[] & { [K_1 in Exclude<keyof I["proposalReviews"], "$type" | keyof readonly {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            userId?: string | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "proposalReviews">]: never; }>(object: I): ListProposalReviewResponse;
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
