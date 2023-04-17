/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { CoreDefinition } from "../core-definition/core-definition.pb";
import { Product } from "../product/product.pb";
import { OutletAddress } from "./address.pb";
import { Company } from "./company.pb";
import {
  DistributionMethod,
  distributionMethodFromJSON,
  distributionMethodToJSON,
  DistributionOutlet,
} from "./distribution.pb";

export const protobufPackage = "catalog.distribution";

/** Next Id: 8 */
export interface WriteDistributionOutletRequest {
  $type: "catalog.distribution.WriteDistributionOutletRequest";
  name: string | undefined;
  companyId: string | undefined;
  physicalAddressId: string | undefined;
  webAddress: string | undefined;
  customerServicePhoneNumber: string | undefined;
  customerServiceEmail: string | undefined;
  distributionMethod: DistributionMethod;
}

/** Next Id: 7 */
export interface GetDistributionOutletResponse {
  $type: "catalog.distribution.GetDistributionOutletResponse";
  distributionOutlet: DistributionOutlet | undefined;
  company: Company | undefined;
  physicalAddress: OutletAddress | undefined;
  coreDefinitions: CoreDefinition[];
  products: Product[];
}

/** Next Id: 3 */
export interface ListDistributionOutletResponse {
  $type: "catalog.distribution.ListDistributionOutletResponse";
  distributionOutlets: DistributionOutlet[];
  matchCount: number;
}

function createBaseWriteDistributionOutletRequest(): WriteDistributionOutletRequest {
  return {
    $type: "catalog.distribution.WriteDistributionOutletRequest",
    name: undefined,
    companyId: undefined,
    physicalAddressId: undefined,
    webAddress: undefined,
    customerServicePhoneNumber: undefined,
    customerServiceEmail: undefined,
    distributionMethod: DistributionMethod.DELIVERY,
  };
}

export const WriteDistributionOutletRequest = {
  $type: "catalog.distribution.WriteDistributionOutletRequest" as const,

  fromJSON(object: any): WriteDistributionOutletRequest {
    return {
      $type: WriteDistributionOutletRequest.$type,
      name: isSet(object.name) ? String(object.name) : undefined,
      companyId: isSet(object.companyId) ? String(object.companyId) : undefined,
      physicalAddressId: isSet(object.physicalAddressId) ? String(object.physicalAddressId) : undefined,
      webAddress: isSet(object.webAddress) ? String(object.webAddress) : undefined,
      customerServicePhoneNumber: isSet(object.customerServicePhoneNumber)
        ? String(object.customerServicePhoneNumber)
        : undefined,
      customerServiceEmail: isSet(object.customerServiceEmail) ? String(object.customerServiceEmail) : undefined,
      distributionMethod: isSet(object.distributionMethod)
        ? distributionMethodFromJSON(object.distributionMethod)
        : DistributionMethod.DELIVERY,
    };
  },

  toJSON(message: WriteDistributionOutletRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.companyId !== undefined && (obj.companyId = message.companyId);
    message.physicalAddressId !== undefined && (obj.physicalAddressId = message.physicalAddressId);
    message.webAddress !== undefined && (obj.webAddress = message.webAddress);
    message.customerServicePhoneNumber !== undefined &&
      (obj.customerServicePhoneNumber = message.customerServicePhoneNumber);
    message.customerServiceEmail !== undefined && (obj.customerServiceEmail = message.customerServiceEmail);
    message.distributionMethod !== undefined &&
      (obj.distributionMethod = distributionMethodToJSON(message.distributionMethod));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteDistributionOutletRequest>, I>>(
    object: I,
  ): WriteDistributionOutletRequest {
    const message = createBaseWriteDistributionOutletRequest();
    message.name = object.name ?? undefined;
    message.companyId = object.companyId ?? undefined;
    message.physicalAddressId = object.physicalAddressId ?? undefined;
    message.webAddress = object.webAddress ?? undefined;
    message.customerServicePhoneNumber = object.customerServicePhoneNumber ?? undefined;
    message.customerServiceEmail = object.customerServiceEmail ?? undefined;
    message.distributionMethod = object.distributionMethod ?? DistributionMethod.DELIVERY;
    return message;
  },
};

messageTypeRegistry.set(WriteDistributionOutletRequest.$type, WriteDistributionOutletRequest);

function createBaseGetDistributionOutletResponse(): GetDistributionOutletResponse {
  return {
    $type: "catalog.distribution.GetDistributionOutletResponse",
    distributionOutlet: undefined,
    company: undefined,
    physicalAddress: undefined,
    coreDefinitions: [],
    products: [],
  };
}

export const GetDistributionOutletResponse = {
  $type: "catalog.distribution.GetDistributionOutletResponse" as const,

  fromJSON(object: any): GetDistributionOutletResponse {
    return {
      $type: GetDistributionOutletResponse.$type,
      distributionOutlet: isSet(object.distributionOutlet)
        ? DistributionOutlet.fromJSON(object.distributionOutlet)
        : undefined,
      company: isSet(object.company) ? Company.fromJSON(object.company) : undefined,
      physicalAddress: isSet(object.physicalAddress) ? OutletAddress.fromJSON(object.physicalAddress) : undefined,
      coreDefinitions: Array.isArray(object?.coreDefinitions)
        ? object.coreDefinitions.map((e: any) => CoreDefinition.fromJSON(e))
        : [],
      products: Array.isArray(object?.products) ? object.products.map((e: any) => Product.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetDistributionOutletResponse): unknown {
    const obj: any = {};
    message.distributionOutlet !== undefined && (obj.distributionOutlet = message.distributionOutlet
      ? DistributionOutlet.toJSON(message.distributionOutlet)
      : undefined);
    message.company !== undefined && (obj.company = message.company ? Company.toJSON(message.company) : undefined);
    message.physicalAddress !== undefined &&
      (obj.physicalAddress = message.physicalAddress ? OutletAddress.toJSON(message.physicalAddress) : undefined);
    if (message.coreDefinitions) {
      obj.coreDefinitions = message.coreDefinitions.map((e) => e ? CoreDefinition.toJSON(e) : undefined);
    } else {
      obj.coreDefinitions = [];
    }
    if (message.products) {
      obj.products = message.products.map((e) => e ? Product.toJSON(e) : undefined);
    } else {
      obj.products = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDistributionOutletResponse>, I>>(
    object: I,
  ): GetDistributionOutletResponse {
    const message = createBaseGetDistributionOutletResponse();
    message.distributionOutlet = (object.distributionOutlet !== undefined && object.distributionOutlet !== null)
      ? DistributionOutlet.fromPartial(object.distributionOutlet)
      : undefined;
    message.company = (object.company !== undefined && object.company !== null)
      ? Company.fromPartial(object.company)
      : undefined;
    message.physicalAddress = (object.physicalAddress !== undefined && object.physicalAddress !== null)
      ? OutletAddress.fromPartial(object.physicalAddress)
      : undefined;
    message.coreDefinitions = object.coreDefinitions?.map((e) => CoreDefinition.fromPartial(e)) || [];
    message.products = object.products?.map((e) => Product.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(GetDistributionOutletResponse.$type, GetDistributionOutletResponse);

function createBaseListDistributionOutletResponse(): ListDistributionOutletResponse {
  return { $type: "catalog.distribution.ListDistributionOutletResponse", distributionOutlets: [], matchCount: 0 };
}

export const ListDistributionOutletResponse = {
  $type: "catalog.distribution.ListDistributionOutletResponse" as const,

  fromJSON(object: any): ListDistributionOutletResponse {
    return {
      $type: ListDistributionOutletResponse.$type,
      distributionOutlets: Array.isArray(object?.distributionOutlets)
        ? object.distributionOutlets.map((e: any) => DistributionOutlet.fromJSON(e))
        : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListDistributionOutletResponse): unknown {
    const obj: any = {};
    if (message.distributionOutlets) {
      obj.distributionOutlets = message.distributionOutlets.map((e) => e ? DistributionOutlet.toJSON(e) : undefined);
    } else {
      obj.distributionOutlets = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListDistributionOutletResponse>, I>>(
    object: I,
  ): ListDistributionOutletResponse {
    const message = createBaseListDistributionOutletResponse();
    message.distributionOutlets = object.distributionOutlets?.map((e) => DistributionOutlet.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListDistributionOutletResponse.$type, ListDistributionOutletResponse);

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
