/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { Company } from "./company.pb";
import { DistributionOutlet } from "./distribution.pb";

export const protobufPackage = "catalog.distribution";

/** Next Id: 4 */
export interface WriteCompanyRequest {
  $type: "catalog.distribution.WriteCompanyRequest";
  readonly rootId: string | undefined;
  readonly legalName: string | undefined;
  readonly webAddress: string | undefined;
}

/** Next Id: 3 */
export interface GetCompanyResponse {
  $type: "catalog.distribution.GetCompanyResponse";
  readonly company: Company | undefined;
  readonly distributionOutlets: readonly DistributionOutlet[];
}

/** Next Id: 3 */
export interface ListCompanyResponse {
  $type: "catalog.distribution.ListCompanyResponse";
  readonly companies: readonly Company[];
  readonly matchCount: number;
}

function createBaseWriteCompanyRequest(): WriteCompanyRequest {
  return {
    $type: "catalog.distribution.WriteCompanyRequest",
    rootId: undefined,
    legalName: undefined,
    webAddress: undefined,
  };
}

export const WriteCompanyRequest = {
  $type: "catalog.distribution.WriteCompanyRequest" as const,

  fromJSON(object: any): WriteCompanyRequest {
    return {
      $type: WriteCompanyRequest.$type,
      rootId: isSet(object.rootId) ? String(object.rootId) : undefined,
      legalName: isSet(object.legalName) ? String(object.legalName) : undefined,
      webAddress: isSet(object.webAddress) ? String(object.webAddress) : undefined,
    };
  },

  toJSON(message: WriteCompanyRequest): unknown {
    const obj: any = {};
    message.rootId !== undefined && (obj.rootId = message.rootId);
    message.legalName !== undefined && (obj.legalName = message.legalName);
    message.webAddress !== undefined && (obj.webAddress = message.webAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteCompanyRequest>, I>>(object: I): WriteCompanyRequest {
    const message = createBaseWriteCompanyRequest() as any;
    message.rootId = object.rootId ?? undefined;
    message.legalName = object.legalName ?? undefined;
    message.webAddress = object.webAddress ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteCompanyRequest.$type, WriteCompanyRequest);

function createBaseGetCompanyResponse(): GetCompanyResponse {
  return { $type: "catalog.distribution.GetCompanyResponse", company: undefined, distributionOutlets: [] };
}

export const GetCompanyResponse = {
  $type: "catalog.distribution.GetCompanyResponse" as const,

  fromJSON(object: any): GetCompanyResponse {
    return {
      $type: GetCompanyResponse.$type,
      company: isSet(object.company) ? Company.fromJSON(object.company) : undefined,
      distributionOutlets: Array.isArray(object?.distributionOutlets)
        ? object.distributionOutlets.map((e: any) => DistributionOutlet.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetCompanyResponse): unknown {
    const obj: any = {};
    message.company !== undefined && (obj.company = message.company ? Company.toJSON(message.company) : undefined);
    if (message.distributionOutlets) {
      obj.distributionOutlets = message.distributionOutlets.map((e) => e ? DistributionOutlet.toJSON(e) : undefined);
    } else {
      obj.distributionOutlets = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCompanyResponse>, I>>(object: I): GetCompanyResponse {
    const message = createBaseGetCompanyResponse() as any;
    message.company = (object.company !== undefined && object.company !== null)
      ? Company.fromPartial(object.company)
      : undefined;
    message.distributionOutlets = object.distributionOutlets?.map((e) => DistributionOutlet.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetCompanyResponse.$type, GetCompanyResponse);

function createBaseListCompanyResponse(): ListCompanyResponse {
  return { $type: "catalog.distribution.ListCompanyResponse", companies: [], matchCount: 0 };
}

export const ListCompanyResponse = {
  $type: "catalog.distribution.ListCompanyResponse" as const,

  fromJSON(object: any): ListCompanyResponse {
    return {
      $type: ListCompanyResponse.$type,
      companies: Array.isArray(object?.companies) ? object.companies.map((e: any) => Company.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListCompanyResponse): unknown {
    const obj: any = {};
    if (message.companies) {
      obj.companies = message.companies.map((e) => e ? Company.toJSON(e) : undefined);
    } else {
      obj.companies = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCompanyResponse>, I>>(object: I): ListCompanyResponse {
    const message = createBaseListCompanyResponse() as any;
    message.companies = object.companies?.map((e) => Company.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListCompanyResponse.$type, ListCompanyResponse);

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
