/* eslint-disable */
import { OpenDefinition } from "../catalog/open-definition/open-definition.pb";
import { Package } from "../operation/package/package.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinPackageOpenDefinitionRequest {
  $type: "join.JoinPackageOpenDefinitionRequest";
  packageId: string;
  openDefinitionId: string;
}

/** Next Id: 3 */
export interface JoinPackageOpenDefinitionResponse {
  $type: "join.JoinPackageOpenDefinitionResponse";
  package: Package | undefined;
  openDefinition: OpenDefinition | undefined;
}

function createBaseJoinPackageOpenDefinitionRequest(): JoinPackageOpenDefinitionRequest {
  return { $type: "join.JoinPackageOpenDefinitionRequest", packageId: "", openDefinitionId: "" };
}

export const JoinPackageOpenDefinitionRequest = {
  $type: "join.JoinPackageOpenDefinitionRequest" as const,

  fromJSON(object: any): JoinPackageOpenDefinitionRequest {
    return {
      $type: JoinPackageOpenDefinitionRequest.$type,
      packageId: isSet(object.packageId) ? String(object.packageId) : "",
      openDefinitionId: isSet(object.openDefinitionId) ? String(object.openDefinitionId) : "",
    };
  },

  toJSON(message: JoinPackageOpenDefinitionRequest): unknown {
    const obj: any = {};
    message.packageId !== undefined && (obj.packageId = message.packageId);
    message.openDefinitionId !== undefined && (obj.openDefinitionId = message.openDefinitionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinPackageOpenDefinitionRequest>, I>>(
    object: I,
  ): JoinPackageOpenDefinitionRequest {
    const message = createBaseJoinPackageOpenDefinitionRequest();
    message.packageId = object.packageId ?? "";
    message.openDefinitionId = object.openDefinitionId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinPackageOpenDefinitionRequest.$type, JoinPackageOpenDefinitionRequest);

function createBaseJoinPackageOpenDefinitionResponse(): JoinPackageOpenDefinitionResponse {
  return { $type: "join.JoinPackageOpenDefinitionResponse", package: undefined, openDefinition: undefined };
}

export const JoinPackageOpenDefinitionResponse = {
  $type: "join.JoinPackageOpenDefinitionResponse" as const,

  fromJSON(object: any): JoinPackageOpenDefinitionResponse {
    return {
      $type: JoinPackageOpenDefinitionResponse.$type,
      package: isSet(object.package) ? Package.fromJSON(object.package) : undefined,
      openDefinition: isSet(object.openDefinition) ? OpenDefinition.fromJSON(object.openDefinition) : undefined,
    };
  },

  toJSON(message: JoinPackageOpenDefinitionResponse): unknown {
    const obj: any = {};
    message.package !== undefined && (obj.package = message.package ? Package.toJSON(message.package) : undefined);
    message.openDefinition !== undefined &&
      (obj.openDefinition = message.openDefinition ? OpenDefinition.toJSON(message.openDefinition) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinPackageOpenDefinitionResponse>, I>>(
    object: I,
  ): JoinPackageOpenDefinitionResponse {
    const message = createBaseJoinPackageOpenDefinitionResponse();
    message.package = (object.package !== undefined && object.package !== null)
      ? Package.fromPartial(object.package)
      : undefined;
    message.openDefinition = (object.openDefinition !== undefined && object.openDefinition !== null)
      ? OpenDefinition.fromPartial(object.openDefinition)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinPackageOpenDefinitionResponse.$type, JoinPackageOpenDefinitionResponse);

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
