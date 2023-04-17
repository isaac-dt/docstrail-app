import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, combineLatest } from 'rxjs';
import { PermissionOp } from 'src/app/generated/types/permission.pb';
import { ProposalPermission } from 'src/app/generated/types/trail/proposal/proposal.api.pb';
import { Proposal } from 'src/app/generated/types/trail/proposal/proposal.pb';
import { loadProposalDiagram } from 'src/app/store/app.actions/proposal.actions';
import { selectDtUser, selectProposalInfos } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-inbox-all',
  templateUrl: './inbox-all.component.html',
  styleUrls: ['./inbox-all.component.scss'],
})
export class InboxAllComponent {
  readonly PermissionOp = PermissionOp;
  readonly proposalInfosSharedWithMe$ = combineLatest([
    this.store.select(selectProposalInfos),
    this.store.select(selectDtUser),
  ]).pipe(
    map(([proposalInfos, user]) =>
      proposalInfos.filter(
        (proposalInfo) => proposalInfo.proposal.createdBy !== user?.id
      )
    )
  );

  constructor(private readonly store: Store) {}

  loadProposal(proposal: Proposal) {
    this.store.dispatch(loadProposalDiagram({ proposal }));
  }

  getTime(time: any) {
    return new Date(time as Date);
  }
}
