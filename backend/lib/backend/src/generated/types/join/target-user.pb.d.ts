import { User } from "../account/user/user.pb";
import { Target } from "../operation/target/target.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinTargetUserRequest {
    $type: "join.JoinTargetUserRequest";
    readonly targetId: string;
    readonly userId: string;
}
/** Next Id: 3 */
export interface JoinTargetUserResponse {
    $type: "join.JoinTargetUserResponse";
    readonly target: Target | undefined;
    readonly user: User | undefined;
}
export declare const JoinTargetUserRequest: {
    $type: "join.JoinTargetUserRequest";
    fromJSON(object: any): JoinTargetUserRequest;
    toJSON(message: JoinTargetUserRequest): unknown;
    fromPartial<I extends {
        userId?: string | undefined;
        targetId?: string | undefined;
    } & {
        userId?: string | undefined;
        targetId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "userId" | "targetId">]: never; }>(object: I): JoinTargetUserRequest;
};
export declare const JoinTargetUserResponse: {
    $type: "join.JoinTargetUserResponse";
    fromJSON(object: any): JoinTargetUserResponse;
    toJSON(message: JoinTargetUserResponse): unknown;
    fromPartial<I extends {
        target?: {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        user?: {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } | undefined;
    } & {
        target?: ({
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["target"], "id" | "name" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
        user?: ({
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
        } & { [K_1 in Exclude<keyof I["user"], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "target" | "user" | "$type">]: never; }>(object: I): JoinTargetUserResponse;
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
