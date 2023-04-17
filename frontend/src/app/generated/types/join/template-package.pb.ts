/* eslint-disable */
import { Package } from "../operation/package/package.pb";
import { Template } from "../operation/template/template.pb";
import { messageTypeRegistry } from "../typeRegistry";

export const protobufPackage = "join";

/** Next Id: 3 */
export interface JoinTemplatePackageRequest {
  $type: "join.JoinTemplatePackageRequest";
  templateId: string;
  packageId: string;
}

/** Next Id: 3 */
export interface JoinTemplatePackageResponse {
  $type: "join.JoinTemplatePackageResponse";
  template: Template | undefined;
  package: Package | undefined;
}

function createBaseJoinTemplatePackageRequest(): JoinTemplatePackageRequest {
  return { $type: "join.JoinTemplatePackageRequest", templateId: "", packageId: "" };
}

export const JoinTemplatePackageRequest = {
  $type: "join.JoinTemplatePackageRequest" as const,

  fromJSON(object: any): JoinTemplatePackageRequest {
    return {
      $type: JoinTemplatePackageRequest.$type,
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      packageId: isSet(object.packageId) ? String(object.packageId) : "",
    };
  },

  toJSON(message: JoinTemplatePackageRequest): unknown {
    const obj: any = {};
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.packageId !== undefined && (obj.packageId = message.packageId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTemplatePackageRequest>, I>>(object: I): JoinTemplatePackageRequest {
    const message = createBaseJoinTemplatePackageRequest();
    message.templateId = object.templateId ?? "";
    message.packageId = object.packageId ?? "";
    return message;
  },
};

messageTypeRegistry.set(JoinTemplatePackageRequest.$type, JoinTemplatePackageRequest);

function createBaseJoinTemplatePackageResponse(): JoinTemplatePackageResponse {
  return { $type: "join.JoinTemplatePackageResponse", template: undefined, package: undefined };
}

export const JoinTemplatePackageResponse = {
  $type: "join.JoinTemplatePackageResponse" as const,

  fromJSON(object: any): JoinTemplatePackageResponse {
    return {
      $type: JoinTemplatePackageResponse.$type,
      template: isSet(object.template) ? Template.fromJSON(object.template) : undefined,
      package: isSet(object.package) ? Package.fromJSON(object.package) : undefined,
    };
  },

  toJSON(message: JoinTemplatePackageResponse): unknown {
    const obj: any = {};
    message.template !== undefined && (obj.template = message.template ? Template.toJSON(message.template) : undefined);
    message.package !== undefined && (obj.package = message.package ? Package.toJSON(message.package) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinTemplatePackageResponse>, I>>(object: I): JoinTemplatePackageResponse {
    const message = createBaseJoinTemplatePackageResponse();
    message.template = (object.template !== undefined && object.template !== null)
      ? Template.fromPartial(object.template)
      : undefined;
    message.package = (object.package !== undefined && object.package !== null)
      ? Package.fromPartial(object.package)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(JoinTemplatePackageResponse.$type, JoinTemplatePackageResponse);

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
