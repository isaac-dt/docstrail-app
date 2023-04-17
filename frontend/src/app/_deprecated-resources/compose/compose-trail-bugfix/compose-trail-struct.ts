import {
  BugImpact_EngServiceImpact_Service,
  BugImpact_EngServiceImpact_Severity,
  BugOrigin_Cause_Type,
} from 'src/app/generated/types/trail/bug-fix-proposal-trail.pb';

/** Identifies all bug fix form inputs. */
export enum BugFixFormInputId {
  WHAT_HAPPENED_DESCRIPTION,
  WHAT_HAPPENED_RESOURCES,
  WHAT_IMPACTED_ENG_SERVICE,
  WHAT_IMPACTED_SEVERITY,
  WHAT_IMPACTED_COMMENT,
  ARE_USERS_AFFECTED,
  ARE_USERS_AFFECTED_COMMENT,
}

/** Sections of a bug fix proposal. */
export enum BugFixProposalSection {
  WHAT_HAPPENED,
  WHAT_WAS_IMPACTED,
  USERS_AFFECTED,
  WHAT_CAUSED,
  REVIEWERS,
  NONE,
}

/** Trail form tab. */
export enum TrailFormTab {
  BACKGROUND,
  ANALYSIS,
  PEERS,
}

/** Map of Trail form tabs to their sections. */
export const trailFormSectionsToTab = new Map<
  BugFixProposalSection,
  TrailFormTab
>([
  [BugFixProposalSection.WHAT_HAPPENED, TrailFormTab.BACKGROUND],
  [BugFixProposalSection.WHAT_WAS_IMPACTED, TrailFormTab.BACKGROUND],
  [BugFixProposalSection.USERS_AFFECTED, TrailFormTab.BACKGROUND],
  [BugFixProposalSection.WHAT_CAUSED, TrailFormTab.ANALYSIS],
  [BugFixProposalSection.REVIEWERS, TrailFormTab.PEERS],
  [BugFixProposalSection.NONE, TrailFormTab.BACKGROUND],
]);

/** UI map to BugImpact_EngServiceImpact_Service. */
export const BugImpact_EngServiceImpact_Service_ToUI = new Map<
  BugImpact_EngServiceImpact_Service,
  string
>([
  [BugImpact_EngServiceImpact_Service.BACKEND, 'Backend'],
  [BugImpact_EngServiceImpact_Service.DATABASE, 'Database'],
  [BugImpact_EngServiceImpact_Service.INFRASTRUCTURE, 'Infrastructure'],
  [BugImpact_EngServiceImpact_Service.OTHER_SERVICE, 'Other'],
  [BugImpact_EngServiceImpact_Service.UX, 'UI/UX'],
]);

export const BugOrigin_Cause_Type_ToUI = new Map<BugOrigin_Cause_Type, string>([
  [BugOrigin_Cause_Type.BAD_NEW_CODE, 'Defective code'],
  [BugOrigin_Cause_Type.LIBRARY_MALFUNCTION, 'Library dependency'],
  [BugOrigin_Cause_Type.DEPRECATION_FALLOUT, 'Deprecation efforts'],
  [
    BugOrigin_Cause_Type.SIDE_EFFECTS_FROM_OTHER_CODES,
    'Side effect from other changes',
  ],
  [
    BugOrigin_Cause_Type.POOR_PLANNING,
    'Incomplete requirements / Poor planning',
  ],
  [BugOrigin_Cause_Type.EDGE_CASE, 'Edge case'],
  [BugOrigin_Cause_Type.VENDOR_FAILURE, 'Vendor failure'],
  [BugOrigin_Cause_Type.OTHER_TYPE, 'Other'],
]);

/** UI map to BugImpact_EngServiceImpact_Severity. */
export const BugImpact_EngServiceImpact_Severity_UIMap = new Map<
  BugImpact_EngServiceImpact_Severity,
  string
>([
  [BugImpact_EngServiceImpact_Severity.MOST, 'Most'],
  [BugImpact_EngServiceImpact_Severity.SOME, 'Some'],
  [BugImpact_EngServiceImpact_Severity.NEGLIGEABLE, 'Negligeable'],
]);

/** Trail entries from enums. */
export class TrailList {
  readonly engServices = Array.from(
    BugImpact_EngServiceImpact_Service_ToUI.entries()
  );
  readonly impactSeverities = Array.from(
    BugImpact_EngServiceImpact_Severity_UIMap.entries()
  );
  readonly bugCauses = Array.from(BugOrigin_Cause_Type_ToUI.entries());
}
