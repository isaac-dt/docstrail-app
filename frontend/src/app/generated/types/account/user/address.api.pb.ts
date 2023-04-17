/* eslint-disable */
import { messageTypeRegistry } from "../../typeRegistry";
import { UserAddress } from "./address.pb";
import { User } from "./user.pb";

export const protobufPackage = "account.user";

/** Next Id: 7 */
export interface WriteUserAddressRequest {
  $type: "account.user.WriteUserAddressRequest";
  street: string | undefined;
  unit: string | undefined;
  city: string | undefined;
  zip: string | undefined;
  countryCode: number | undefined;
  userId: string | undefined;
}

/** Next Id: 3 */
export interface GetUserAddressResponse {
  $type: "account.user.GetUserAddressResponse";
  address: UserAddress | undefined;
  user: User | undefined;
}

/** Next Id: 3 */
export interface ListUserAddressResponse {
  $type: "account.user.ListUserAddressResponse";
  addresses: UserAddress[];
  matchCount: number;
}

function createBaseWriteUserAddressRequest(): WriteUserAddressRequest {
  return {
    $type: "account.user.WriteUserAddressRequest",
    street: undefined,
    unit: undefined,
    city: undefined,
    zip: undefined,
    countryCode: undefined,
    userId: undefined,
  };
}

export const WriteUserAddressRequest = {
  $type: "account.user.WriteUserAddressRequest" as const,

  fromJSON(object: any): WriteUserAddressRequest {
    return {
      $type: WriteUserAddressRequest.$type,
      street: isSet(object.street) ? String(object.street) : undefined,
      unit: isSet(object.unit) ? String(object.unit) : undefined,
      city: isSet(object.city) ? String(object.city) : undefined,
      zip: isSet(object.zip) ? String(object.zip) : undefined,
      countryCode: isSet(object.countryCode) ? Number(object.countryCode) : undefined,
      userId: isSet(object.userId) ? String(object.userId) : undefined,
    };
  },

  toJSON(message: WriteUserAddressRequest): unknown {
    const obj: any = {};
    message.street !== undefined && (obj.street = message.street);
    message.unit !== undefined && (obj.unit = message.unit);
    message.city !== undefined && (obj.city = message.city);
    message.zip !== undefined && (obj.zip = message.zip);
    message.countryCode !== undefined && (obj.countryCode = message.countryCode);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteUserAddressRequest>, I>>(object: I): WriteUserAddressRequest {
    const message = createBaseWriteUserAddressRequest();
    message.street = object.street ?? undefined;
    message.unit = object.unit ?? undefined;
    message.city = object.city ?? undefined;
    message.zip = object.zip ?? undefined;
    message.countryCode = object.countryCode ?? undefined;
    message.userId = object.userId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteUserAddressRequest.$type, WriteUserAddressRequest);

function createBaseGetUserAddressResponse(): GetUserAddressResponse {
  return { $type: "account.user.GetUserAddressResponse", address: undefined, user: undefined };
}

export const GetUserAddressResponse = {
  $type: "account.user.GetUserAddressResponse" as const,

  fromJSON(object: any): GetUserAddressResponse {
    return {
      $type: GetUserAddressResponse.$type,
      address: isSet(object.address) ? UserAddress.fromJSON(object.address) : undefined,
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: GetUserAddressResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address ? UserAddress.toJSON(message.address) : undefined);
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserAddressResponse>, I>>(object: I): GetUserAddressResponse {
    const message = createBaseGetUserAddressResponse();
    message.address = (object.address !== undefined && object.address !== null)
      ? UserAddress.fromPartial(object.address)
      : undefined;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetUserAddressResponse.$type, GetUserAddressResponse);

function createBaseListUserAddressResponse(): ListUserAddressResponse {
  return { $type: "account.user.ListUserAddressResponse", addresses: [], matchCount: 0 };
}

export const ListUserAddressResponse = {
  $type: "account.user.ListUserAddressResponse" as const,

  fromJSON(object: any): ListUserAddressResponse {
    return {
      $type: ListUserAddressResponse.$type,
      addresses: Array.isArray(object?.addresses) ? object.addresses.map((e: any) => UserAddress.fromJSON(e)) : [],
      matchCount: isSet(object.matchCount) ? Number(object.matchCount) : 0,
    };
  },

  toJSON(message: ListUserAddressResponse): unknown {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e ? UserAddress.toJSON(e) : undefined);
    } else {
      obj.addresses = [];
    }
    message.matchCount !== undefined && (obj.matchCount = Math.round(message.matchCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListUserAddressResponse>, I>>(object: I): ListUserAddressResponse {
    const message = createBaseListUserAddressResponse();
    message.addresses = object.addresses?.map((e) => UserAddress.fromPartial(e)) || [];
    message.matchCount = object.matchCount ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ListUserAddressResponse.$type, ListUserAddressResponse);

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
