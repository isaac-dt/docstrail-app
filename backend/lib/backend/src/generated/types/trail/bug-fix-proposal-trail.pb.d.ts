import { Peer } from "./common.pb";
export declare const protobufPackage = "trail";
/**
 * All information required to build a bug-fix proposal.
 * Next Id: 5
 */
export interface BugFixTrail {
    $type: "trail.BugFixTrail";
    readonly ticket: BugTicket | undefined;
    readonly impact: BugImpact | undefined;
    readonly origin: BugOrigin | undefined;
    readonly peers: readonly Peer[];
    readonly solution: BugSolution | undefined;
    readonly alternatives: readonly BugSolution[];
}
/** Bug ticket informration. */
export interface BugTicket {
    $type: "trail.BugTicket";
    readonly ticketUrl: string | undefined;
    readonly ticketDescription: string | undefined;
    readonly comment: string | undefined;
    readonly resourcesUrls: readonly string[];
}
/** Impact of the bug. */
export interface BugImpact {
    $type: "trail.BugImpact";
    readonly engServicesImpact: readonly BugImpact_EngServiceImpact[];
    readonly impactOnUsers: BugImpact_ImpactOnUsers | undefined;
}
/** Impact of the bug on users. */
export interface BugImpact_ImpactOnUsers {
    $type: "trail.BugImpact.ImpactOnUsers";
    readonly areUsersAffected: boolean | undefined;
    readonly comment: string | undefined;
}
/** Impact details on an engineering service. */
export interface BugImpact_EngServiceImpact {
    $type: "trail.BugImpact.EngServiceImpact";
    readonly service: BugImpact_EngServiceImpact_Service;
    readonly severity: BugImpact_EngServiceImpact_Severity;
    readonly comment: string | undefined;
}
/** Engineering services that constitute a system. */
export declare enum BugImpact_EngServiceImpact_Service {
    UNKNOWN_SERVICE = "UNKNOWN_SERVICE",
    OTHER_SERVICE = "OTHER_SERVICE",
    UX = "UX",
    BACKEND = "BACKEND",
    DATABASE = "DATABASE",
    INFRASTRUCTURE = "INFRASTRUCTURE",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function bugImpact_EngServiceImpact_ServiceFromJSON(object: any): BugImpact_EngServiceImpact_Service;
export declare function bugImpact_EngServiceImpact_ServiceToJSON(object: BugImpact_EngServiceImpact_Service): string;
/** Severity of impact on an engineering service. */
export declare enum BugImpact_EngServiceImpact_Severity {
    /** UNKNOWN_SCALE - Temporarily updated to instead show quantity of change. */
    UNKNOWN_SCALE = "UNKNOWN_SCALE",
    MOST = "MOST",
    SOME = "SOME",
    NEGLIGEABLE = "NEGLIGEABLE",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function bugImpact_EngServiceImpact_SeverityFromJSON(object: any): BugImpact_EngServiceImpact_Severity;
export declare function bugImpact_EngServiceImpact_SeverityToJSON(object: BugImpact_EngServiceImpact_Severity): string;
/** Details on what caused the bug. */
export interface BugOrigin {
    $type: "trail.BugOrigin";
    /** List of individual causes that led to the bug. */
    readonly causes: readonly BugOrigin_Cause[];
    /** Comments on the overall origin of the bug. */
    readonly comment: string | undefined;
}
/** a cause (event) that led to the bug. */
export interface BugOrigin_Cause {
    $type: "trail.BugOrigin.Cause";
    readonly type: BugOrigin_Cause_Type;
    /** Details on the cause (event) that led to the bug. */
    readonly comment: string | undefined;
    readonly attachmentIds: readonly string[];
}
/** Possible origins of a bug. */
export declare enum BugOrigin_Cause_Type {
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
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function bugOrigin_Cause_TypeFromJSON(object: any): BugOrigin_Cause_Type;
export declare function bugOrigin_Cause_TypeToJSON(object: BugOrigin_Cause_Type): string;
/** The solution aimed at resolving the bug. */
export interface BugSolution {
    $type: "trail.BugSolution";
    readonly revision: readonly BugSolution_Revision[];
    /** Comments on a particular solution/approach. */
    readonly comment: string | undefined;
}
/** Aspect of the system which could be touched by the solution. */
export declare enum BugSolution_SystemTarget {
    UNKNOWN_TARGET = "UNKNOWN_TARGET",
    OTHER_TARGET = "OTHER_TARGET",
    CODE = "CODE",
    DB_DATA = "DB_DATA",
    INFRASTRUCTURE = "INFRASTRUCTURE",
    VENDOR = "VENDOR",
    DEPENDENCIES = "DEPENDENCIES",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function bugSolution_SystemTargetFromJSON(object: any): BugSolution_SystemTarget;
export declare function bugSolution_SystemTargetToJSON(object: BugSolution_SystemTarget): string;
/** The alterations applied to a target. */
export interface BugSolution_Revision {
    $type: "trail.BugSolution.Revision";
    /** Aspect of the system which could be touched by the solution. */
    readonly systemTarget: BugSolution_SystemTarget;
    /** A set of changes that share the same functionality. */
    readonly changeList: readonly BugSolution_Revision_ChangeList[];
    /** Comments on the goals associated to a revision. */
    readonly comment: string | undefined;
}
/** A set of changes that share the same functionality. */
export interface BugSolution_Revision_ChangeList {
    $type: "trail.BugSolution.Revision.ChangeList";
    readonly goal: string | undefined;
    /** Parts of the system where units/atoms of work reside. */
    readonly workUnits: readonly BugSolution_Revision_ChangeList_WorkUnit[];
}
/** Parts of the system where a unit/atom of work could reside. */
export interface BugSolution_Revision_ChangeList_WorkUnit {
    $type: "trail.BugSolution.Revision.ChangeList.WorkUnit";
    readonly type: BugSolution_Revision_ChangeList_WorkUnit_Type;
    readonly details: string | undefined;
    readonly attachmentIds: readonly string[];
    readonly targetedPeers: readonly Peer[];
}
export declare enum BugSolution_Revision_ChangeList_WorkUnit_Type {
    UNKNOWN_TYPE = "UNKNOWN_TYPE",
    OTHER_TYPE = "OTHER_TYPE",
    HTML_CSS_JS = "HTML_CSS_JS",
    TYPES_OR_STRUCT = "TYPES_OR_STRUCT",
    API_PROVIDED = "API_PROVIDED",
    API_CONSUMED = "API_CONSUMED",
    LIBRARY = "LIBRARY",
    BACKEND_LOGIC = "BACKEND_LOGIC",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function bugSolution_Revision_ChangeList_WorkUnit_TypeFromJSON(object: any): BugSolution_Revision_ChangeList_WorkUnit_Type;
export declare function bugSolution_Revision_ChangeList_WorkUnit_TypeToJSON(object: BugSolution_Revision_ChangeList_WorkUnit_Type): string;
export declare const BugFixTrail: {
    $type: "trail.BugFixTrail";
    fromJSON(object: any): BugFixTrail;
    toJSON(message: BugFixTrail): unknown;
    fromPartial<I extends {
        origin?: {
            comment?: string | undefined;
            causes?: readonly {
                type?: BugOrigin_Cause_Type | undefined;
                comment?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
            }[] | undefined;
        } | undefined;
        ticket?: {
            comment?: string | undefined;
            ticketUrl?: string | undefined;
            ticketDescription?: string | undefined;
            resourcesUrls?: readonly string[] | undefined;
        } | undefined;
        impact?: {
            engServicesImpact?: readonly {
                service?: BugImpact_EngServiceImpact_Service | undefined;
                severity?: BugImpact_EngServiceImpact_Severity | undefined;
                comment?: string | undefined;
            }[] | undefined;
            impactOnUsers?: {
                comment?: string | undefined;
                areUsersAffected?: boolean | undefined;
            } | undefined;
        } | undefined;
        peers?: readonly {
            user?: readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] | undefined;
            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        }[] | undefined;
        solution?: {
            comment?: string | undefined;
            revision?: readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        } | undefined;
        alternatives?: readonly {
            comment?: string | undefined;
            revision?: readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        origin?: ({
            comment?: string | undefined;
            causes?: readonly {
                type?: BugOrigin_Cause_Type | undefined;
                comment?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
            }[] | undefined;
        } & {
            comment?: string | undefined;
            causes?: (readonly {
                type?: BugOrigin_Cause_Type | undefined;
                comment?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
            }[] & readonly ({
                type?: BugOrigin_Cause_Type | undefined;
                comment?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
            } & {
                type?: BugOrigin_Cause_Type | undefined;
                comment?: string | undefined;
                attachmentIds?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["origin"]["causes"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["origin"]["causes"][number], "type" | "$type" | "comment" | "attachmentIds">]: never; })[] & { [K_2 in Exclude<keyof I["origin"]["causes"], "$type" | keyof readonly {
                type?: BugOrigin_Cause_Type | undefined;
                comment?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["origin"], "$type" | "comment" | "causes">]: never; }) | undefined;
        ticket?: ({
            comment?: string | undefined;
            ticketUrl?: string | undefined;
            ticketDescription?: string | undefined;
            resourcesUrls?: readonly string[] | undefined;
        } & {
            comment?: string | undefined;
            ticketUrl?: string | undefined;
            ticketDescription?: string | undefined;
            resourcesUrls?: (readonly string[] & readonly string[] & { [K_4 in Exclude<keyof I["ticket"]["resourcesUrls"], "$type" | keyof readonly string[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["ticket"], "$type" | "comment" | "ticketUrl" | "ticketDescription" | "resourcesUrls">]: never; }) | undefined;
        impact?: ({
            engServicesImpact?: readonly {
                service?: BugImpact_EngServiceImpact_Service | undefined;
                severity?: BugImpact_EngServiceImpact_Severity | undefined;
                comment?: string | undefined;
            }[] | undefined;
            impactOnUsers?: {
                comment?: string | undefined;
                areUsersAffected?: boolean | undefined;
            } | undefined;
        } & {
            engServicesImpact?: (readonly {
                service?: BugImpact_EngServiceImpact_Service | undefined;
                severity?: BugImpact_EngServiceImpact_Severity | undefined;
                comment?: string | undefined;
            }[] & readonly ({
                service?: BugImpact_EngServiceImpact_Service | undefined;
                severity?: BugImpact_EngServiceImpact_Severity | undefined;
                comment?: string | undefined;
            } & {
                service?: BugImpact_EngServiceImpact_Service | undefined;
                severity?: BugImpact_EngServiceImpact_Severity | undefined;
                comment?: string | undefined;
            } & { [K_6 in Exclude<keyof I["impact"]["engServicesImpact"][number], "service" | "severity" | "$type" | "comment">]: never; })[] & { [K_7 in Exclude<keyof I["impact"]["engServicesImpact"], "$type" | keyof readonly {
                service?: BugImpact_EngServiceImpact_Service | undefined;
                severity?: BugImpact_EngServiceImpact_Severity | undefined;
                comment?: string | undefined;
            }[]>]: never; }) | undefined;
            impactOnUsers?: ({
                comment?: string | undefined;
                areUsersAffected?: boolean | undefined;
            } & {
                comment?: string | undefined;
                areUsersAffected?: boolean | undefined;
            } & { [K_8 in Exclude<keyof I["impact"]["impactOnUsers"], "$type" | "comment" | "areUsersAffected">]: never; }) | undefined;
        } & { [K_9 in Exclude<keyof I["impact"], "$type" | "engServicesImpact" | "impactOnUsers">]: never; }) | undefined;
        peers?: (readonly {
            user?: readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] | undefined;
            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        }[] & readonly ({
            user?: readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] | undefined;
            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        } & {
            user?: (readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] & readonly ({
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } & {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } & { [K_10 in Exclude<keyof I["peers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_11 in Exclude<keyof I["peers"][number]["user"], "$type" | keyof readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[]>]: never; }) | undefined;
            roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_12 in Exclude<keyof I["peers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        } & { [K_13 in Exclude<keyof I["peers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_14 in Exclude<keyof I["peers"], "$type" | keyof readonly {
            user?: readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] | undefined;
            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        }[]>]: never; }) | undefined;
        solution?: ({
            comment?: string | undefined;
            revision?: readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            comment?: string | undefined;
            revision?: (readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] & readonly ({
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: (readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] & readonly ({
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                } & {
                    goal?: string | undefined;
                    workUnits?: (readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] & readonly ({
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    } & {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: (readonly string[] & readonly string[] & { [K_15 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
                        targetedPeers?: (readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] & readonly ({
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        } & {
                            user?: (readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] & readonly ({
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            } & {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            } & { [K_16 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_17 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"], "$type" | keyof readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[]>]: never; }) | undefined;
                            roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_18 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        } & { [K_19 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_20 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"], "$type" | keyof readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_21 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number]["workUnits"][number], "type" | "details" | "$type" | "attachmentIds" | "targetedPeers">]: never; })[] & { [K_22 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number]["workUnits"], "$type" | keyof readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_23 in Exclude<keyof I["solution"]["revision"][number]["changeList"][number], "$type" | "goal" | "workUnits">]: never; })[] & { [K_24 in Exclude<keyof I["solution"]["revision"][number]["changeList"], "$type" | keyof readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_25 in Exclude<keyof I["solution"]["revision"][number], "$type" | "comment" | "systemTarget" | "changeList">]: never; })[] & { [K_26 in Exclude<keyof I["solution"]["revision"], "$type" | keyof readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_27 in Exclude<keyof I["solution"], "$type" | "comment" | "revision">]: never; }) | undefined;
        alternatives?: (readonly {
            comment?: string | undefined;
            revision?: readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] & readonly ({
            comment?: string | undefined;
            revision?: readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            comment?: string | undefined;
            revision?: (readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] & readonly ({
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: (readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] & readonly ({
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                } & {
                    goal?: string | undefined;
                    workUnits?: (readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] & readonly ({
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    } & {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: (readonly string[] & readonly string[] & { [K_28 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
                        targetedPeers?: (readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] & readonly ({
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        } & {
                            user?: (readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] & readonly ({
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            } & {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            } & { [K_29 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_30 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"], "$type" | keyof readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[]>]: never; }) | undefined;
                            roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_31 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        } & { [K_32 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_33 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"], "$type" | keyof readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[]>]: never; }) | undefined;
                    } & { [K_34 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number], "type" | "details" | "$type" | "attachmentIds" | "targetedPeers">]: never; })[] & { [K_35 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"], "$type" | keyof readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_36 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"][number], "$type" | "goal" | "workUnits">]: never; })[] & { [K_37 in Exclude<keyof I["alternatives"][number]["revision"][number]["changeList"], "$type" | keyof readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_38 in Exclude<keyof I["alternatives"][number]["revision"][number], "$type" | "comment" | "systemTarget" | "changeList">]: never; })[] & { [K_39 in Exclude<keyof I["alternatives"][number]["revision"], "$type" | keyof readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_40 in Exclude<keyof I["alternatives"][number], "$type" | "comment" | "revision">]: never; })[] & { [K_41 in Exclude<keyof I["alternatives"], "$type" | keyof readonly {
            comment?: string | undefined;
            revision?: readonly {
                comment?: string | undefined;
                systemTarget?: BugSolution_SystemTarget | undefined;
                changeList?: readonly {
                    goal?: string | undefined;
                    workUnits?: readonly {
                        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                        details?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                        targetedPeers?: readonly {
                            user?: readonly {
                                id?: string | undefined;
                                email?: string | undefined;
                                photoUrl?: string | undefined;
                                createdAt?: Date | undefined;
                                fullName?: string | undefined;
                                updatedAt?: Date | undefined;
                                role?: import("../account/user/user.pb").UserRole | undefined;
                                teamId?: string | undefined;
                            }[] | undefined;
                            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                            isManager?: boolean | undefined;
                            isTechLead?: boolean | undefined;
                            shouldProvideApproval?: boolean | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_42 in Exclude<keyof I, "origin" | "$type" | "ticket" | "impact" | "peers" | "solution" | "alternatives">]: never; }>(object: I): BugFixTrail;
};
export declare const BugTicket: {
    $type: "trail.BugTicket";
    fromJSON(object: any): BugTicket;
    toJSON(message: BugTicket): unknown;
    fromPartial<I extends {
        comment?: string | undefined;
        ticketUrl?: string | undefined;
        ticketDescription?: string | undefined;
        resourcesUrls?: readonly string[] | undefined;
    } & {
        comment?: string | undefined;
        ticketUrl?: string | undefined;
        ticketDescription?: string | undefined;
        resourcesUrls?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["resourcesUrls"], "$type" | keyof readonly string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "$type" | "comment" | "ticketUrl" | "ticketDescription" | "resourcesUrls">]: never; }>(object: I): BugTicket;
};
export declare const BugImpact: {
    $type: "trail.BugImpact";
    fromJSON(object: any): BugImpact;
    toJSON(message: BugImpact): unknown;
    fromPartial<I extends {
        engServicesImpact?: readonly {
            service?: BugImpact_EngServiceImpact_Service | undefined;
            severity?: BugImpact_EngServiceImpact_Severity | undefined;
            comment?: string | undefined;
        }[] | undefined;
        impactOnUsers?: {
            comment?: string | undefined;
            areUsersAffected?: boolean | undefined;
        } | undefined;
    } & {
        engServicesImpact?: (readonly {
            service?: BugImpact_EngServiceImpact_Service | undefined;
            severity?: BugImpact_EngServiceImpact_Severity | undefined;
            comment?: string | undefined;
        }[] & readonly ({
            service?: BugImpact_EngServiceImpact_Service | undefined;
            severity?: BugImpact_EngServiceImpact_Severity | undefined;
            comment?: string | undefined;
        } & {
            service?: BugImpact_EngServiceImpact_Service | undefined;
            severity?: BugImpact_EngServiceImpact_Severity | undefined;
            comment?: string | undefined;
        } & { [K in Exclude<keyof I["engServicesImpact"][number], "service" | "severity" | "$type" | "comment">]: never; })[] & { [K_1 in Exclude<keyof I["engServicesImpact"], "$type" | keyof readonly {
            service?: BugImpact_EngServiceImpact_Service | undefined;
            severity?: BugImpact_EngServiceImpact_Severity | undefined;
            comment?: string | undefined;
        }[]>]: never; }) | undefined;
        impactOnUsers?: ({
            comment?: string | undefined;
            areUsersAffected?: boolean | undefined;
        } & {
            comment?: string | undefined;
            areUsersAffected?: boolean | undefined;
        } & { [K_2 in Exclude<keyof I["impactOnUsers"], "$type" | "comment" | "areUsersAffected">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "$type" | "engServicesImpact" | "impactOnUsers">]: never; }>(object: I): BugImpact;
};
export declare const BugImpact_ImpactOnUsers: {
    $type: "trail.BugImpact.ImpactOnUsers";
    fromJSON(object: any): BugImpact_ImpactOnUsers;
    toJSON(message: BugImpact_ImpactOnUsers): unknown;
    fromPartial<I extends {
        comment?: string | undefined;
        areUsersAffected?: boolean | undefined;
    } & {
        comment?: string | undefined;
        areUsersAffected?: boolean | undefined;
    } & { [K in Exclude<keyof I, "$type" | "comment" | "areUsersAffected">]: never; }>(object: I): BugImpact_ImpactOnUsers;
};
export declare const BugImpact_EngServiceImpact: {
    $type: "trail.BugImpact.EngServiceImpact";
    fromJSON(object: any): BugImpact_EngServiceImpact;
    toJSON(message: BugImpact_EngServiceImpact): unknown;
    fromPartial<I extends {
        service?: BugImpact_EngServiceImpact_Service | undefined;
        severity?: BugImpact_EngServiceImpact_Severity | undefined;
        comment?: string | undefined;
    } & {
        service?: BugImpact_EngServiceImpact_Service | undefined;
        severity?: BugImpact_EngServiceImpact_Severity | undefined;
        comment?: string | undefined;
    } & { [K in Exclude<keyof I, "service" | "severity" | "$type" | "comment">]: never; }>(object: I): BugImpact_EngServiceImpact;
};
export declare const BugOrigin: {
    $type: "trail.BugOrigin";
    fromJSON(object: any): BugOrigin;
    toJSON(message: BugOrigin): unknown;
    fromPartial<I extends {
        comment?: string | undefined;
        causes?: readonly {
            type?: BugOrigin_Cause_Type | undefined;
            comment?: string | undefined;
            attachmentIds?: readonly string[] | undefined;
        }[] | undefined;
    } & {
        comment?: string | undefined;
        causes?: (readonly {
            type?: BugOrigin_Cause_Type | undefined;
            comment?: string | undefined;
            attachmentIds?: readonly string[] | undefined;
        }[] & readonly ({
            type?: BugOrigin_Cause_Type | undefined;
            comment?: string | undefined;
            attachmentIds?: readonly string[] | undefined;
        } & {
            type?: BugOrigin_Cause_Type | undefined;
            comment?: string | undefined;
            attachmentIds?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["causes"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["causes"][number], "type" | "$type" | "comment" | "attachmentIds">]: never; })[] & { [K_2 in Exclude<keyof I["causes"], "$type" | keyof readonly {
            type?: BugOrigin_Cause_Type | undefined;
            comment?: string | undefined;
            attachmentIds?: readonly string[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "$type" | "comment" | "causes">]: never; }>(object: I): BugOrigin;
};
export declare const BugOrigin_Cause: {
    $type: "trail.BugOrigin.Cause";
    fromJSON(object: any): BugOrigin_Cause;
    toJSON(message: BugOrigin_Cause): unknown;
    fromPartial<I extends {
        type?: BugOrigin_Cause_Type | undefined;
        comment?: string | undefined;
        attachmentIds?: readonly string[] | undefined;
    } & {
        type?: BugOrigin_Cause_Type | undefined;
        comment?: string | undefined;
        attachmentIds?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "type" | "$type" | "comment" | "attachmentIds">]: never; }>(object: I): BugOrigin_Cause;
};
export declare const BugSolution: {
    $type: "trail.BugSolution";
    fromJSON(object: any): BugSolution;
    toJSON(message: BugSolution): unknown;
    fromPartial<I extends {
        comment?: string | undefined;
        revision?: readonly {
            comment?: string | undefined;
            systemTarget?: BugSolution_SystemTarget | undefined;
            changeList?: readonly {
                goal?: string | undefined;
                workUnits?: readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        comment?: string | undefined;
        revision?: (readonly {
            comment?: string | undefined;
            systemTarget?: BugSolution_SystemTarget | undefined;
            changeList?: readonly {
                goal?: string | undefined;
                workUnits?: readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] & readonly ({
            comment?: string | undefined;
            systemTarget?: BugSolution_SystemTarget | undefined;
            changeList?: readonly {
                goal?: string | undefined;
                workUnits?: readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            comment?: string | undefined;
            systemTarget?: BugSolution_SystemTarget | undefined;
            changeList?: (readonly {
                goal?: string | undefined;
                workUnits?: readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] & readonly ({
                goal?: string | undefined;
                workUnits?: readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                goal?: string | undefined;
                workUnits?: (readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[] & readonly ({
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                } & {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["revision"][number]["changeList"][number]["workUnits"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
                    targetedPeers?: (readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] & readonly ({
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    } & {
                        user?: (readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] & readonly ({
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        } & {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        } & { [K_1 in Exclude<keyof I["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_2 in Exclude<keyof I["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"], "$type" | keyof readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[]>]: never; }) | undefined;
                        roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_3 in Exclude<keyof I["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    } & { [K_4 in Exclude<keyof I["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_5 in Exclude<keyof I["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"], "$type" | keyof readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["revision"][number]["changeList"][number]["workUnits"][number], "type" | "details" | "$type" | "attachmentIds" | "targetedPeers">]: never; })[] & { [K_7 in Exclude<keyof I["revision"][number]["changeList"][number]["workUnits"], "$type" | keyof readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_8 in Exclude<keyof I["revision"][number]["changeList"][number], "$type" | "goal" | "workUnits">]: never; })[] & { [K_9 in Exclude<keyof I["revision"][number]["changeList"], "$type" | keyof readonly {
                goal?: string | undefined;
                workUnits?: readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_10 in Exclude<keyof I["revision"][number], "$type" | "comment" | "systemTarget" | "changeList">]: never; })[] & { [K_11 in Exclude<keyof I["revision"], "$type" | keyof readonly {
            comment?: string | undefined;
            systemTarget?: BugSolution_SystemTarget | undefined;
            changeList?: readonly {
                goal?: string | undefined;
                workUnits?: readonly {
                    type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                    details?: string | undefined;
                    attachmentIds?: readonly string[] | undefined;
                    targetedPeers?: readonly {
                        user?: readonly {
                            id?: string | undefined;
                            email?: string | undefined;
                            photoUrl?: string | undefined;
                            createdAt?: Date | undefined;
                            fullName?: string | undefined;
                            updatedAt?: Date | undefined;
                            role?: import("../account/user/user.pb").UserRole | undefined;
                            teamId?: string | undefined;
                        }[] | undefined;
                        roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                        isManager?: boolean | undefined;
                        isTechLead?: boolean | undefined;
                        shouldProvideApproval?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, "$type" | "comment" | "revision">]: never; }>(object: I): BugSolution;
};
export declare const BugSolution_Revision: {
    $type: "trail.BugSolution.Revision";
    fromJSON(object: any): BugSolution_Revision;
    toJSON(message: BugSolution_Revision): unknown;
    fromPartial<I extends {
        comment?: string | undefined;
        systemTarget?: BugSolution_SystemTarget | undefined;
        changeList?: readonly {
            goal?: string | undefined;
            workUnits?: readonly {
                type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                details?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
                targetedPeers?: readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        comment?: string | undefined;
        systemTarget?: BugSolution_SystemTarget | undefined;
        changeList?: (readonly {
            goal?: string | undefined;
            workUnits?: readonly {
                type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                details?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
                targetedPeers?: readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] & readonly ({
            goal?: string | undefined;
            workUnits?: readonly {
                type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                details?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
                targetedPeers?: readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            goal?: string | undefined;
            workUnits?: (readonly {
                type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                details?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
                targetedPeers?: readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[] | undefined;
            }[] & readonly ({
                type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                details?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
                targetedPeers?: readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                details?: string | undefined;
                attachmentIds?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["changeList"][number]["workUnits"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
                targetedPeers?: (readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[] & readonly ({
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                } & {
                    user?: (readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] & readonly ({
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    } & {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    } & { [K_1 in Exclude<keyof I["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_2 in Exclude<keyof I["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"], "$type" | keyof readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[]>]: never; }) | undefined;
                    roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_3 in Exclude<keyof I["changeList"][number]["workUnits"][number]["targetedPeers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                } & { [K_4 in Exclude<keyof I["changeList"][number]["workUnits"][number]["targetedPeers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_5 in Exclude<keyof I["changeList"][number]["workUnits"][number]["targetedPeers"], "$type" | keyof readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["changeList"][number]["workUnits"][number], "type" | "details" | "$type" | "attachmentIds" | "targetedPeers">]: never; })[] & { [K_7 in Exclude<keyof I["changeList"][number]["workUnits"], "$type" | keyof readonly {
                type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                details?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
                targetedPeers?: readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I["changeList"][number], "$type" | "goal" | "workUnits">]: never; })[] & { [K_9 in Exclude<keyof I["changeList"], "$type" | keyof readonly {
            goal?: string | undefined;
            workUnits?: readonly {
                type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                details?: string | undefined;
                attachmentIds?: readonly string[] | undefined;
                targetedPeers?: readonly {
                    user?: readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[] | undefined;
                    roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_10 in Exclude<keyof I, "$type" | "comment" | "systemTarget" | "changeList">]: never; }>(object: I): BugSolution_Revision;
};
export declare const BugSolution_Revision_ChangeList: {
    $type: "trail.BugSolution.Revision.ChangeList";
    fromJSON(object: any): BugSolution_Revision_ChangeList;
    toJSON(message: BugSolution_Revision_ChangeList): unknown;
    fromPartial<I extends {
        goal?: string | undefined;
        workUnits?: readonly {
            type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
            details?: string | undefined;
            attachmentIds?: readonly string[] | undefined;
            targetedPeers?: readonly {
                user?: readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[] | undefined;
                roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                isManager?: boolean | undefined;
                isTechLead?: boolean | undefined;
                shouldProvideApproval?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        goal?: string | undefined;
        workUnits?: (readonly {
            type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
            details?: string | undefined;
            attachmentIds?: readonly string[] | undefined;
            targetedPeers?: readonly {
                user?: readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[] | undefined;
                roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                isManager?: boolean | undefined;
                isTechLead?: boolean | undefined;
                shouldProvideApproval?: boolean | undefined;
            }[] | undefined;
        }[] & readonly ({
            type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
            details?: string | undefined;
            attachmentIds?: readonly string[] | undefined;
            targetedPeers?: readonly {
                user?: readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[] | undefined;
                roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                isManager?: boolean | undefined;
                isTechLead?: boolean | undefined;
                shouldProvideApproval?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
            details?: string | undefined;
            attachmentIds?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["workUnits"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
            targetedPeers?: (readonly {
                user?: readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[] | undefined;
                roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                isManager?: boolean | undefined;
                isTechLead?: boolean | undefined;
                shouldProvideApproval?: boolean | undefined;
            }[] & readonly ({
                user?: readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[] | undefined;
                roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                isManager?: boolean | undefined;
                isTechLead?: boolean | undefined;
                shouldProvideApproval?: boolean | undefined;
            } & {
                user?: (readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[] & readonly ({
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                } & {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                } & { [K_1 in Exclude<keyof I["workUnits"][number]["targetedPeers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_2 in Exclude<keyof I["workUnits"][number]["targetedPeers"][number]["user"], "$type" | keyof readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[]>]: never; }) | undefined;
                roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_3 in Exclude<keyof I["workUnits"][number]["targetedPeers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
                isManager?: boolean | undefined;
                isTechLead?: boolean | undefined;
                shouldProvideApproval?: boolean | undefined;
            } & { [K_4 in Exclude<keyof I["workUnits"][number]["targetedPeers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_5 in Exclude<keyof I["workUnits"][number]["targetedPeers"], "$type" | keyof readonly {
                user?: readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[] | undefined;
                roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                isManager?: boolean | undefined;
                isTechLead?: boolean | undefined;
                shouldProvideApproval?: boolean | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["workUnits"][number], "type" | "details" | "$type" | "attachmentIds" | "targetedPeers">]: never; })[] & { [K_7 in Exclude<keyof I["workUnits"], "$type" | keyof readonly {
            type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
            details?: string | undefined;
            attachmentIds?: readonly string[] | undefined;
            targetedPeers?: readonly {
                user?: readonly {
                    id?: string | undefined;
                    email?: string | undefined;
                    photoUrl?: string | undefined;
                    createdAt?: Date | undefined;
                    fullName?: string | undefined;
                    updatedAt?: Date | undefined;
                    role?: import("../account/user/user.pb").UserRole | undefined;
                    teamId?: string | undefined;
                }[] | undefined;
                roles?: readonly import("./common.pb").Peer_Role[] | undefined;
                isManager?: boolean | undefined;
                isTechLead?: boolean | undefined;
                shouldProvideApproval?: boolean | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_8 in Exclude<keyof I, "$type" | "goal" | "workUnits">]: never; }>(object: I): BugSolution_Revision_ChangeList;
};
export declare const BugSolution_Revision_ChangeList_WorkUnit: {
    $type: "trail.BugSolution.Revision.ChangeList.WorkUnit";
    fromJSON(object: any): BugSolution_Revision_ChangeList_WorkUnit;
    toJSON(message: BugSolution_Revision_ChangeList_WorkUnit): unknown;
    fromPartial<I extends {
        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
        details?: string | undefined;
        attachmentIds?: readonly string[] | undefined;
        targetedPeers?: readonly {
            user?: readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] | undefined;
            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        }[] | undefined;
    } & {
        type?: BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
        details?: string | undefined;
        attachmentIds?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
        targetedPeers?: (readonly {
            user?: readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] | undefined;
            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        }[] & readonly ({
            user?: readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] | undefined;
            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        } & {
            user?: (readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] & readonly ({
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } & {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            } & { [K_1 in Exclude<keyof I["targetedPeers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_2 in Exclude<keyof I["targetedPeers"][number]["user"], "$type" | keyof readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[]>]: never; }) | undefined;
            roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_3 in Exclude<keyof I["targetedPeers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        } & { [K_4 in Exclude<keyof I["targetedPeers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_5 in Exclude<keyof I["targetedPeers"], "$type" | keyof readonly {
            user?: readonly {
                id?: string | undefined;
                email?: string | undefined;
                photoUrl?: string | undefined;
                createdAt?: Date | undefined;
                fullName?: string | undefined;
                updatedAt?: Date | undefined;
                role?: import("../account/user/user.pb").UserRole | undefined;
                teamId?: string | undefined;
            }[] | undefined;
            roles?: readonly import("./common.pb").Peer_Role[] | undefined;
            isManager?: boolean | undefined;
            isTechLead?: boolean | undefined;
            shouldProvideApproval?: boolean | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "type" | "details" | "$type" | "attachmentIds" | "targetedPeers">]: never; }>(object: I): BugSolution_Revision_ChangeList_WorkUnit;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]>;
} & {
    $case: T["$case"];
} : T extends {} ? {
    [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never;
};
export {};
