import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox-archived',
  templateUrl: './inbox-archived.component.html',
  styleUrls: ['./inbox-archived.component.scss'],
})
export class InboxArchivedComponent {
  constructor(readonly router: Router) {}

  navigateToMyProposals() {
    this.router.navigate(['proposal', 'all']);
  }

  navigateToSharedWithMe() {
    this.router.navigate(['inbox', 'all']);
  }
}
