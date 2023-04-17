/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp.pb";
import { messageTypeRegistry } from "../../typeRegistry";

export const protobufPackage = "catalog.distribution";

/** Next Id: 3 */
export enum DistributionMethod {
  DELIVERY = "DELIVERY",
  PICK_UP = "PICK_UP",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function distributionMethodFromJSON(object: any): DistributionMethod {
  switch (object) {
    case 0:
    case "DELIVERY":
      return DistributionMethod.DELIVERY;
    case 1:
    case "PICK_UP":
      return DistributionMethod.PICK_UP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DistributionMethod.UNRECOGNIZED;
  }
}

export function distributionMethodToJSON(object: DistributionMethod): string {
  switch (object) {
    case DistributionMethod.DELIVERY:
      return "DELIVERY";
    case DistributionMethod.PICK_UP:
      return "PICK_UP";
    case DistributionMethod.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * A full Description of a product distribution outlet.
 * Example: Amazon.com website, or Target at Canton GA.
 * Next Id: 10
 */
export interface DistributionOutlet {
  $type: "catalog.distribution.DistributionOutlet";
  id: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  companyId: string;
  physicalAddressId: string;
  webAddress: string | undefined;
  customerServicePhoneNumber: string | undefined;
  customerServiceEmail: string | undefined;
  distributionMethod: DistributionMethod;
}

function createBaseDistributionOutlet(): DistributionOutlet {
  return {
    $type: "catalog.distribution.DistributionOutlet",
    id: "",
    createdAt: undefined,
    updatedAt: undefined,
    companyId: "",
    physicalAddressId: "",
    webAddress: undefined,
    customerServicePhoneNumber: undefined,
    customerServiceEmail: undefined,
    distributionMethod: DistributionMethod.DELIVERY,
  };
}

export const DistributionOutlet = {
  $type: "catalog.distribution.DistributionOutlet" as const,

  fromJSON(object: any): DistributionOutlet {
    return {
      $type: DistributionOutlet.$type,
      id: isSet(object.id) ? String(object.id) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      companyId: isSet(object.companyId) ? String(object.companyId) : "",
      physicalAddressId: isSet(object.physicalAddressId) ? String(object.physicalAddressId) : "",
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

  toJSON(message: DistributionOutlet): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
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

  fromPartial<I extends Exact<DeepPartial<DistributionOutlet>, I>>(object: I): DistributionOutlet {
    const message = createBaseDistributionOutlet();
    message.id = object.id ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.companyId = object.companyId ?? "";
    message.physicalAddressId = object.physicalAddressId ?? "";
    message.webAddress = object.webAddress ?? undefined;
    message.customerServicePhoneNumber = object.customerServicePhoneNumber ?? undefined;
    message.customerServiceEmail = object.customerServiceEmail ?? undefined;
    message.distributionMethod = object.distributionMethod ?? DistributionMethod.DELIVERY;
    return message;
  },
};

messageTypeRegistry.set(DistributionOutlet.$type, DistributionOutlet);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
