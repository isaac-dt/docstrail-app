import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PermissionOp } from 'src/app/generated/types/permission.pb';
import { ProposalPermission } from 'src/app/generated/types/trail/proposal/proposal.api.pb';
import { Proposal } from 'src/app/generated/types/trail/proposal/proposal.pb';
import {
  deleteProposal,
  loadProposalDiagram,
} from 'src/app/store/app.actions/proposal.actions';
import { ProposalInfo } from 'src/app/store/app.model';
import { selectDtUser, selectProposalInfos } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-proposal-all',
  templateUrl: './proposal-all.component.html',
  styleUrls: ['./proposal-all.component.scss'],
})
export class ProposalAllComponent {
  readonly PermissionOp = PermissionOp;
  readonly myProposalInfos$ = combineLatest([
    this.store.select(selectProposalInfos),
    this.store.select(selectDtUser),
  ]).pipe(
    map(([proposalInfos, user]) =>
      proposalInfos.filter(
        (proposalInfo) => proposalInfo.proposal.createdBy === user?.id
      )
    )
  );
  constructor(private readonly store: Store) {}

  loadProposal(proposal: Proposal) {
    this.store.dispatch(loadProposalDiagram({ proposal }));
  }

  deleteProposal(proposal: Proposal) {
    this.store.dispatch(deleteProposal({ proposalId: proposal.id! }));
  }

  getTime(time: any) {
    return new Date(time as Date);
  }
}
