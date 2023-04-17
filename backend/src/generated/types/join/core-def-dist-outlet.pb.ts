/* eslint-disable */
import { CoreDefinition } from "../catalog/core-definition/core-definition.pb";
import { DistributionOutlet } from "../catalog/distribution/distribution.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinCoreDefDistOutletRequest {
  $type: "join.JoinCoreDefDistOutletRequest";
  readonly coreDefinitionId: string;
  readonly distributionOutletId: string;
}

/** Next Id: 3 */
export interface JoinCoreDefDistOutletResponse {
  $type: "join.JoinCoreDefDistOutletResponse";
  readonly coreDefinition: CoreDefinition | undefined;
  readonly distributionOutlet: DistributionOutlet | undefined;
}

function createBaseJoinCoreDefDistOutletRequest(): JoinCoreDefDistOutletRequest {
  return { $type: "join.JoinCoreDefDistOutletRequest", coreDefinitionId: "", distributionOutletId: "" };
}

export const JoinCoreDefDistOutletRequest = {
  $type: "join.JoinCoreDefDistOutletRequest" as const,

  fromJSON(object: any): JoinCoreDefDistOutletRequest {
    return {
      $type: JoinCoreDefDistOutletRequest.$type,
      coreDefinitionId: isSet(object.coreDefinitionId) ? String(object.coreDefinitionId) : "",
      distributionOutletId: isSet(object.distributionOutletId) ? String(object.distributionOutletId) : "",
    };
  },

  toJSON(message: JoinCoreDefDistOutletRequest): unknown {
    const obj: any = {};
    message.coreDefinitionId !== undefined && (obj.coreDefinitionId = message.coreDefinitionId);
    message.distributionOutletId !== undefined && (obj.distributionOutletId = message.distributionOutletId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinCoreDefDistOutletRequest>, I>>(object: I): JoinCoreDefDistOutletRequest {
    const message = createBaseJoinCoreDefDistOutletRequest() as any;
    message.coreDefinitionId = object.coreDefinitionId ?? "";
    message.distributionOutletId = object.distributionOutletId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinCoreDefDistOutletRequest.$type, JoinCoreDefDistOutletRequest);

function createBaseJoinCoreDefDistOutletResponse(): JoinCoreDefDistOutletResponse {
  return { $type: "join.JoinCoreDefDistOutletResponse", coreDefinition: undefined, distributionOutlet: undefined };
}

export const JoinCoreDefDistOutletResponse = {
  $type: "join.JoinCoreDefDistOutletResponse" as const,

  fromJSON(object: any): JoinCoreDefDistOutletResponse {
    return {
      $type: JoinCoreDefDistOutletResponse.$type,
      coreDefinition: isSet(object.coreDefinition) ? CoreDefinition.fromJSON(object.coreDefinition) : undefined,
      distributionOutlet: isSet(object.distributionOutlet)
        ? DistributionOutlet.fromJSON(object.distributionOutlet)
        : undefined,
    };
  },

  toJSON(message: JoinCoreDefDistOutletResponse): unknown {
    const obj: any = {};
    message.coreDefinition !== undefined &&
      (obj.coreDefinition = message.coreDefinition ? CoreDefinition.toJSON(message.coreDefinition) : undefined);
    message.distributionOutlet !== undefined && (obj.distributionOutlet = message.distributionOutlet
      ? DistributionOutlet.toJSON(message.distributionOutlet)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinCoreDefDistOutletResponse>, I>>(
    object: I,
  ): JoinCoreDefDistOutletResponse {
    const message = createBaseJoinCoreDefDistOutletResponse() as any;
    message.coreDefinition = (object.coreDefinition !== undefined && object.coreDefinition !== null)
      ? CoreDefinition.fromPartial(object.coreDefinition)
      : undefined;
    message.distributionOutlet = (object.distributionOutlet !== undefined && object.distributionOutlet !== null)
      ? DistributionOutlet.fromPartial(object.distributionOutlet)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinCoreDefDistOutletResponse.$type, JoinCoreDefDistOutletResponse);

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
