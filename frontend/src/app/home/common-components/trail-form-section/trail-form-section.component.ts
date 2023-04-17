import { Component, Input } from '@angular/core';
import { TrailNavigationController } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-nav';
import { BugFixProposalSection } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-struct';

@Component({
  selector: 'app-trail-form-section',
  templateUrl: './trail-form-section.component.html',
  styleUrls: ['./trail-form-section.component.scss'],
})
export class TrailFormSectionComponent {
  @Input('trailNavController')
  trailNavController!: TrailNavigationController;
  @Input('section') section!: BugFixProposalSection;
  @Input('label') label!: string;
}
