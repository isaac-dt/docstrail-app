import { User } from "../user/user.pb";
import { Team } from "./team.pb";
export declare const protobufPackage = "account.team";
/**
 * Used for POST, PUT, and PATCH.
 * Next Id: 4
 */
export interface WriteTeamRequest {
    $type: "account.team.WriteTeamRequest";
    readonly name: string | undefined;
    parent?: {
        $case: "clientId";
        clientId: string;
    } | {
        $case: "teamId";
        teamId: string;
    };
}
/**
 * Used for fetching a single team.
 * Next Id: 4
 */
export interface GetTeamResponse {
    $type: "account.team.GetTeamResponse";
    readonly team: Team | undefined;
    readonly childrenTeams: readonly Team[];
    readonly users: readonly User[];
}
/**
 * Used for Listing teams.
 * Next Id: 3
 */
export interface ListTeamResponse {
    $type: "account.team.ListTeamResponse";
    readonly teams: readonly Team[];
    readonly matchCount: number;
}
export declare const WriteTeamRequest: {
    $type: "account.team.WriteTeamRequest";
    fromJSON(object: any): WriteTeamRequest;
    toJSON(message: WriteTeamRequest): unknown;
    fromPartial<I extends {
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
    } & {
        name?: string | undefined;
        parent?: ({
            clientId?: string | undefined;
        } & {
            $case: "clientId";
        } & {
            clientId?: string | undefined;
            $case: "clientId";
        } & { [K in Exclude<keyof I["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
            teamId?: string | undefined;
        } & {
            $case: "teamId";
        } & {
            teamId?: string | undefined;
            $case: "teamId";
        } & { [K_1 in Exclude<keyof I["parent"], "$type" | "$case" | "teamId">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "name" | "parent" | "$type">]: never; }>(object: I): WriteTeamRequest;
};
export declare const GetTeamResponse: {
    $type: "account.team.GetTeamResponse";
    fromJSON(object: any): GetTeamResponse;
    toJSON(message: GetTeamResponse): unknown;
    fromPartial<I extends {
        users?: readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] | undefined;
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
        childrenTeams?: readonly {
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
        }[] | undefined;
    } & {
        users?: (readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        } & { [K in Exclude<keyof I["users"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_1 in Exclude<keyof I["users"], "$type" | keyof readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
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
            } & { [K_2 in Exclude<keyof I["team"]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            } & {
                teamId?: string | undefined;
                $case: "teamId";
            } & { [K_3 in Exclude<keyof I["team"]["parent"], "$type" | "$case" | "teamId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_4 in Exclude<keyof I["team"], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; }) | undefined;
        childrenTeams?: (readonly {
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
        }[] & readonly ({
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
            } & { [K_5 in Exclude<keyof I["childrenTeams"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            } & {
                teamId?: string | undefined;
                $case: "teamId";
            } & { [K_6 in Exclude<keyof I["childrenTeams"][number]["parent"], "$type" | "$case" | "teamId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_7 in Exclude<keyof I["childrenTeams"][number], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_8 in Exclude<keyof I["childrenTeams"], "$type" | keyof readonly {
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
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, "users" | "$type" | "team" | "childrenTeams">]: never; }>(object: I): GetTeamResponse;
};
export declare const ListTeamResponse: {
    $type: "account.team.ListTeamResponse";
    fromJSON(object: any): ListTeamResponse;
    toJSON(message: ListTeamResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        teams?: readonly {
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
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        teams?: (readonly {
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
        }[] & readonly ({
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
            } & { [K in Exclude<keyof I["teams"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            } & {
                teamId?: string | undefined;
                $case: "teamId";
            } & { [K_1 in Exclude<keyof I["teams"][number]["parent"], "$type" | "$case" | "teamId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_2 in Exclude<keyof I["teams"][number], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_3 in Exclude<keyof I["teams"], "$type" | keyof readonly {
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
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "$type" | "matchCount" | "teams">]: never; }>(object: I): ListTeamResponse;
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
