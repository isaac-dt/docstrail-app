import { Component, Input } from '@angular/core';
import { TrailNavigationController } from '../../../_deprecated-resources/compose/compose-trail-bugfix/compose-trail-nav';

@Component({
  selector: 'app-trail-header',
  templateUrl: './trail-header.component.html',
  styleUrls: ['./trail-header.component.scss'],
})
export class TrailHeaderComponent {
  @Input('trailNavController') trailNavController!: TrailNavigationController;
  @Input('title') title: string = 'No title';
  @Input('icon') icon?: string;
}
