import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose-new',
  templateUrl: './compose-new.component.html',
  styleUrls: ['./compose-new.component.scss'],
})
export class ComposeNewComponent {
  constructor(readonly router: Router) {}
  navToNewFeature() {}
  navToBugFix() {
    this.router.navigate(['compose/bugfix']);
  }
  navToImprovement() {}
  navToDraftProposals() {
    this.router.navigate(['proposal', 'draft']);
  }
}
