import { User } from "../account/user/user.pb";
export declare const protobufPackage = "trail";
/** Info of user associated to a proposal as a reviewer. */
export interface Peer {
    $type: "trail.Peer";
    readonly user: readonly User[];
    readonly roles: readonly Peer_Role[];
    readonly isManager: boolean;
    readonly isTechLead: boolean;
    /** Whether the user should provide permission to execute the proposal. */
    readonly shouldProvideApproval: boolean;
}
/** Role of the peer on the proposal. */
export declare enum Peer_Role {
    UNKNOWN_ROLE = "UNKNOWN_ROLE",
    OTHER_ROLE = "OTHER_ROLE",
    ENG = "ENG",
    UX = "UX",
    PRODUCT = "PRODUCT",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function peer_RoleFromJSON(object: any): Peer_Role;
export declare function peer_RoleToJSON(object: Peer_Role): string;
export declare const Peer: {
    $type: "trail.Peer";
    fromJSON(object: any): Peer;
    toJSON(message: Peer): unknown;
    fromPartial<I extends {
        user?: readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] | undefined;
        roles?: readonly Peer_Role[] | undefined;
        isManager?: boolean | undefined;
        isTechLead?: boolean | undefined;
        shouldProvideApproval?: boolean | undefined;
    } & {
        user?: (readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K in Exclude<keyof I["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_1 in Exclude<keyof I["user"], "$type" | keyof readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
        roles?: (readonly Peer_Role[] & readonly Peer_Role[] & { [K_2 in Exclude<keyof I["roles"], "$type" | keyof readonly Peer_Role[]>]: never; }) | undefined;
        isManager?: boolean | undefined;
        isTechLead?: boolean | undefined;
        shouldProvideApproval?: boolean | undefined;
    } & { [K_3 in Exclude<keyof I, "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; }>(object: I): Peer;
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
