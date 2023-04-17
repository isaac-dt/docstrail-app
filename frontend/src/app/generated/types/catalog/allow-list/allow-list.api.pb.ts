/* eslint-disable */
import { Client } from "../../account/client/client.pb";
import { messageTypeRegistry } from "../../typeRegistry";
import { AllowList } from "./allow-list.pb";

export const protobufPackage = "catalog.allow_list";

/** Next Id: 8 */
export interface WriteAllowListRequest {
  $type: "catalog.allow_list.WriteAllowListRequest";
  clientId: string | undefined;
}

/** Next Id: 5 */
export interface GetAllowListResponse {
  $type: "catalog.allow_list.GetAllowListResponse";
  allowList: AllowList | undefined;
  client: Client | undefined;
}

function createBaseWriteAllowListRequest(): WriteAllowListRequest {
  return { $type: "catalog.allow_list.WriteAllowListRequest", clientId: undefined };
}

export const WriteAllowListRequest = {
  $type: "catalog.allow_list.WriteAllowListRequest" as const,

  fromJSON(object: any): WriteAllowListRequest {
    return {
      $type: WriteAllowListRequest.$type,
      clientId: isSet(object.clientId) ? String(object.clientId) : undefined,
    };
  },

  toJSON(message: WriteAllowListRequest): unknown {
    const obj: any = {};
    message.clientId !== undefined && (obj.clientId = message.clientId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteAllowListRequest>, I>>(object: I): WriteAllowListRequest {
    const message = createBaseWriteAllowListRequest();
    message.clientId = object.clientId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(WriteAllowListRequest.$type, WriteAllowListRequest);

function createBaseGetAllowListResponse(): GetAllowListResponse {
  return { $type: "catalog.allow_list.GetAllowListResponse", allowList: undefined, client: undefined };
}

export const GetAllowListResponse = {
  $type: "catalog.allow_list.GetAllowListResponse" as const,

  fromJSON(object: any): GetAllowListResponse {
    return {
      $type: GetAllowListResponse.$type,
      allowList: isSet(object.allowList) ? AllowList.fromJSON(object.allowList) : undefined,
      client: isSet(object.client) ? Client.fromJSON(object.client) : undefined,
    };
  },

  toJSON(message: GetAllowListResponse): unknown {
    const obj: any = {};
    message.allowList !== undefined &&
      (obj.allowList = message.allowList ? AllowList.toJSON(message.allowList) : undefined);
    message.client !== undefined && (obj.client = message.client ? Client.toJSON(message.client) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAllowListResponse>, I>>(object: I): GetAllowListResponse {
    const message = createBaseGetAllowListResponse();
    message.allowList = (object.allowList !== undefined && object.allowList !== null)
      ? AllowList.fromPartial(object.allowList)
      : undefined;
    message.client = (object.client !== undefined && object.client !== null)
      ? Client.fromPartial(object.client)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(GetAllowListResponse.$type, GetAllowListResponse);

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
