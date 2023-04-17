import { User } from "../../account/user/user.pb";
import { Proposal } from "./proposal.pb";
import { ProposalReview, ProposalReview_Status } from "./review.pb";
export declare const protobufPackage = "trail.proposal";
/** Used for POST, PUT, and PATCH. */
export interface WriteProposalReviewRequest {
    $type: "trail.proposal.WriteProposalReviewRequest";
    readonly proposalId: string | undefined;
    readonly status: ProposalReview_Status;
    readonly note: string | undefined;
}
/** Used for fetching a single item. */
export interface GetProposalReviewResponse {
    $type: "trail.proposal.GetProposalReviewResponse";
    readonly proposalReview: ProposalReview | undefined;
    readonly proposal: Proposal | undefined;
    readonly creator: User | undefined;
}
/** Used for Listing items. */
export interface ListProposalReviewResponse {
    $type: "trail.proposal.ListProposalReviewResponse";
    readonly proposalReviews: readonly ProposalReview[];
    readonly creators: readonly User[];
    readonly matchCount: number;
}
export declare const WriteProposalReviewRequest: {
    $type: "trail.proposal.WriteProposalReviewRequest";
    fromJSON(object: any): WriteProposalReviewRequest;
    toJSON(message: WriteProposalReviewRequest): unknown;
    fromPartial<I extends {
        status?: ProposalReview_Status | undefined;
        proposalId?: string | undefined;
        note?: string | undefined;
    } & {
        status?: ProposalReview_Status | undefined;
        proposalId?: string | undefined;
        note?: string | undefined;
    } & { [K in Exclude<keyof I, "status" | "$type" | "proposalId" | "note">]: never; }>(object: I): WriteProposalReviewRequest;
};
export declare const GetProposalReviewResponse: {
    $type: "trail.proposal.GetProposalReviewResponse";
    fromJSON(object: any): GetProposalReviewResponse;
    toJSON(message: GetProposalReviewResponse): unknown;
    fromPartial<I extends {
        proposal?: {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            diagramXml?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
        } | undefined;
        proposalReview?: {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            note?: string | undefined;
        } | undefined;
        creator?: {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } | undefined;
    } & {
        proposal?: ({
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            diagramXml?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            diagramXml?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
        } & { [K in Exclude<keyof I["proposal"], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "diagramXml" | "deletedAt" | "createdBy">]: never; }) | undefined;
        proposalReview?: ({
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            note?: string | undefined;
        } & {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            note?: string | undefined;
        } & { [K_1 in Exclude<keyof I["proposalReview"], "id" | "status" | "createdAt" | "$type" | "updatedAt" | "proposalId" | "deletedAt" | "createdBy" | "note">]: never; }) | undefined;
        creator?: ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K_2 in Exclude<keyof I["creator"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "$type" | "proposal" | "proposalReview" | "creator">]: never; }>(object: I): GetProposalReviewResponse;
};
export declare const ListProposalReviewResponse: {
    $type: "trail.proposal.ListProposalReviewResponse";
    fromJSON(object: any): ListProposalReviewResponse;
    toJSON(message: ListProposalReviewResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        proposalReviews?: readonly {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            note?: string | undefined;
        }[] | undefined;
        creators?: readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        proposalReviews?: (readonly {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            note?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            note?: string | undefined;
        } & {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            note?: string | undefined;
        } & { [K in Exclude<keyof I["proposalReviews"][number], "id" | "status" | "createdAt" | "$type" | "updatedAt" | "proposalId" | "deletedAt" | "createdBy" | "note">]: never; })[] & { [K_1 in Exclude<keyof I["proposalReviews"], "$type" | keyof readonly {
            id?: string | undefined;
            status?: ProposalReview_Status | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            proposalId?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
            note?: string | undefined;
        }[]>]: never; }) | undefined;
        creators?: (readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K_2 in Exclude<keyof I["creators"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_3 in Exclude<keyof I["creators"], "$type" | keyof readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "$type" | "matchCount" | "proposalReviews" | "creators">]: never; }>(object: I): ListProposalReviewResponse;
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
