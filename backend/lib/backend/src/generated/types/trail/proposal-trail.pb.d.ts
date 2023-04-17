import { BugFixTrail } from "./bug-fix-proposal-trail.pb";
export declare const protobufPackage = "trail";
/**
 * All information required to build a proposal.
 * Next Id: 5
 */
export interface ProposalTrail {
    $type: "trail.ProposalTrail";
    readonly id: string | undefined;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly dataType: ProposalTrail_DataType;
    data?: {
        $case: "bugFix";
        bugFix: BugFixTrail;
    };
}
/** Type of the proposal data. */
export declare enum ProposalTrail_DataType {
    UNKNOWN_TYPE = "UNKNOWN_TYPE",
    FEATURE = "FEATURE",
    BUG_FIX = "BUG_FIX",
    NEW_TOOL = "NEW_TOOL",
    IMPROVEMENT = "IMPROVEMENT",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function proposalTrail_DataTypeFromJSON(object: any): ProposalTrail_DataType;
export declare function proposalTrail_DataTypeToJSON(object: ProposalTrail_DataType): string;
export declare const ProposalTrail: {
    $type: "trail.ProposalTrail";
    fromJSON(object: any): ProposalTrail;
    toJSON(message: ProposalTrail): unknown;
    fromPartial<I extends {
        data?: ({
            bugFix?: {
                origin?: {
                    comment?: string | undefined;
                    causes?: readonly {
                        type?: import("./bug-fix-proposal-trail.pb").BugOrigin_Cause_Type | undefined;
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
                        service?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Service | undefined;
                        severity?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Severity | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
            } | undefined;
        } & {
            $case: "bugFix";
        }) | undefined;
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        dataType?: ProposalTrail_DataType | undefined;
    } & {
        data?: ({
            bugFix?: {
                origin?: {
                    comment?: string | undefined;
                    causes?: readonly {
                        type?: import("./bug-fix-proposal-trail.pb").BugOrigin_Cause_Type | undefined;
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
                        service?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Service | undefined;
                        severity?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Severity | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
            } | undefined;
        } & {
            $case: "bugFix";
        } & {
            bugFix?: ({
                origin?: {
                    comment?: string | undefined;
                    causes?: readonly {
                        type?: import("./bug-fix-proposal-trail.pb").BugOrigin_Cause_Type | undefined;
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
                        service?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Service | undefined;
                        severity?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Severity | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        type?: import("./bug-fix-proposal-trail.pb").BugOrigin_Cause_Type | undefined;
                        comment?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                    }[] | undefined;
                } & {
                    comment?: string | undefined;
                    causes?: (readonly {
                        type?: import("./bug-fix-proposal-trail.pb").BugOrigin_Cause_Type | undefined;
                        comment?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                    }[] & readonly ({
                        type?: import("./bug-fix-proposal-trail.pb").BugOrigin_Cause_Type | undefined;
                        comment?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                    } & {
                        type?: import("./bug-fix-proposal-trail.pb").BugOrigin_Cause_Type | undefined;
                        comment?: string | undefined;
                        attachmentIds?: (readonly string[] & readonly string[] & { [K in Exclude<keyof I["data"]["bugFix"]["origin"]["causes"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
                    } & { [K_1 in Exclude<keyof I["data"]["bugFix"]["origin"]["causes"][number], "type" | "$type" | "comment" | "attachmentIds">]: never; })[] & { [K_2 in Exclude<keyof I["data"]["bugFix"]["origin"]["causes"], "$type" | keyof readonly {
                        type?: import("./bug-fix-proposal-trail.pb").BugOrigin_Cause_Type | undefined;
                        comment?: string | undefined;
                        attachmentIds?: readonly string[] | undefined;
                    }[]>]: never; }) | undefined;
                } & { [K_3 in Exclude<keyof I["data"]["bugFix"]["origin"], "$type" | "comment" | "causes">]: never; }) | undefined;
                ticket?: ({
                    comment?: string | undefined;
                    ticketUrl?: string | undefined;
                    ticketDescription?: string | undefined;
                    resourcesUrls?: readonly string[] | undefined;
                } & {
                    comment?: string | undefined;
                    ticketUrl?: string | undefined;
                    ticketDescription?: string | undefined;
                    resourcesUrls?: (readonly string[] & readonly string[] & { [K_4 in Exclude<keyof I["data"]["bugFix"]["ticket"]["resourcesUrls"], "$type" | keyof readonly string[]>]: never; }) | undefined;
                } & { [K_5 in Exclude<keyof I["data"]["bugFix"]["ticket"], "$type" | "comment" | "ticketUrl" | "ticketDescription" | "resourcesUrls">]: never; }) | undefined;
                impact?: ({
                    engServicesImpact?: readonly {
                        service?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Service | undefined;
                        severity?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Severity | undefined;
                        comment?: string | undefined;
                    }[] | undefined;
                    impactOnUsers?: {
                        comment?: string | undefined;
                        areUsersAffected?: boolean | undefined;
                    } | undefined;
                } & {
                    engServicesImpact?: (readonly {
                        service?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Service | undefined;
                        severity?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Severity | undefined;
                        comment?: string | undefined;
                    }[] & readonly ({
                        service?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Service | undefined;
                        severity?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Severity | undefined;
                        comment?: string | undefined;
                    } & {
                        service?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Service | undefined;
                        severity?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Severity | undefined;
                        comment?: string | undefined;
                    } & { [K_6 in Exclude<keyof I["data"]["bugFix"]["impact"]["engServicesImpact"][number], "service" | "severity" | "$type" | "comment">]: never; })[] & { [K_7 in Exclude<keyof I["data"]["bugFix"]["impact"]["engServicesImpact"], "$type" | keyof readonly {
                        service?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Service | undefined;
                        severity?: import("./bug-fix-proposal-trail.pb").BugImpact_EngServiceImpact_Severity | undefined;
                        comment?: string | undefined;
                    }[]>]: never; }) | undefined;
                    impactOnUsers?: ({
                        comment?: string | undefined;
                        areUsersAffected?: boolean | undefined;
                    } & {
                        comment?: string | undefined;
                        areUsersAffected?: boolean | undefined;
                    } & { [K_8 in Exclude<keyof I["data"]["bugFix"]["impact"]["impactOnUsers"], "$type" | "comment" | "areUsersAffected">]: never; }) | undefined;
                } & { [K_9 in Exclude<keyof I["data"]["bugFix"]["impact"], "$type" | "engServicesImpact" | "impactOnUsers">]: never; }) | undefined;
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
                    } & { [K_10 in Exclude<keyof I["data"]["bugFix"]["peers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_11 in Exclude<keyof I["data"]["bugFix"]["peers"][number]["user"], "$type" | keyof readonly {
                        id?: string | undefined;
                        email?: string | undefined;
                        photoUrl?: string | undefined;
                        createdAt?: Date | undefined;
                        fullName?: string | undefined;
                        updatedAt?: Date | undefined;
                        role?: import("../account/user/user.pb").UserRole | undefined;
                        teamId?: string | undefined;
                    }[]>]: never; }) | undefined;
                    roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_12 in Exclude<keyof I["data"]["bugFix"]["peers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
                    isManager?: boolean | undefined;
                    isTechLead?: boolean | undefined;
                    shouldProvideApproval?: boolean | undefined;
                } & { [K_13 in Exclude<keyof I["data"]["bugFix"]["peers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_14 in Exclude<keyof I["data"]["bugFix"]["peers"], "$type" | keyof readonly {
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: (readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                                details?: string | undefined;
                                attachmentIds?: (readonly string[] & readonly string[] & { [K_15 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
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
                                    } & { [K_16 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_17 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"], "$type" | keyof readonly {
                                        id?: string | undefined;
                                        email?: string | undefined;
                                        photoUrl?: string | undefined;
                                        createdAt?: Date | undefined;
                                        fullName?: string | undefined;
                                        updatedAt?: Date | undefined;
                                        role?: import("../account/user/user.pb").UserRole | undefined;
                                        teamId?: string | undefined;
                                    }[]>]: never; }) | undefined;
                                    roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_18 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
                                    isManager?: boolean | undefined;
                                    isTechLead?: boolean | undefined;
                                    shouldProvideApproval?: boolean | undefined;
                                } & { [K_19 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_20 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"], "$type" | keyof readonly {
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
                            } & { [K_21 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number]["workUnits"][number], "type" | "details" | "$type" | "attachmentIds" | "targetedPeers">]: never; })[] & { [K_22 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number]["workUnits"], "$type" | keyof readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        } & { [K_23 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"][number], "$type" | "goal" | "workUnits">]: never; })[] & { [K_24 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number]["changeList"], "$type" | keyof readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                    } & { [K_25 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"][number], "$type" | "comment" | "systemTarget" | "changeList">]: never; })[] & { [K_26 in Exclude<keyof I["data"]["bugFix"]["solution"]["revision"], "$type" | keyof readonly {
                        comment?: string | undefined;
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                } & { [K_27 in Exclude<keyof I["data"]["bugFix"]["solution"], "$type" | "comment" | "revision">]: never; }) | undefined;
                alternatives?: (readonly {
                    comment?: string | undefined;
                    revision?: readonly {
                        comment?: string | undefined;
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: (readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
                                details?: string | undefined;
                                attachmentIds?: (readonly string[] & readonly string[] & { [K_28 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["attachmentIds"], "$type" | keyof readonly string[]>]: never; }) | undefined;
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
                                    } & { [K_29 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"][number], "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; })[] & { [K_30 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["user"], "$type" | keyof readonly {
                                        id?: string | undefined;
                                        email?: string | undefined;
                                        photoUrl?: string | undefined;
                                        createdAt?: Date | undefined;
                                        fullName?: string | undefined;
                                        updatedAt?: Date | undefined;
                                        role?: import("../account/user/user.pb").UserRole | undefined;
                                        teamId?: string | undefined;
                                    }[]>]: never; }) | undefined;
                                    roles?: (readonly import("./common.pb").Peer_Role[] & readonly import("./common.pb").Peer_Role[] & { [K_31 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number]["roles"], "$type" | keyof readonly import("./common.pb").Peer_Role[]>]: never; }) | undefined;
                                    isManager?: boolean | undefined;
                                    isTechLead?: boolean | undefined;
                                    shouldProvideApproval?: boolean | undefined;
                                } & { [K_32 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"][number], "user" | "$type" | "roles" | "isManager" | "isTechLead" | "shouldProvideApproval">]: never; })[] & { [K_33 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number]["targetedPeers"], "$type" | keyof readonly {
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
                            } & { [K_34 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"][number], "type" | "details" | "$type" | "attachmentIds" | "targetedPeers">]: never; })[] & { [K_35 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number]["workUnits"], "$type" | keyof readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                        } & { [K_36 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"][number], "$type" | "goal" | "workUnits">]: never; })[] & { [K_37 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number]["changeList"], "$type" | keyof readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                    } & { [K_38 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"][number], "$type" | "comment" | "systemTarget" | "changeList">]: never; })[] & { [K_39 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number]["revision"], "$type" | keyof readonly {
                        comment?: string | undefined;
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
                } & { [K_40 in Exclude<keyof I["data"]["bugFix"]["alternatives"][number], "$type" | "comment" | "revision">]: never; })[] & { [K_41 in Exclude<keyof I["data"]["bugFix"]["alternatives"], "$type" | keyof readonly {
                    comment?: string | undefined;
                    revision?: readonly {
                        comment?: string | undefined;
                        systemTarget?: import("./bug-fix-proposal-trail.pb").BugSolution_SystemTarget | undefined;
                        changeList?: readonly {
                            goal?: string | undefined;
                            workUnits?: readonly {
                                type?: import("./bug-fix-proposal-trail.pb").BugSolution_Revision_ChangeList_WorkUnit_Type | undefined;
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
            } & { [K_42 in Exclude<keyof I["data"]["bugFix"], "origin" | "$type" | "ticket" | "impact" | "peers" | "solution" | "alternatives">]: never; }) | undefined;
            $case: "bugFix";
        } & { [K_43 in Exclude<keyof I["data"], "$type" | "$case" | "bugFix">]: never; }) | undefined;
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        dataType?: ProposalTrail_DataType | undefined;
    } & { [K_44 in Exclude<keyof I, "data" | "id" | "createdAt" | "$type" | "updatedAt" | "dataType">]: never; }>(object: I): ProposalTrail;
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
