import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "account";
/** Company onboarded with Dimetrail. */
export interface Client {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    name: string | undefined;
}
/** The position of an employee in their company. */
export interface JobRole {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    name: string | undefined;
    client: Client | undefined;
}
/** Group of teams. */
export interface Org {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    name: string | undefined;
    client: Client | undefined;
}
/** Group of employees. */
export interface Team {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    name: string | undefined;
    org: Org | undefined;
}
/** Individual employee associated to a Dimetrail account. */
export interface Employee {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    birthMonth: number | undefined;
    email: string | undefined;
}
export declare const Client: {
    encode(message: Client, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Client;
    fromJSON(object: any): Client;
    toJSON(message: Client): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Client>]: never; }>(object: I): Client;
};
export declare const JobRole: {
    encode(message: JobRole, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JobRole;
    fromJSON(object: any): JobRole;
    toJSON(message: JobRole): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        client?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        client?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
        } & { [K in Exclude<keyof I["client"], keyof Client>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof JobRole>]: never; }>(object: I): JobRole;
};
export declare const Org: {
    encode(message: Org, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Org;
    fromJSON(object: any): Org;
    toJSON(message: Org): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        client?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        client?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
        } & { [K in Exclude<keyof I["client"], keyof Client>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Org>]: never; }>(object: I): Org;
};
export declare const Team: {
    encode(message: Team, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Team;
    fromJSON(object: any): Team;
    toJSON(message: Team): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        org?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            client?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                updatedAt?: Date | undefined;
                name?: string | undefined;
            } | undefined;
        } | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        org?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            client?: {
                id?: string | undefined;
                createdAt?: Date | undefined;
                updatedAt?: Date | undefined;
                name?: string | undefined;
            } | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            name?: string | undefined;
            client?: ({
                id?: string | undefined;
                createdAt?: Date | undefined;
                updatedAt?: Date | undefined;
                name?: string | undefined;
            } & {
                id?: string | undefined;
                createdAt?: Date | undefined;
                updatedAt?: Date | undefined;
                name?: string | undefined;
            } & { [K in Exclude<keyof I["org"]["client"], keyof Client>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["org"], keyof Org>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof Team>]: never; }>(object: I): Team;
};
export declare const Employee: {
    encode(message: Employee, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Employee;
    fromJSON(object: any): Employee;
    toJSON(message: Employee): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        birthMonth?: number | undefined;
        email?: string | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        birthMonth?: number | undefined;
        email?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Employee>]: never; }>(object: I): Employee;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
