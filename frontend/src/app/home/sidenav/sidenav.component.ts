import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IsCreatePage, QueryParamKey } from 'src/app/shared/route/query-params';
import { resetAndLoadJGraphDiagram } from 'src/app/store/app.actions/proposal.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input('small') isMinWidth: boolean = false;

  constructor(readonly router: Router, private readonly store: Store) {}

  navigateToCompose() {
    this.store.dispatch(resetAndLoadJGraphDiagram());
  }
  navigateToHomepage() {
    this.router.navigate(['']);
  }
}
