import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BugFixTrail } from 'src/app/generated/types/trail/bug-fix-proposal-trail.pb';
import { selectDtOrg, selectDtUser } from 'src/app/store/app.reducer';
import { BugFixTrailDataController } from '../compose-trail-bugfix-controller';

@Component({
  selector: 'app-compose-doc',
  templateUrl: './compose-doc.component.html',
  styleUrls: ['./compose-doc.component.scss'],
})
export class ComposeDocComponent {
  @Input('trailController') trailController!: BugFixTrailDataController;
  docBuilder?: BugfixDocumentBuilder;

  readonly dtUser$ = this.store.select(selectDtUser);
  readonly dtOrg$ = this.store.select(selectDtOrg);

  constructor(readonly store: Store) {}

  ngOnInit() {
    this.docBuilder = new BugfixDocumentBuilder(
      this.trailController.bugfixTrail
    );
  }
}

class BugfixDocumentBuilder {
  constructor(private readonly bugfixTrail: BugFixTrail) {}

  getTitle() {
    return undefined;
  }
  getSummary() {
    return undefined;
  }
  getCreatedAt() {
    return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  }
  getUpdatedAt() {
    return this.getCreatedAt();
  }
  getShareLink() {
    return undefined;
  }
  getBackground() {
    const text = this.bugfixTrail.ticket?.ticketDescription;
    if (!text) return;
    return text[0].toUpperCase() + text.slice(1);
  }
  getEngImpact() {
    let impactText = '';
    for (const impact of this.bugfixTrail.impact?.engServicesImpact || []) {
      if (impact) {
        impactText += `${impact.service} will have changes. ${
          ' -- ' + impact.severity + '.' ?? ''
        } ${impact.comment ?? ''}`;
      }
    }
    return impactText === '' ? undefined : impactText;
  }
  getBackgroundResources() {
    return this.bugfixTrail.ticket?.resourcesUrls;
  }
  getUserImpact() {
    let userImpact = '';
    if (this.bugfixTrail.impact?.impactOnUsers?.areUsersAffected) {
      userImpact = 'Users will be impacted by the changes.';
    }
    const comment = this.bugfixTrail.impact?.impactOnUsers?.comment;
    if (comment) {
      userImpact += ` ${comment[0].toUpperCase()}${comment.slice(1)}.`;
    }
    return userImpact === '' ? undefined : userImpact;
  }
}
