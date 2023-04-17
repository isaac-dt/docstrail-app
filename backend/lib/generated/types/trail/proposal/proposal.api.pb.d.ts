import { User } from "../../account/user/user.pb";
import { Permission, PermissionOp } from "../../permission.pb";
import { Proposal } from "./proposal.pb";
export declare const protobufPackage = "trail.proposal";
/** Used for POST, PUT, and PATCH. */
export interface WriteProposalRequest {
    $type: "trail.proposal.WriteProposalRequest";
    readonly name: string | undefined;
    readonly diagramXml: string | undefined;
}
/** Used for fetching a single item. */
export interface GetProposalResponse {
    $type: "trail.proposal.GetProposalResponse";
    readonly proposal: Proposal | undefined;
    readonly allPermissionsOnProposal: readonly ProposalPermission[];
}
/** Used to fetch the response after sharing a proposal. */
export interface WriteShareProposalRequest {
    $type: "trail.proposal.WriteShareProposalRequest";
    readonly accessorEmail: string | undefined;
    readonly proposalId: string | undefined;
    readonly operation: PermissionOp;
}
/** Used to fetch the response after sharing a proposal. */
export interface GetShareProposalResponse {
    $type: "trail.proposal.GetShareProposalResponse";
    readonly accessor: User | undefined;
    readonly permission: Permission | undefined;
}
/** Used for Listing items. */
export interface ListProposalResponse {
    $type: "trail.proposal.ListProposalResponse";
    readonly proposals: readonly Proposal[];
    readonly requestorPermissionsOnProposals: readonly ProposalPermission[];
    readonly matchCount: number;
}
/** Permissions associated to an item. */
export interface ProposalPermission {
    $type: "trail.proposal.ProposalPermission";
    readonly proposalId: string | undefined;
    readonly user: User | undefined;
    readonly permission: Permission | undefined;
}
export declare const WriteProposalRequest: {
    $type: "trail.proposal.WriteProposalRequest";
    fromJSON(object: any): WriteProposalRequest;
    toJSON(message: WriteProposalRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        diagramXml?: string | undefined;
    } & {
        name?: string | undefined;
        diagramXml?: string | undefined;
    } & { [K in Exclude<keyof I, "name" | "$type" | "diagramXml">]: never; }>(object: I): WriteProposalRequest;
};
export declare const GetProposalResponse: {
    $type: "trail.proposal.GetProposalResponse";
    fromJSON(object: any): GetProposalResponse;
    toJSON(message: GetProposalResponse): unknown;
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
        allPermissionsOnProposal?: readonly {
            user?: {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } | undefined;
            permission?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } | undefined;
            proposalId?: string | undefined;
        }[] | undefined;
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
        allPermissionsOnProposal?: (readonly {
            user?: {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } | undefined;
            permission?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } | undefined;
            proposalId?: string | undefined;
        }[] & readonly ({
            user?: {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } | undefined;
            permission?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } | undefined;
            proposalId?: string | undefined;
        } & {
            user?: ({
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
            } & { [K_1 in Exclude<keyof I["allPermissionsOnProposal"][number]["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
            permission?: ({
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } & {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } & { [K_2 in Exclude<keyof I["allPermissionsOnProposal"][number]["permission"], "id" | "createdAt" | "$type" | "accessorId" | "resourceId" | "accessor" | "resource" | "operation" | "updatedAt">]: never; }) | undefined;
            proposalId?: string | undefined;
        } & { [K_3 in Exclude<keyof I["allPermissionsOnProposal"][number], "user" | "$type" | "permission" | "proposalId">]: never; })[] & { [K_4 in Exclude<keyof I["allPermissionsOnProposal"], "$type" | keyof readonly {
            user?: {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } | undefined;
            permission?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } | undefined;
            proposalId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, "$type" | "proposal" | "allPermissionsOnProposal">]: never; }>(object: I): GetProposalResponse;
};
export declare const WriteShareProposalRequest: {
    $type: "trail.proposal.WriteShareProposalRequest";
    fromJSON(object: any): WriteShareProposalRequest;
    toJSON(message: WriteShareProposalRequest): unknown;
    fromPartial<I extends {
        operation?: PermissionOp | undefined;
        accessorEmail?: string | undefined;
        proposalId?: string | undefined;
    } & {
        operation?: PermissionOp | undefined;
        accessorEmail?: string | undefined;
        proposalId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "operation" | "accessorEmail" | "proposalId">]: never; }>(object: I): WriteShareProposalRequest;
};
export declare const GetShareProposalResponse: {
    $type: "trail.proposal.GetShareProposalResponse";
    fromJSON(object: any): GetShareProposalResponse;
    toJSON(message: GetShareProposalResponse): unknown;
    fromPartial<I extends {
        permission?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: import("../../permission.pb").DBEntity | undefined;
            resource?: import("../../permission.pb").DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        accessor?: {
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
        permission?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: import("../../permission.pb").DBEntity | undefined;
            resource?: import("../../permission.pb").DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: import("../../permission.pb").DBEntity | undefined;
            resource?: import("../../permission.pb").DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["permission"], "id" | "createdAt" | "$type" | "accessorId" | "resourceId" | "accessor" | "resource" | "operation" | "updatedAt">]: never; }) | undefined;
        accessor?: ({
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
        } & { [K_1 in Exclude<keyof I["accessor"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "permission" | "accessor">]: never; }>(object: I): GetShareProposalResponse;
};
export declare const ListProposalResponse: {
    $type: "trail.proposal.ListProposalResponse";
    fromJSON(object: any): ListProposalResponse;
    toJSON(message: ListProposalResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        proposals?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            diagramXml?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
        }[] | undefined;
        requestorPermissionsOnProposals?: readonly {
            user?: {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } | undefined;
            permission?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } | undefined;
            proposalId?: string | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        proposals?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            diagramXml?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["proposals"][number], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "diagramXml" | "deletedAt" | "createdBy">]: never; })[] & { [K_1 in Exclude<keyof I["proposals"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            diagramXml?: string | undefined;
            deletedAt?: Date | undefined;
            createdBy?: string | undefined;
        }[]>]: never; }) | undefined;
        requestorPermissionsOnProposals?: (readonly {
            user?: {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } | undefined;
            permission?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } | undefined;
            proposalId?: string | undefined;
        }[] & readonly ({
            user?: {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } | undefined;
            permission?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } | undefined;
            proposalId?: string | undefined;
        } & {
            user?: ({
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
            } & { [K_2 in Exclude<keyof I["requestorPermissionsOnProposals"][number]["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
            permission?: ({
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } & {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } & { [K_3 in Exclude<keyof I["requestorPermissionsOnProposals"][number]["permission"], "id" | "createdAt" | "$type" | "accessorId" | "resourceId" | "accessor" | "resource" | "operation" | "updatedAt">]: never; }) | undefined;
            proposalId?: string | undefined;
        } & { [K_4 in Exclude<keyof I["requestorPermissionsOnProposals"][number], "user" | "$type" | "permission" | "proposalId">]: never; })[] & { [K_5 in Exclude<keyof I["requestorPermissionsOnProposals"], "$type" | keyof readonly {
            user?: {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } | undefined;
            permission?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                accessorId?: string | undefined;
                resourceId?: string | undefined;
                accessor?: import("../../permission.pb").DBEntity | undefined;
                resource?: import("../../permission.pb").DBEntity | undefined;
                operation?: PermissionOp | undefined;
                updatedAt?: Date | undefined;
            } | undefined;
            proposalId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "$type" | "matchCount" | "proposals" | "requestorPermissionsOnProposals">]: never; }>(object: I): ListProposalResponse;
};
export declare const ProposalPermission: {
    $type: "trail.proposal.ProposalPermission";
    fromJSON(object: any): ProposalPermission;
    toJSON(message: ProposalPermission): unknown;
    fromPartial<I extends {
        user?: {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } | undefined;
        permission?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: import("../../permission.pb").DBEntity | undefined;
            resource?: import("../../permission.pb").DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        proposalId?: string | undefined;
    } & {
        user?: ({
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
        } & { [K in Exclude<keyof I["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
        permission?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: import("../../permission.pb").DBEntity | undefined;
            resource?: import("../../permission.pb").DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: import("../../permission.pb").DBEntity | undefined;
            resource?: import("../../permission.pb").DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } & { [K_1 in Exclude<keyof I["permission"], "id" | "createdAt" | "$type" | "accessorId" | "resourceId" | "accessor" | "resource" | "operation" | "updatedAt">]: never; }) | undefined;
        proposalId?: string | undefined;
    } & { [K_2 in Exclude<keyof I, "user" | "$type" | "permission" | "proposalId">]: never; }>(object: I): ProposalPermission;
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
