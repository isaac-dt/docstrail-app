import { ReplaySubject } from 'rxjs';
import {
  BugFixProposalSection,
  trailFormSectionsToTab,
  TrailFormTab,
} from './compose-trail-struct';

/** Handles the trail form navigation system. */
export class TrailNavigationController {
  readonly visibleSectionsSet = new Set<BugFixProposalSection>();

  isDocVisible: boolean = true;
  activeTrailFormTab?: TrailFormTab;
  areOtherSectionsCollapsed: boolean = true;

  readonly onTabChange = new ReplaySubject<TrailFormTab>();

  constructor() {
    this.visibleSectionsSet.add(BugFixProposalSection.WHAT_HAPPENED);
    this.setTab(TrailFormTab.BACKGROUND);
  }

  isActiveTab(tab: TrailFormTab) {
    return this.activeTrailFormTab === tab;
  }
  isSectionVisible(section: BugFixProposalSection) {
    return this.visibleSectionsSet.has(section);
  }
  openSection(section: BugFixProposalSection) {
    if (this.areOtherSectionsCollapsed) this.visibleSectionsSet.clear();
    this.visibleSectionsSet.add(section);
  }
  toggleSection(section: BugFixProposalSection) {
    if (this.visibleSectionsSet.has(section)) {
      this.visibleSectionsSet.delete(section);
    } else {
      if (this.areOtherSectionsCollapsed) this.visibleSectionsSet.clear();
      this.visibleSectionsSet.add(section);
    }
  }

  /** Closes current section and opens next one. */
  moveToNextSection(section: BugFixProposalSection) {
    this.visibleSectionsSet.delete(section);
    this.visibleSectionsSet.add(section + 1);
    this.setTab(trailFormSectionsToTab.get(section + 1)!);
  }

  setTab(tab: TrailFormTab) {
    this.activeTrailFormTab = tab;
    this.onTabChange.next(tab);
  }
  toggleIsDocVisible() {
    this.isDocVisible = !this.isDocVisible;
  }
}
