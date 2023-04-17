/* eslint-disable */
import { CoreDefinition } from "../../catalog/core-definition/core-definition.pb";
import { Company } from "../../catalog/distribution/company.pb";
import { OpenDefinition } from "../../catalog/open-definition/open-definition.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { Client } from "../client/client.pb";
import { JobRole } from "../job-role/job-role.pb";
import { Root } from "./root.pb";

export const protobufPackage = "account.root";

/**
 * Used for fetching a single root.
 * Next Id: 7
 */
export interface GetRootResponse {
  $type: "account.root.GetRootResponse";
  readonly root: Root | undefined;
  readonly clients: readonly Client[];
  readonly jobRoles: readonly JobRole[];
  readonly openDefinitions: readonly OpenDefinition[];
  readonly coreDefinitions: readonly CoreDefinition[];
  readonly companies: readonly Company[];
}

function createBaseGetRootResponse(): GetRootResponse {
  return {
    $type: "account.root.GetRootResponse",
    root: undefined,
    clients: [],
    jobRoles: [],
    openDefinitions: [],
    coreDefinitions: [],
    companies: [],
  };
}

export const GetRootResponse = {
  $type: "account.root.GetRootResponse" as const,

  fromJSON(object: any): GetRootResponse {
    return {
      $type: GetRootResponse.$type,
      root: isSet(object.root) ? Root.fromJSON(object.root) : undefined,
      clients: Array.isArray(object?.clients) ? object.clients.map((e: any) => Client.fromJSON(e)) : [],
      jobRoles: Array.isArray(object?.jobRoles) ? object.jobRoles.map((e: any) => JobRole.fromJSON(e)) : [],
      openDefinitions: Array.isArray(object?.openDefinitions)
        ? object.openDefinitions.map((e: any) => OpenDefinition.fromJSON(e))
        : [],
      coreDefinitions: Array.isArray(object?.coreDefinitions)
        ? object.coreDefinitions.map((e: any) => CoreDefinition.fromJSON(e))
        : [],
      companies: Array.isArray(object?.companies) ? object.companies.map((e: any) => Company.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetRootResponse): unknown {
    const obj: any = {};
    message.root !== undefined && (obj.root = message.root ? Root.toJSON(message.root) : undefined);
    if (message.clients) {
      obj.clients = message.clients.map((e) => e ? Client.toJSON(e) : undefined);
    } else {
      obj.clients = [];
    }
    if (message.jobRoles) {
      obj.jobRoles = message.jobRoles.map((e) => e ? JobRole.toJSON(e) : undefined);
    } else {
      obj.jobRoles = [];
    }
    if (message.openDefinitions) {
      obj.openDefinitions = message.openDefinitions.map((e) => e ? OpenDefinition.toJSON(e) : undefined);
    } else {
      obj.openDefinitions = [];
    }
    if (message.coreDefinitions) {
      obj.coreDefinitions = message.coreDefinitions.map((e) => e ? CoreDefinition.toJSON(e) : undefined);
    } else {
      obj.coreDefinitions = [];
    }
    if (message.companies) {
      obj.companies = message.companies.map((e) => e ? Company.toJSON(e) : undefined);
    } else {
      obj.companies = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRootResponse>, I>>(object: I): GetRootResponse {
    const message = createBaseGetRootResponse() as any;
    message.root = (object.root !== undefined && object.root !== null) ? Root.fromPartial(object.root) : undefined;
    message.clients = object.clients?.map((e) => Client.fromPartial(e)) || [];
    message.jobRoles = object.jobRoles?.map((e) => JobRole.fromPartial(e)) || [];
    message.openDefinitions = object.openDefinitions?.map((e) => OpenDefinition.fromPartial(e)) || [];
    message.coreDefinitions = object.coreDefinitions?.map((e) => CoreDefinition.fromPartial(e)) || [];
    message.companies = object.companies?.map((e) => Company.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetRootResponse.$type, GetRootResponse);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
