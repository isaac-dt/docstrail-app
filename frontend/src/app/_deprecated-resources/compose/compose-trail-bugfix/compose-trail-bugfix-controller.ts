import {
  BugFixTrail,
  BugImpact,
  BugImpact_EngServiceImpact,
  BugImpact_EngServiceImpact_Service,
  BugImpact_EngServiceImpact_Severity,
  BugImpact_ImpactOnUsers,
  BugTicket,
} from 'src/app/generated/types/trail/bug-fix-proposal-trail.pb';
import {
  ProposalTrail,
  ProposalTrail_DataType,
} from 'src/app/generated/types/trail/proposal-trail.pb';
import { BugFixFormInputId } from './compose-trail-struct';

/** Controller for bugfix trail data handling. */
export class BugFixTrailDataController {
  readonly bugfixTrail: BugFixTrail;

  constructor(public readonly proposalTrail: ProposalTrail) {
    if (!proposalTrail.data?.bugFix) {
      this.proposalTrail.dataType = ProposalTrail_DataType.BUG_FIX;
      this.proposalTrail.data = {
        $case: 'bugFix',
        bugFix: BugFixTrail.fromPartial({}),
      };
    }
    this.bugfixTrail = proposalTrail.data!.bugFix;
  }

  onChange(inputId: BugFixFormInputId) {
    console.log(inputId, this.bugfixTrail);
  }

  getWhatHappenedDescription() {
    return this.bugfixTrail.ticket?.ticketDescription;
  }
  setWhatHappenedDescription(description: string) {
    this.onChange(BugFixFormInputId.WHAT_HAPPENED_DESCRIPTION);
    const ticket = this.bugfixTrail.ticket || BugTicket.fromPartial({});
    ticket.ticketDescription = description;
    this.bugfixTrail.ticket = ticket;
  }

  getWhatHappenedResources() {
    return this.bugfixTrail.ticket?.resourcesUrls;
  }
  addWhatHappenedResource(bugTicketResourcesUrl: string) {
    this.onChange(BugFixFormInputId.WHAT_HAPPENED_RESOURCES);
    const ticket = this.bugfixTrail.ticket || BugTicket.fromPartial({});
    const resourcesUrlsSet = new Set(ticket.resourcesUrls);
    resourcesUrlsSet.add(bugTicketResourcesUrl);
    ticket.resourcesUrls = [...resourcesUrlsSet];
    this.bugfixTrail.ticket = ticket;
  }
  removeWhatHappenedResource(bugTicketResourcesUrl: string) {
    this.onChange(BugFixFormInputId.WHAT_HAPPENED_RESOURCES);
    const ticket = this.bugfixTrail.ticket || BugTicket.fromPartial({});
    const index = ticket.resourcesUrls.findIndex(
      (url) => url === bugTicketResourcesUrl
    );
    if (index > -1) ticket.resourcesUrls.splice(index, 1);
  }

  getEngServicesImpacted() {
    return this.bugfixTrail.impact?.engServicesImpact;
  }
  getEngServiceImpacted(service: BugImpact_EngServiceImpact_Service) {
    return (this.bugfixTrail.impact?.engServicesImpact || []).find(
      (engServiceImpact) => engServiceImpact.service === service
    );
  }
  getHowSevere(service: BugImpact_EngServiceImpact_Service) {
    return (this.bugfixTrail.impact?.engServicesImpact || []).find(
      (engServiceImpact) => engServiceImpact.service === service
    )?.severity;
  }
  getEngServiceImpactedComment(service: BugImpact_EngServiceImpact_Service) {
    return (this.bugfixTrail.impact?.engServicesImpact || []).find(
      (engServiceImpact) => engServiceImpact.service === service
    )?.comment;
  }
  addEngServiceImpacted(
    engServiceImpacted: BugImpact_EngServiceImpact_Service
  ) {
    this.onChange(BugFixFormInputId.WHAT_IMPACTED_ENG_SERVICE);
    const bugImpact = this.bugfixTrail.impact || BugImpact.fromPartial({});
    const servicesImpacts = bugImpact.engServicesImpact || [];
    const impact = BugImpact_EngServiceImpact.fromPartial({});
    impact.service = engServiceImpacted;
    servicesImpacts.push(impact);
    bugImpact.engServicesImpact = servicesImpacts;
    this.bugfixTrail.impact = bugImpact;
  }
  removeEngServiceImpacted(
    engServiceImpacted: BugImpact_EngServiceImpact_Service
  ) {
    this.onChange(BugFixFormInputId.WHAT_IMPACTED_ENG_SERVICE);
    const bugImpact = this.bugfixTrail.impact || BugImpact.fromPartial({});
    const servicesImpacts = bugImpact.engServicesImpact || [];
    const indexToRemove = servicesImpacts.findIndex(
      (impact) => impact.service === engServiceImpacted
    );
    if (indexToRemove > -1) servicesImpacts.splice(indexToRemove, 1);
    bugImpact.engServicesImpact = servicesImpacts;
    this.bugfixTrail.impact = bugImpact;
  }
  setHowSevere(
    engServiceImpacted: BugImpact_EngServiceImpact_Service,
    severity: BugImpact_EngServiceImpact_Severity
  ) {
    this.onChange(BugFixFormInputId.WHAT_IMPACTED_SEVERITY);
    const bugImpact = this.bugfixTrail.impact || BugImpact.fromPartial({});
    const servicesImpacts = bugImpact.engServicesImpact || [];
    const impact = servicesImpacts.find(
      (impact) => impact.service === engServiceImpacted
    );
    if (impact) {
      impact.severity = severity;
    } else {
      const newImpact = BugImpact_EngServiceImpact.fromPartial({});
      newImpact.severity = severity;
      servicesImpacts.push(newImpact);
    }
    bugImpact.engServicesImpact = servicesImpacts;
    this.bugfixTrail.impact = bugImpact;
  }
  setEngServiceImpactedComment(
    engServiceImpacted: BugImpact_EngServiceImpact_Service,
    comment: string
  ) {
    this.onChange(BugFixFormInputId.WHAT_IMPACTED_COMMENT);
    const bugImpact = this.bugfixTrail.impact || BugImpact.fromPartial({});
    const servicesImpacts = bugImpact.engServicesImpact || [];
    const impact = servicesImpacts.find(
      (impact) => impact.service === engServiceImpacted
    );
    if (impact) {
      impact.comment = comment;
    } else {
      const newImpact = BugImpact_EngServiceImpact.fromPartial({});
      newImpact.comment = comment;
      servicesImpacts.push(newImpact);
    }
    bugImpact.engServicesImpact = servicesImpacts;
    this.bugfixTrail.impact = bugImpact;
  }

  getAreAnyUsersAffected() {
    return !!this.bugfixTrail.impact?.impactOnUsers?.areUsersAffected;
  }
  getAreAnyUsersAffectedComment() {
    return this.bugfixTrail.impact?.impactOnUsers?.comment;
  }
  setAreAnyUsersAffected(areUsersAffected: boolean) {
    this.onChange(BugFixFormInputId.ARE_USERS_AFFECTED);
    const bugImpact = this.bugfixTrail.impact || BugImpact.fromPartial({});
    const impactOnUsers =
      bugImpact.impactOnUsers || BugImpact_ImpactOnUsers.fromPartial({});
    impactOnUsers.areUsersAffected = areUsersAffected;
    bugImpact.impactOnUsers = impactOnUsers;
    this.bugfixTrail.impact = bugImpact;
  }
  setAreAnyUsersAffectedComment(comment: string) {
    this.onChange(BugFixFormInputId.ARE_USERS_AFFECTED_COMMENT);
    const bugImpact = this.bugfixTrail.impact || BugImpact.fromPartial({});
    const impactOnUsers =
      bugImpact.impactOnUsers || BugImpact_ImpactOnUsers.fromPartial({});
    impactOnUsers.comment = comment;
    bugImpact.impactOnUsers = impactOnUsers;
    this.bugfixTrail.impact = bugImpact;
  }
}
