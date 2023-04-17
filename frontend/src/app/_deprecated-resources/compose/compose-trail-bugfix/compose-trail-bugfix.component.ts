import { Component } from '@angular/core';
import { ProposalTrail } from 'src/app/generated/types/trail/proposal-trail.pb';
import { BugFixTrailDataController } from './compose-trail-bugfix-controller';
import { TrailNavigationController } from './compose-trail-nav';
import {
  BugFixProposalSection,
  TrailFormTab,
  TrailList,
} from './compose-trail-struct';

@Component({
  selector: 'app-compose-trail-bugfix',
  templateUrl: './compose-trail-bugfix.component.html',
  styleUrls: ['./compose-trail-bugfix.component.scss'],
})
export class ComposeTrailBugfixComponent {
  readonly Tab = TrailFormTab;
  readonly Section = BugFixProposalSection;
  readonly trailList = new TrailList();
  readonly trailNavController = new TrailNavigationController();
  // TODO: Update to fetch from store instead.
  readonly trailController;

  constructor() {
    this.trailController = new BugFixTrailDataController(
      ProposalTrail.fromPartial({})
    );
  }
}
