import { Team } from "../account/team/team.pb";
import { Target } from "../operation/target/target.pb";
export declare const protobufPackage = "join";
/** Next Id: 3 */
export interface JoinTargetTeamRequest {
    $type: "join.JoinTargetTeamRequest";
    readonly targetId: string;
    readonly teamId: string;
}
/** Next Id: 3 */
export interface JoinTargetTeamResponse {
    $type: "join.JoinTargetTeamResponse";
    readonly target: Target | undefined;
    readonly team: Team | undefined;
}
export declare const JoinTargetTeamRequest: {
    $type: "join.JoinTargetTeamRequest";
    fromJSON(object: any): JoinTargetTeamRequest;
    toJSON(message: JoinTargetTeamRequest): unknown;
    fromPartial<I extends {
        teamId?: string | undefined;
        targetId?: string | undefined;
    } & {
        teamId?: string | undefined;
        targetId?: string | undefined;
    } & { [K in Exclude<keyof I, "$type" | "teamId" | "targetId">]: never; }>(object: I): JoinTargetTeamRequest;
};
export declare const JoinTargetTeamResponse: {
    $type: "join.JoinTargetTeamResponse";
    fromJSON(object: any): JoinTargetTeamResponse;
    toJSON(message: JoinTargetTeamResponse): unknown;
    fromPartial<I extends {
        target?: {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        team?: {
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
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
        team?: ({
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            } & {
                clientId?: string | undefined;
                $case: "clientId";
            } & { [K_1 in Exclude<keyof I["team"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            } & {
                teamId?: string | undefined;
                $case: "teamId";
            } & { [K_2 in Exclude<keyof I["team"]["parent"], "$type" | "$case" | "teamId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_3 in Exclude<keyof I["team"], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "target" | "$type" | "team">]: never; }>(object: I): JoinTargetTeamResponse;
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
