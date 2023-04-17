/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { OutletAddress } from "./address.pb";
import { DistributionOutlet } from "./distribution.pb";

export const protobufPackage = "catalog.distribution";

/** Next Id: 7 */
export interface WriteOutletAddressRequest {
  $type: "catalog.distribution.WriteOutletAddressRequest";
  street: string | undefined;
  unit: string | undefined;
  city: string | undefined;
  zip: string | undefined;
  countryCode: number | undefined;
  distributionOutletId: string | undefined;
}

/** Next Id: 3 */
export interface GetOutletAddressResponse {
  $type: "catalog.distribution.GetOutletAddressResponse";
  address: OutletAddress | undefined;
  distributionOutlet: DistributionOutlet | undefined;
}

/** Next Id: 3 */
export interface ListOutletAddressResponse {
  $type: "catalog.distribution.ListOutletAddressResponse";
  addresses: OutletAddress[];
  matchCount: number;
}

function createBaseWriteOutletAddressRequest(): WriteOutletAddressRequest {
  return {
    $type: "catalog.distribution.WriteOutletAddressRequest",
    street: undefined,
    unit: undefined,
    city: undefined,
    zip: undefined,
    countryCode: undefined,
    distributionOutletId: undefined,
  };
}

export const WriteOutletAddressRequest = {
  $type: "catalog.distribution.WriteOutletAddressRequest" as const,

  fromJSON(object: any): WriteOutletAddressRequest {
    return {
      $type: WriteOutletAddressRequest.$type,
      street: isSet(object.street) ? String(object.street) : undefined,
      unit: isSet(object.unit) ? String(object.unit) : undefined,
      city: isSet(object.city) ? String(object.city) : undefined,
      zip: isSet(object.zip) ? String(object.zip) : undefined,
      countryCode: isSet(object.countryCode) ? Number(object.countryCode) : undefined,
      distributionOutletId: isSet(object.distributionOutletId) ? String(object.distributionOutletId) : undefined,
    };
  },

  toJSON(message: WriteOutletAddressRequest): unknown {
    const obj: any = {};
    message.street !== undefined && (obj.street = message.street);
    message.unit !== undefined && (obj.unit = message.unit);
    message.city !== undefined && (obj.city = message.city);
    message.zip !== undefined && (obj.zip = message.zip);
    message.countryCode !== undefined && (obj.countryCode = message.countryCode);
    message.distributionOutletId !== undefined && (obj.distributionOutletId = message.distributionOutletId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteOutletAddressRequest>, I>>(object: I): WriteOutletAddressRequest {
    const message = createBaseWriteOutletAddressRequest();
    message.street = object.street ?? undefined;
    message.unit = object.unit ?? undefined;
    message.city = object.city ?? undefined;
    message.zip = object.zip ?? undefined;
    message.countryCode = object.countryCode ?? undefined;
    message.distributionOutletId = object.distributionOutletId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteOutletAddressRequest.$type, WriteOutletAddressRequest);

function createBaseGetOutletAddressResponse(): GetOutletAddressResponse {
  return { $type: "catalog.distribution.GetOutletAddressResponse", address: undefined, distributionOutlet: undefined };
}

export const GetOutletAddressResponse = {
  $type: "catalog.distribution.GetOutletAddressResponse" as const,

  fromJSON(object: any): GetOutletAddressResponse {
    return {
      $type: GetOutletAddressResponse.$type,
      address: isSet(object.address) ? OutletAddress.fromJSON(object.address) : undefined,
      distributionOutlet: isSet(object.distributionOutlet)
        ? DistributionOutlet.fromJSON(object.distributionOutlet)
        : undefined,
    };
  },

  toJSON(message: GetOutletAddressResponse): unknown {
    const obj: any = {};
    message.address !== undefined &&
      (obj.address = message.address ? OutletAddress.toJSON(message.address) : undefined);
    message.distributionOutlet !== undefined && (obj.distributionOutlet = message.distributionOutlet
      ? DistributionOutlet.toJSON(message.distributionOutlet)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOutletAddressResponse>, I>>(object: I): GetOutletAddressResponse {
    const message = createBaseGetOutletAddressResponse();
    message.address = (object.address !== undefined && object.address !== null)
      ? OutletAddress.fromPartial(object.address)
      : undefined;
    message.distributionOutlet = (object.distributionOutlet !== undefined && object.distributionOutlet !== null)
      ? DistributionOutlet.fromPartial(object.distributionOutlet)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetOutletAddressResponse.$type, GetOutletAddressResponse);

function createBaseListOutletAddressResponse(): ListOutletAddressResponse {
  return { $type: "catalog.distribution.ListOutletAddressResponse", addresses: [], matchCount: 0 };
}

export const ListOutletAddressResponse = {
  $type: "catalog.distribution.ListOutletAddressResponse" as const,

  fromJSON(object: any): ListOutletAddressResponse {
    return {
      $type: ListOutletAddressResponse.$type,
      addresses: Array.isArray(object?.addresses) ? object.addresses.map((e: any) => OutletAddress.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListOutletAddressResponse): unknown {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e ? OutletAddress.toJSON(e) : undefined);
    } else {
      obj.addresses = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListOutletAddressResponse>, I>>(object: I): ListOutletAddressResponse {
    const message = createBaseListOutletAddressResponse();
    message.addresses = object.addresses?.map((e) => OutletAddress.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListOutletAddressResponse.$type, ListOutletAddressResponse);

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
