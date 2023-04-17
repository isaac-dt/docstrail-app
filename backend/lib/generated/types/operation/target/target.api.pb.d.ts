import { Client } from "../../account/client/client.pb";
import { JobRole } from "../../account/job-role/job-role.pb";
import { Team } from "../../account/team/team.pb";
import { User } from "../../account/user/user.pb";
import { Template } from "../template/template.pb";
import { Target } from "./target.pb";
export declare const protobufPackage = "operation.target";
/** Next Id: 3 */
export interface WriteTargetRequest {
    $type: "operation.target.WriteTargetRequest";
    readonly name: string | undefined;
    readonly clientId: string | undefined;
}
/** Next Id: 8 */
export interface GetTargetResponse {
    $type: "operation.target.GetTargetResponse";
    readonly target: Target | undefined;
    readonly client: Client | undefined;
    readonly templates: readonly Template[];
    readonly teams: readonly Team[];
    readonly jobRoles: readonly JobRole[];
    /** Users directly added to the target. */
    readonly directUsers: readonly User[];
    /** Includes directly added users and the ones extracted from teams and job roles. */
    readonly finalUserSet: readonly User[];
}
/** Next Id: 3 */
export interface ListTargetResponse {
    $type: "operation.target.ListTargetResponse";
    readonly targets: readonly Target[];
    readonly matchCount: number;
}
export declare const WriteTargetRequest: {
    $type: "operation.target.WriteTargetRequest";
    fromJSON(object: any): WriteTargetRequest;
    toJSON(message: WriteTargetRequest): unknown;
    fromPartial<I extends {
        name?: string | undefined;
        clientId?: string | undefined;
    } & {
        name?: string | undefined;
        clientId?: string | undefined;
    } & { [K in Exclude<keyof I, "name" | "clientId" | "$type">]: never; }>(object: I): WriteTargetRequest;
};
export declare const GetTargetResponse: {
    $type: "operation.target.GetTargetResponse";
    fromJSON(object: any): GetTargetResponse;
    toJSON(message: GetTargetResponse): unknown;
    fromPartial<I extends {
        target?: {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
        client?: {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } | undefined;
        jobRoles?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
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
        templates?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[] | undefined;
        directUsers?: readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[] | undefined;
        finalUserSet?: readonly {
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
        client?: ({
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            rootId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["client"], "id" | "name" | "createdAt" | "$type" | "updatedAt" | "rootId">]: never; }) | undefined;
        jobRoles?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
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
                rootId?: string | undefined;
            } & {
                $case: "rootId";
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
            } & { [K_2 in Exclude<keyof I["jobRoles"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            } & {
                rootId?: string | undefined;
                $case: "rootId";
            } & { [K_3 in Exclude<keyof I["jobRoles"][number]["parent"], "$type" | "$case" | "rootId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_4 in Exclude<keyof I["jobRoles"][number], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_5 in Exclude<keyof I["jobRoles"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            parent?: ({
                clientId?: string | undefined;
            } & {
                $case: "clientId";
            }) | ({
                rootId?: string | undefined;
            } & {
                $case: "rootId";
            }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[]>]: never; }) | undefined;
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
            } & { [K_6 in Exclude<keyof I["teams"][number]["parent"], "clientId" | "$type" | "$case">]: never; }) | ({
                teamId?: string | undefined;
            } & {
                $case: "teamId";
            } & {
                teamId?: string | undefined;
                $case: "teamId";
            } & { [K_7 in Exclude<keyof I["teams"][number]["parent"], "$type" | "$case" | "teamId">]: never; }) | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_8 in Exclude<keyof I["teams"][number], "id" | "name" | "parent" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_9 in Exclude<keyof I["teams"], "$type" | keyof readonly {
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
        templates?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[] & readonly ({
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } & {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        } & { [K_10 in Exclude<keyof I["templates"][number], "id" | "name" | "description" | "createdAt" | "$type" | "updatedAt" | "bundleId">]: never; })[] & { [K_11 in Exclude<keyof I["templates"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            bundleId?: string | undefined;
        }[]>]: never; }) | undefined;
        directUsers?: (readonly {
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
        } & { [K_12 in Exclude<keyof I["directUsers"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_13 in Exclude<keyof I["directUsers"], "$type" | keyof readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
        finalUserSet?: (readonly {
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
        } & { [K_14 in Exclude<keyof I["finalUserSet"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_15 in Exclude<keyof I["finalUserSet"], "$type" | keyof readonly {
            id?: string | undefined;
            email?: string | undefined;
            photoUrl?: string | undefined;
            createdAt?: Date | undefined;
            fullName?: string | undefined;
            updatedAt?: Date | undefined;
            role?: import("../../account/user/user.pb").UserRole | undefined;
            teamId?: string | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_16 in Exclude<keyof I, "target" | "$type" | "client" | "jobRoles" | "teams" | "templates" | "directUsers" | "finalUserSet">]: never; }>(object: I): GetTargetResponse;
};
export declare const ListTargetResponse: {
    $type: "operation.target.ListTargetResponse";
    fromJSON(object: any): ListTargetResponse;
    toJSON(message: ListTargetResponse): unknown;
    fromPartial<I extends {
        matchCount?: number | undefined;
        targets?: readonly {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    } & {
        matchCount?: number | undefined;
        targets?: (readonly {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] & readonly ({
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
        } & { [K in Exclude<keyof I["targets"][number], "id" | "name" | "clientId" | "createdAt" | "$type" | "updatedAt">]: never; })[] & { [K_1 in Exclude<keyof I["targets"], "$type" | keyof readonly {
            id?: string | undefined;
            name?: string | undefined;
            clientId?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "$type" | "matchCount" | "targets">]: never; }>(object: I): ListTargetResponse;
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
