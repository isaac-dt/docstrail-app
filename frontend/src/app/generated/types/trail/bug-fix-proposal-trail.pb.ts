/* eslint-disable */
import { messageTypeRegistry } from "../typeRegistry";
import { Peer } from "./common.pb";

export const protobufPackage = "trail";

/**
 * All information required to build a bug-fix proposal.
 * Next Id: 5
 */
export interface BugFixTrail {
  $type: "trail.BugFixTrail";
  ticket: BugTicket | undefined;
  impact: BugImpact | undefined;
  origin: BugOrigin | undefined;
  peers: Peer[];
  solution: BugSolution | undefined;
  alternatives: BugSolution[];
}

/** Bug ticket informration. */
export interface BugTicket {
  $type: "trail.BugTicket";
  ticketUrl: string | undefined;
  ticketDescription: string | undefined;
  comment: string | undefined;
  resourcesUrls: string[];
}

/** Impact of the bug. */
export interface BugImpact {
  $type: "trail.BugImpact";
  engServicesImpact: BugImpact_EngServiceImpact[];
  impactOnUsers: BugImpact_ImpactOnUsers | undefined;
}

/** Impact of the bug on users. */
export interface BugImpact_ImpactOnUsers {
  $type: "trail.BugImpact.ImpactOnUsers";
  areUsersAffected: boolean | undefined;
  comment: string | undefined;
}

/** Impact details on an engineering service. */
export interface BugImpact_EngServiceImpact {
  $type: "trail.BugImpact.EngServiceImpact";
  service: BugImpact_EngServiceImpact_Service;
  severity: BugImpact_EngServiceImpact_Severity;
  comment: string | undefined;
}

/** Engineering services that constitute a system. */
export enum BugImpact_EngServiceImpact_Service {
  UNKNOWN_SERVICE = "UNKNOWN_SERVICE",
  OTHER_SERVICE = "OTHER_SERVICE",
  UX = "UX",
  BACKEND = "BACKEND",
  DATABASE = "DATABASE",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function bugImpact_EngServiceImpact_ServiceFromJSON(object: any): BugImpact_EngServiceImpact_Service {
  switch (object) {
    case 0:
    case "UNKNOWN_SERVICE":
      return BugImpact_EngServiceImpact_Service.UNKNOWN_SERVICE;
    case 1:
    case "OTHER_SERVICE":
      return BugImpact_EngServiceImpact_Service.OTHER_SERVICE;
    case 2:
    case "UX":
      return BugImpact_EngServiceImpact_Service.UX;
    case 3:
    case "BACKEND":
      return BugImpact_EngServiceImpact_Service.BACKEND;
    case 4:
    case "DATABASE":
      return BugImpact_EngServiceImpact_Service.DATABASE;
    case 5:
    case "INFRASTRUCTURE":
      return BugImpact_EngServiceImpact_Service.INFRASTRUCTURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BugImpact_EngServiceImpact_Service.UNRECOGNIZED;
  }
}

export function bugImpact_EngServiceImpact_ServiceToJSON(object: BugImpact_EngServiceImpact_Service): string {
  switch (object) {
    case BugImpact_EngServiceImpact_Service.UNKNOWN_SERVICE:
      return "UNKNOWN_SERVICE";
    case BugImpact_EngServiceImpact_Service.OTHER_SERVICE:
      return "OTHER_SERVICE";
    case BugImpact_EngServiceImpact_Service.UX:
      return "UX";
    case BugImpact_EngServiceImpact_Service.BACKEND:
      return "BACKEND";
    case BugImpact_EngServiceImpact_Service.DATABASE:
      return "DATABASE";
    case BugImpact_EngServiceImpact_Service.INFRASTRUCTURE:
      return "INFRASTRUCTURE";
    case BugImpact_EngServiceImpact_Service.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Severity of impact on an engineering service. */
export enum BugImpact_EngServiceImpact_Severity {
  /** UNKNOWN_SCALE - Temporarily updated to instead show quantity of change. */
  UNKNOWN_SCALE = "UNKNOWN_SCALE",
  MOST = "MOST",
  SOME = "SOME",
  NEGLIGEABLE = "NEGLIGEABLE",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function bugImpact_EngServiceImpact_SeverityFromJSON(object: any): BugImpact_EngServiceImpact_Severity {
  switch (object) {
    case 0:
    case "UNKNOWN_SCALE":
      return BugImpact_EngServiceImpact_Severity.UNKNOWN_SCALE;
    case 1:
    case "MOST":
      return BugImpact_EngServiceImpact_Severity.MOST;
    case 2:
    case "SOME":
      return BugImpact_EngServiceImpact_Severity.SOME;
    case 3:
    case "NEGLIGEABLE":
      return BugImpact_EngServiceImpact_Severity.NEGLIGEABLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BugImpact_EngServiceImpact_Severity.UNRECOGNIZED;
  }
}

export function bugImpact_EngServiceImpact_SeverityToJSON(object: BugImpact_EngServiceImpact_Severity): string {
  switch (object) {
    case BugImpact_EngServiceImpact_Severity.UNKNOWN_SCALE:
      return "UNKNOWN_SCALE";
    case BugImpact_EngServiceImpact_Severity.MOST:
      return "MOST";
    case BugImpact_EngServiceImpact_Severity.SOME:
      return "SOME";
    case BugImpact_EngServiceImpact_Severity.NEGLIGEABLE:
      return "NEGLIGEABLE";
    case BugImpact_EngServiceImpact_Severity.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Details on what caused the bug. */
export interface BugOrigin {
  $type: "trail.BugOrigin";
  /** List of individual causes that led to the bug. */
  causes: BugOrigin_Cause[];
  /** Comments on the overall origin of the bug. */
  comment: string | undefined;
}

/** a cause (event) that led to the bug. */
export interface BugOrigin_Cause {
  $type: "trail.BugOrigin.Cause";
  type: BugOrigin_Cause_Type;
  /** Details on the cause (event) that led to the bug. */
  comment: string | undefined;
  attachmentIds: string[];
}

/** Possible origins of a bug. */
export enum BugOrigin_Cause_Type {
  UNKNOWN_TYPE = "UNKNOWN_TYPE",
  OTHER_TYPE = "OTHER_TYPE",
  BAD_NEW_CODE = "BAD_NEW_CODE",
  LIBRARY_MALFUNCTION = "LIBRARY_MALFUNCTION",
  EDGE_CASE = "EDGE_CASE",
  DEPENDENCY_FAILURE = "DEPENDENCY_FAILURE",
  POOR_PLANNING = "POOR_PLANNING",
  SIDE_EFFECTS_FROM_OTHER_CODES = "SIDE_EFFECTS_FROM_OTHER_CODES",
  DEPRECATION_FALLOUT = "DEPRECATION_FALLOUT",
  VENDOR_FAILURE = "VENDOR_FAILURE",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function bugOrigin_Cause_TypeFromJSON(object: any): BugOrigin_Cause_Type {
  switch (object) {
    case 0:
    case "UNKNOWN_TYPE":
      return BugOrigin_Cause_Type.UNKNOWN_TYPE;
    case 1:
    case "OTHER_TYPE":
      return BugOrigin_Cause_Type.OTHER_TYPE;
    case 2:
    case "BAD_NEW_CODE":
      return BugOrigin_Cause_Type.BAD_NEW_CODE;
    case 3:
    case "LIBRARY_MALFUNCTION":
      return BugOrigin_Cause_Type.LIBRARY_MALFUNCTION;
    case 4:
    case "EDGE_CASE":
      return BugOrigin_Cause_Type.EDGE_CASE;
    case 5:
    case "DEPENDENCY_FAILURE":
      return BugOrigin_Cause_Type.DEPENDENCY_FAILURE;
    case 6:
    case "POOR_PLANNING":
      return BugOrigin_Cause_Type.POOR_PLANNING;
    case 7:
    case "SIDE_EFFECTS_FROM_OTHER_CODES":
      return BugOrigin_Cause_Type.SIDE_EFFECTS_FROM_OTHER_CODES;
    case 8:
    case "DEPRECATION_FALLOUT":
      return BugOrigin_Cause_Type.DEPRECATION_FALLOUT;
    case 9:
    case "VENDOR_FAILURE":
      return BugOrigin_Cause_Type.VENDOR_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BugOrigin_Cause_Type.UNRECOGNIZED;
  }
}

export function bugOrigin_Cause_TypeToJSON(object: BugOrigin_Cause_Type): string {
  switch (object) {
    case BugOrigin_Cause_Type.UNKNOWN_TYPE:
      return "UNKNOWN_TYPE";
    case BugOrigin_Cause_Type.OTHER_TYPE:
      return "OTHER_TYPE";
    case BugOrigin_Cause_Type.BAD_NEW_CODE:
      return "BAD_NEW_CODE";
    case BugOrigin_Cause_Type.LIBRARY_MALFUNCTION:
      return "LIBRARY_MALFUNCTION";
    case BugOrigin_Cause_Type.EDGE_CASE:
      return "EDGE_CASE";
    case BugOrigin_Cause_Type.DEPENDENCY_FAILURE:
      return "DEPENDENCY_FAILURE";
    case BugOrigin_Cause_Type.POOR_PLANNING:
      return "POOR_PLANNING";
    case BugOrigin_Cause_Type.SIDE_EFFECTS_FROM_OTHER_CODES:
      return "SIDE_EFFECTS_FROM_OTHER_CODES";
    case BugOrigin_Cause_Type.DEPRECATION_FALLOUT:
      return "DEPRECATION_FALLOUT";
    case BugOrigin_Cause_Type.VENDOR_FAILURE:
      return "VENDOR_FAILURE";
    case BugOrigin_Cause_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The solution aimed at resolving the bug. */
export interface BugSolution {
  $type: "trail.BugSolution";
  revision: BugSolution_Revision[];
  /** Comments on a particular solution/approach. */
  comment: string | undefined;
}

/** Aspect of the system which could be touched by the solution. */
export enum BugSolution_SystemTarget {
  UNKNOWN_TARGET = "UNKNOWN_TARGET",
  OTHER_TARGET = "OTHER_TARGET",
  CODE = "CODE",
  DB_DATA = "DB_DATA",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  VENDOR = "VENDOR",
  DEPENDENCIES = "DEPENDENCIES",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function bugSolution_SystemTargetFromJSON(object: any): BugSolution_SystemTarget {
  switch (object) {
    case 0:
    case "UNKNOWN_TARGET":
      return BugSolution_SystemTarget.UNKNOWN_TARGET;
    case 1:
    case "OTHER_TARGET":
      return BugSolution_SystemTarget.OTHER_TARGET;
    case 2:
    case "CODE":
      return BugSolution_SystemTarget.CODE;
    case 3:
    case "DB_DATA":
      return BugSolution_SystemTarget.DB_DATA;
    case 4:
    case "INFRASTRUCTURE":
      return BugSolution_SystemTarget.INFRASTRUCTURE;
    case 5:
    case "VENDOR":
      return BugSolution_SystemTarget.VENDOR;
    case 6:
    case "DEPENDENCIES":
      return BugSolution_SystemTarget.DEPENDENCIES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BugSolution_SystemTarget.UNRECOGNIZED;
  }
}

export function bugSolution_SystemTargetToJSON(object: BugSolution_SystemTarget): string {
  switch (object) {
    case BugSolution_SystemTarget.UNKNOWN_TARGET:
      return "UNKNOWN_TARGET";
    case BugSolution_SystemTarget.OTHER_TARGET:
      return "OTHER_TARGET";
    case BugSolution_SystemTarget.CODE:
      return "CODE";
    case BugSolution_SystemTarget.DB_DATA:
      return "DB_DATA";
    case BugSolution_SystemTarget.INFRASTRUCTURE:
      return "INFRASTRUCTURE";
    case BugSolution_SystemTarget.VENDOR:
      return "VENDOR";
    case BugSolution_SystemTarget.DEPENDENCIES:
      return "DEPENDENCIES";
    case BugSolution_SystemTarget.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The alterations applied to a target. */
export interface BugSolution_Revision {
  $type: "trail.BugSolution.Revision";
  /** Aspect of the system which could be touched by the solution. */
  systemTarget: BugSolution_SystemTarget;
  /** A set of changes that share the same functionality. */
  changeList: BugSolution_Revision_ChangeList[];
  /** Comments on the goals associated to a revision. */
  comment: string | undefined;
}

/** A set of changes that share the same functionality. */
export interface BugSolution_Revision_ChangeList {
  $type: "trail.BugSolution.Revision.ChangeList";
  goal:
    | string
    | undefined;
  /** Parts of the system where units/atoms of work reside. */
  workUnits: BugSolution_Revision_ChangeList_WorkUnit[];
}

/** Parts of the system where a unit/atom of work could reside. */
export interface BugSolution_Revision_ChangeList_WorkUnit {
  $type: "trail.BugSolution.Revision.ChangeList.WorkUnit";
  type: BugSolution_Revision_ChangeList_WorkUnit_Type;
  details: string | undefined;
  attachmentIds: string[];
  targetedPeers: Peer[];
}

export enum BugSolution_Revision_ChangeList_WorkUnit_Type {
  UNKNOWN_TYPE = "UNKNOWN_TYPE",
  OTHER_TYPE = "OTHER_TYPE",
  HTML_CSS_JS = "HTML_CSS_JS",
  TYPES_OR_STRUCT = "TYPES_OR_STRUCT",
  API_PROVIDED = "API_PROVIDED",
  API_CONSUMED = "API_CONSUMED",
  LIBRARY = "LIBRARY",
  BACKEND_LOGIC = "BACKEND_LOGIC",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function bugSolution_Revision_ChangeList_WorkUnit_TypeFromJSON(
  object: any,
): BugSolution_Revision_ChangeList_WorkUnit_Type {
  switch (object) {
    case 0:
    case "UNKNOWN_TYPE":
      return BugSolution_Revision_ChangeList_WorkUnit_Type.UNKNOWN_TYPE;
    case 1:
    case "OTHER_TYPE":
      return BugSolution_Revision_ChangeList_WorkUnit_Type.OTHER_TYPE;
    case 2:
    case "HTML_CSS_JS":
      return BugSolution_Revision_ChangeList_WorkUnit_Type.HTML_CSS_JS;
    case 3:
    case "TYPES_OR_STRUCT":
      return BugSolution_Revision_ChangeList_WorkUnit_Type.TYPES_OR_STRUCT;
    case 4:
    case "API_PROVIDED":
      return BugSolution_Revision_ChangeList_WorkUnit_Type.API_PROVIDED;
    case 5:
    case "API_CONSUMED":
      return BugSolution_Revision_ChangeList_WorkUnit_Type.API_CONSUMED;
    case 6:
    case "LIBRARY":
      return BugSolution_Revision_ChangeList_WorkUnit_Type.LIBRARY;
    case 7:
    case "BACKEND_LOGIC":
      return BugSolution_Revision_ChangeList_WorkUnit_Type.BACKEND_LOGIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BugSolution_Revision_ChangeList_WorkUnit_Type.UNRECOGNIZED;
  }
}

export function bugSolution_Revision_ChangeList_WorkUnit_TypeToJSON(
  object: BugSolution_Revision_ChangeList_WorkUnit_Type,
): string {
  switch (object) {
    case BugSolution_Revision_ChangeList_WorkUnit_Type.UNKNOWN_TYPE:
      return "UNKNOWN_TYPE";
    case BugSolution_Revision_ChangeList_WorkUnit_Type.OTHER_TYPE:
      return "OTHER_TYPE";
    case BugSolution_Revision_ChangeList_WorkUnit_Type.HTML_CSS_JS:
      return "HTML_CSS_JS";
    case BugSolution_Revision_ChangeList_WorkUnit_Type.TYPES_OR_STRUCT:
      return "TYPES_OR_STRUCT";
    case BugSolution_Revision_ChangeList_WorkUnit_Type.API_PROVIDED:
      return "API_PROVIDED";
    case BugSolution_Revision_ChangeList_WorkUnit_Type.API_CONSUMED:
      return "API_CONSUMED";
    case BugSolution_Revision_ChangeList_WorkUnit_Type.LIBRARY:
      return "LIBRARY";
    case BugSolution_Revision_ChangeList_WorkUnit_Type.BACKEND_LOGIC:
      return "BACKEND_LOGIC";
    case BugSolution_Revision_ChangeList_WorkUnit_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseBugFixTrail(): BugFixTrail {
  return {
    $type: "trail.BugFixTrail",
    ticket: undefined,
    impact: undefined,
    origin: undefined,
    peers: [],
    solution: undefined,
    alternatives: [],
  };
}

export const BugFixTrail = {
  $type: "trail.BugFixTrail" as const,

  fromJSON(object: any): BugFixTrail {
    return {
      $type: BugFixTrail.$type,
      ticket: isSet(object.ticket) ? BugTicket.fromJSON(object.ticket) : undefined,
      impact: isSet(object.impact) ? BugImpact.fromJSON(object.impact) : undefined,
      origin: isSet(object.origin) ? BugOrigin.fromJSON(object.origin) : undefined,
      peers: Array.isArray(object?.peers) ? object.peers.map((e: any) => Peer.fromJSON(e)) : [],
      solution: isSet(object.solution) ? BugSolution.fromJSON(object.solution) : undefined,
      alternatives: Array.isArray(object?.alternatives)
        ? object.alternatives.map((e: any) => BugSolution.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BugFixTrail): unknown {
    const obj: any = {};
    message.ticket !== undefined && (obj.ticket = message.ticket ? BugTicket.toJSON(message.ticket) : undefined);
    message.impact !== undefined && (obj.impact = message.impact ? BugImpact.toJSON(message.impact) : undefined);
    message.origin !== undefined && (obj.origin = message.origin ? BugOrigin.toJSON(message.origin) : undefined);
    if (message.peers) {
      obj.peers = message.peers.map((e) => e ? Peer.toJSON(e) : undefined);
    } else {
      obj.peers = [];
    }
    message.solution !== undefined &&
      (obj.solution = message.solution ? BugSolution.toJSON(message.solution) : undefined);
    if (message.alternatives) {
      obj.alternatives = message.alternatives.map((e) => e ? BugSolution.toJSON(e) : undefined);
    } else {
      obj.alternatives = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugFixTrail>, I>>(object: I): BugFixTrail {
    const message = createBaseBugFixTrail();
    message.ticket = (object.ticket !== undefined && object.ticket !== null)
      ? BugTicket.fromPartial(object.ticket)
      : undefined;
    message.impact = (object.impact !== undefined && object.impact !== null)
      ? BugImpact.fromPartial(object.impact)
      : undefined;
    message.origin = (object.origin !== undefined && object.origin !== null)
      ? BugOrigin.fromPartial(object.origin)
      : undefined;
    message.peers = object.peers?.map((e) => Peer.fromPartial(e)) || [];
    message.solution = (object.solution !== undefined && object.solution !== null)
      ? BugSolution.fromPartial(object.solution)
      : undefined;
    message.alternatives = object.alternatives?.map((e) => BugSolution.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(BugFixTrail.$type, BugFixTrail);

function createBaseBugTicket(): BugTicket {
  return {
    $type: "trail.BugTicket",
    ticketUrl: undefined,
    ticketDescription: undefined,
    comment: undefined,
    resourcesUrls: [],
  };
}

export const BugTicket = {
  $type: "trail.BugTicket" as const,

  fromJSON(object: any): BugTicket {
    return {
      $type: BugTicket.$type,
      ticketUrl: isSet(object.ticketUrl) ? String(object.ticketUrl) : undefined,
      ticketDescription: isSet(object.ticketDescription) ? String(object.ticketDescription) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : undefined,
      resourcesUrls: Array.isArray(object?.resourcesUrls) ? object.resourcesUrls.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: BugTicket): unknown {
    const obj: any = {};
    message.ticketUrl !== undefined && (obj.ticketUrl = message.ticketUrl);
    message.ticketDescription !== undefined && (obj.ticketDescription = message.ticketDescription);
    message.comment !== undefined && (obj.comment = message.comment);
    if (message.resourcesUrls) {
      obj.resourcesUrls = message.resourcesUrls.map((e) => e);
    } else {
      obj.resourcesUrls = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugTicket>, I>>(object: I): BugTicket {
    const message = createBaseBugTicket();
    message.ticketUrl = object.ticketUrl ?? undefined;
    message.ticketDescription = object.ticketDescription ?? undefined;
    message.comment = object.comment ?? undefined;
    message.resourcesUrls = object.resourcesUrls?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(BugTicket.$type, BugTicket);

function createBaseBugImpact(): BugImpact {
  return { $type: "trail.BugImpact", engServicesImpact: [], impactOnUsers: undefined };
}

export const BugImpact = {
  $type: "trail.BugImpact" as const,

  fromJSON(object: any): BugImpact {
    return {
      $type: BugImpact.$type,
      engServicesImpact: Array.isArray(object?.engServicesImpact)
        ? object.engServicesImpact.map((e: any) => BugImpact_EngServiceImpact.fromJSON(e))
        : [],
      impactOnUsers: isSet(object.impactOnUsers) ? BugImpact_ImpactOnUsers.fromJSON(object.impactOnUsers) : undefined,
    };
  },

  toJSON(message: BugImpact): unknown {
    const obj: any = {};
    if (message.engServicesImpact) {
      obj.engServicesImpact = message.engServicesImpact.map((e) =>
        e ? BugImpact_EngServiceImpact.toJSON(e) : undefined
      );
    } else {
      obj.engServicesImpact = [];
    }
    message.impactOnUsers !== undefined &&
      (obj.impactOnUsers = message.impactOnUsers ? BugImpact_ImpactOnUsers.toJSON(message.impactOnUsers) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugImpact>, I>>(object: I): BugImpact {
    const message = createBaseBugImpact();
    message.engServicesImpact = object.engServicesImpact?.map((e) => BugImpact_EngServiceImpact.fromPartial(e)) || [];
    message.impactOnUsers = (object.impactOnUsers !== undefined && object.impactOnUsers !== null)
      ? BugImpact_ImpactOnUsers.fromPartial(object.impactOnUsers)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(BugImpact.$type, BugImpact);

function createBaseBugImpact_ImpactOnUsers(): BugImpact_ImpactOnUsers {
  return { $type: "trail.BugImpact.ImpactOnUsers", areUsersAffected: undefined, comment: undefined };
}

export const BugImpact_ImpactOnUsers = {
  $type: "trail.BugImpact.ImpactOnUsers" as const,

  fromJSON(object: any): BugImpact_ImpactOnUsers {
    return {
      $type: BugImpact_ImpactOnUsers.$type,
      areUsersAffected: isSet(object.areUsersAffected) ? Boolean(object.areUsersAffected) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : undefined,
    };
  },

  toJSON(message: BugImpact_ImpactOnUsers): unknown {
    const obj: any = {};
    message.areUsersAffected !== undefined && (obj.areUsersAffected = message.areUsersAffected);
    message.comment !== undefined && (obj.comment = message.comment);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugImpact_ImpactOnUsers>, I>>(object: I): BugImpact_ImpactOnUsers {
    const message = createBaseBugImpact_ImpactOnUsers();
    message.areUsersAffected = object.areUsersAffected ?? undefined;
    message.comment = object.comment ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(BugImpact_ImpactOnUsers.$type, BugImpact_ImpactOnUsers);

function createBaseBugImpact_EngServiceImpact(): BugImpact_EngServiceImpact {
  return {
    $type: "trail.BugImpact.EngServiceImpact",
    service: BugImpact_EngServiceImpact_Service.UNKNOWN_SERVICE,
    severity: BugImpact_EngServiceImpact_Severity.UNKNOWN_SCALE,
    comment: undefined,
  };
}

export const BugImpact_EngServiceImpact = {
  $type: "trail.BugImpact.EngServiceImpact" as const,

  fromJSON(object: any): BugImpact_EngServiceImpact {
    return {
      $type: BugImpact_EngServiceImpact.$type,
      service: isSet(object.service)
        ? bugImpact_EngServiceImpact_ServiceFromJSON(object.service)
        : BugImpact_EngServiceImpact_Service.UNKNOWN_SERVICE,
      severity: isSet(object.severity)
        ? bugImpact_EngServiceImpact_SeverityFromJSON(object.severity)
        : BugImpact_EngServiceImpact_Severity.UNKNOWN_SCALE,
      comment: isSet(object.comment) ? String(object.comment) : undefined,
    };
  },

  toJSON(message: BugImpact_EngServiceImpact): unknown {
    const obj: any = {};
    message.service !== undefined && (obj.service = bugImpact_EngServiceImpact_ServiceToJSON(message.service));
    message.severity !== undefined && (obj.severity = bugImpact_EngServiceImpact_SeverityToJSON(message.severity));
    message.comment !== undefined && (obj.comment = message.comment);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugImpact_EngServiceImpact>, I>>(object: I): BugImpact_EngServiceImpact {
    const message = createBaseBugImpact_EngServiceImpact();
    message.service = object.service ?? BugImpact_EngServiceImpact_Service.UNKNOWN_SERVICE;
    message.severity = object.severity ?? BugImpact_EngServiceImpact_Severity.UNKNOWN_SCALE;
    message.comment = object.comment ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(BugImpact_EngServiceImpact.$type, BugImpact_EngServiceImpact);

function createBaseBugOrigin(): BugOrigin {
  return { $type: "trail.BugOrigin", causes: [], comment: undefined };
}

export const BugOrigin = {
  $type: "trail.BugOrigin" as const,

  fromJSON(object: any): BugOrigin {
    return {
      $type: BugOrigin.$type,
      causes: Array.isArray(object?.causes) ? object.causes.map((e: any) => BugOrigin_Cause.fromJSON(e)) : [],
      comment: isSet(object.comment) ? String(object.comment) : undefined,
    };
  },

  toJSON(message: BugOrigin): unknown {
    const obj: any = {};
    if (message.causes) {
      obj.causes = message.causes.map((e) => e ? BugOrigin_Cause.toJSON(e) : undefined);
    } else {
      obj.causes = [];
    }
    message.comment !== undefined && (obj.comment = message.comment);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugOrigin>, I>>(object: I): BugOrigin {
    const message = createBaseBugOrigin();
    message.causes = object.causes?.map((e) => BugOrigin_Cause.fromPartial(e)) || [];
    message.comment = object.comment ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(BugOrigin.$type, BugOrigin);

function createBaseBugOrigin_Cause(): BugOrigin_Cause {
  return {
    $type: "trail.BugOrigin.Cause",
    type: BugOrigin_Cause_Type.UNKNOWN_TYPE,
    comment: undefined,
    attachmentIds: [],
  };
}

export const BugOrigin_Cause = {
  $type: "trail.BugOrigin.Cause" as const,

  fromJSON(object: any): BugOrigin_Cause {
    return {
      $type: BugOrigin_Cause.$type,
      type: isSet(object.type) ? bugOrigin_Cause_TypeFromJSON(object.type) : BugOrigin_Cause_Type.UNKNOWN_TYPE,
      comment: isSet(object.comment) ? String(object.comment) : undefined,
      attachmentIds: Array.isArray(object?.attachmentIds) ? object.attachmentIds.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: BugOrigin_Cause): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = bugOrigin_Cause_TypeToJSON(message.type));
    message.comment !== undefined && (obj.comment = message.comment);
    if (message.attachmentIds) {
      obj.attachmentIds = message.attachmentIds.map((e) => e);
    } else {
      obj.attachmentIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugOrigin_Cause>, I>>(object: I): BugOrigin_Cause {
    const message = createBaseBugOrigin_Cause();
    message.type = object.type ?? BugOrigin_Cause_Type.UNKNOWN_TYPE;
    message.comment = object.comment ?? undefined;
    message.attachmentIds = object.attachmentIds?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(BugOrigin_Cause.$type, BugOrigin_Cause);

function createBaseBugSolution(): BugSolution {
  return { $type: "trail.BugSolution", revision: [], comment: undefined };
}

export const BugSolution = {
  $type: "trail.BugSolution" as const,

  fromJSON(object: any): BugSolution {
    return {
      $type: BugSolution.$type,
      revision: Array.isArray(object?.revision)
        ? object.revision.map((e: any) => BugSolution_Revision.fromJSON(e))
        : [],
      comment: isSet(object.comment) ? String(object.comment) : undefined,
    };
  },

  toJSON(message: BugSolution): unknown {
    const obj: any = {};
    if (message.revision) {
      obj.revision = message.revision.map((e) => e ? BugSolution_Revision.toJSON(e) : undefined);
    } else {
      obj.revision = [];
    }
    message.comment !== undefined && (obj.comment = message.comment);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugSolution>, I>>(object: I): BugSolution {
    const message = createBaseBugSolution();
    message.revision = object.revision?.map((e) => BugSolution_Revision.fromPartial(e)) || [];
    message.comment = object.comment ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(BugSolution.$type, BugSolution);

function createBaseBugSolution_Revision(): BugSolution_Revision {
  return {
    $type: "trail.BugSolution.Revision",
    systemTarget: BugSolution_SystemTarget.UNKNOWN_TARGET,
    changeList: [],
    comment: undefined,
  };
}

export const BugSolution_Revision = {
  $type: "trail.BugSolution.Revision" as const,

  fromJSON(object: any): BugSolution_Revision {
    return {
      $type: BugSolution_Revision.$type,
      systemTarget: isSet(object.systemTarget)
        ? bugSolution_SystemTargetFromJSON(object.systemTarget)
        : BugSolution_SystemTarget.UNKNOWN_TARGET,
      changeList: Array.isArray(object?.changeList)
        ? object.changeList.map((e: any) => BugSolution_Revision_ChangeList.fromJSON(e))
        : [],
      comment: isSet(object.comment) ? String(object.comment) : undefined,
    };
  },

  toJSON(message: BugSolution_Revision): unknown {
    const obj: any = {};
    message.systemTarget !== undefined && (obj.systemTarget = bugSolution_SystemTargetToJSON(message.systemTarget));
    if (message.changeList) {
      obj.changeList = message.changeList.map((e) => e ? BugSolution_Revision_ChangeList.toJSON(e) : undefined);
    } else {
      obj.changeList = [];
    }
    message.comment !== undefined && (obj.comment = message.comment);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugSolution_Revision>, I>>(object: I): BugSolution_Revision {
    const message = createBaseBugSolution_Revision();
    message.systemTarget = object.systemTarget ?? BugSolution_SystemTarget.UNKNOWN_TARGET;
    message.changeList = object.changeList?.map((e) => BugSolution_Revision_ChangeList.fromPartial(e)) || [];
    message.comment = object.comment ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(BugSolution_Revision.$type, BugSolution_Revision);

function createBaseBugSolution_Revision_ChangeList(): BugSolution_Revision_ChangeList {
  return { $type: "trail.BugSolution.Revision.ChangeList", goal: undefined, workUnits: [] };
}

export const BugSolution_Revision_ChangeList = {
  $type: "trail.BugSolution.Revision.ChangeList" as const,

  fromJSON(object: any): BugSolution_Revision_ChangeList {
    return {
      $type: BugSolution_Revision_ChangeList.$type,
      goal: isSet(object.goal) ? String(object.goal) : undefined,
      workUnits: Array.isArray(object?.workUnits)
        ? object.workUnits.map((e: any) => BugSolution_Revision_ChangeList_WorkUnit.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BugSolution_Revision_ChangeList): unknown {
    const obj: any = {};
    message.goal !== undefined && (obj.goal = message.goal);
    if (message.workUnits) {
      obj.workUnits = message.workUnits.map((e) => e ? BugSolution_Revision_ChangeList_WorkUnit.toJSON(e) : undefined);
    } else {
      obj.workUnits = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugSolution_Revision_ChangeList>, I>>(
    object: I,
  ): BugSolution_Revision_ChangeList {
    const message = createBaseBugSolution_Revision_ChangeList();
    message.goal = object.goal ?? undefined;
    message.workUnits = object.workUnits?.map((e) => BugSolution_Revision_ChangeList_WorkUnit.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(BugSolution_Revision_ChangeList.$type, BugSolution_Revision_ChangeList);

function createBaseBugSolution_Revision_ChangeList_WorkUnit(): BugSolution_Revision_ChangeList_WorkUnit {
  return {
    $type: "trail.BugSolution.Revision.ChangeList.WorkUnit",
    type: BugSolution_Revision_ChangeList_WorkUnit_Type.UNKNOWN_TYPE,
    details: undefined,
    attachmentIds: [],
    targetedPeers: [],
  };
}

export const BugSolution_Revision_ChangeList_WorkUnit = {
  $type: "trail.BugSolution.Revision.ChangeList.WorkUnit" as const,

  fromJSON(object: any): BugSolution_Revision_ChangeList_WorkUnit {
    return {
      $type: BugSolution_Revision_ChangeList_WorkUnit.$type,
      type: isSet(object.type)
        ? bugSolution_Revision_ChangeList_WorkUnit_TypeFromJSON(object.type)
        : BugSolution_Revision_ChangeList_WorkUnit_Type.UNKNOWN_TYPE,
      details: isSet(object.details) ? String(object.details) : undefined,
      attachmentIds: Array.isArray(object?.attachmentIds)
        ? object.attachmentIds.map((e: any) => String(e))
        : [],
      targetedPeers: Array.isArray(object?.targetedPeers) ? object.targetedPeers.map((e: any) => Peer.fromJSON(e)) : [],
    };
  },

  toJSON(message: BugSolution_Revision_ChangeList_WorkUnit): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = bugSolution_Revision_ChangeList_WorkUnit_TypeToJSON(message.type));
    message.details !== undefined && (obj.details = message.details);
    if (message.attachmentIds) {
      obj.attachmentIds = message.attachmentIds.map((e) => e);
    } else {
      obj.attachmentIds = [];
    }
    if (message.targetedPeers) {
      obj.targetedPeers = message.targetedPeers.map((e) => e ? Peer.toJSON(e) : undefined);
    } else {
      obj.targetedPeers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BugSolution_Revision_ChangeList_WorkUnit>, I>>(
    object: I,
  ): BugSolution_Revision_ChangeList_WorkUnit {
    const message = createBaseBugSolution_Revision_ChangeList_WorkUnit();
    message.type = object.type ?? BugSolution_Revision_ChangeList_WorkUnit_Type.UNKNOWN_TYPE;
    message.details = object.details ?? undefined;
    message.attachmentIds = object.attachmentIds?.map((e) => e) || [];
    message.targetedPeers = object.targetedPeers?.map((e) => Peer.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(BugSolution_Revision_ChangeList_WorkUnit.$type, BugSolution_Revision_ChangeList_WorkUnit);

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
