import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupNextComponent } from './auth/signup-next/signup-next.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { GuestGuard } from './shared/guard/guest.guard';
import { DtUserGuard } from './shared/guard/dt-user.guard';
import { EmailVerifiedIncompleteGuard } from './shared/guard/email-verified-incomplete.guard';
import { EmailVerifiedCompleteGuard } from './shared/guard/email-verified-complete.guard';
import { DtUserMissingGuard } from './shared/guard/dt-user-missing.guard';
import { InboxAllComponent } from './home/inbox/inbox-all/inbox-all.component';
import { InboxNewComponent } from './home/inbox/inbox-new/inbox-new.component';
import { InboxMentionedComponent } from './home/inbox/inbox-mentioned/inbox-mentioned.component';
import { InboxApprovedComponent } from './home/inbox/inbox-approved/inbox-approved.component';
import { InboxArchivedComponent } from './home/inbox/inbox-archived/inbox-archived.component';
import { ProposalAllComponent } from './home/proposal/proposal-all/proposal-all.component';
import { ProposalDraftComponent } from './home/proposal/proposal-draft/proposal-draft.component';
import { ProposalSharedComponent } from './home/proposal/proposal-shared/proposal-shared.component';
import { TrashComponent } from './home/trash/trash.component';
import { ComposeTrailBugfixComponent } from './_deprecated-resources/compose/compose-trail-bugfix/compose-trail-bugfix.component';
import { JgraphWhiteBackgroundComponent } from './home/proposal/jgraph-white-background/jgraph-white-background.component';
import { COMPOSE_PATH } from './store/app.reducer';
import { TermsAndConditionsComponent } from './terms/terms-and-conditions/terms-and-conditions.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'inbox',
    canActivate: [AuthGuard, DtUserGuard],
    children: [
      { path: 'all', component: InboxAllComponent },
      { path: 'new', component: InboxNewComponent },
      { path: 'mentioned', component: InboxMentionedComponent },
      { path: 'approved', component: InboxApprovedComponent },
      { path: 'dashboard', component: InboxArchivedComponent },
    ],
  },
  {
    path: 'proposal',
    canActivate: [AuthGuard, DtUserGuard],
    children: [
      { path: 'all', component: ProposalAllComponent },
      { path: 'draft', component: ProposalDraftComponent },
      { path: 'shared', component: ProposalSharedComponent },
    ],
  },
  {
    path: COMPOSE_PATH.slice(1),
    component: JgraphWhiteBackgroundComponent,
    canActivate: [AuthGuard, DtUserGuard],
  },
  {
    path: 'dashboard',
    component: InboxArchivedComponent,
    canActivate: [AuthGuard, DtUserGuard],
  },
  {
    path: 'trash',
    component: TrashComponent,
    canActivate: [AuthGuard, DtUserGuard],
  },
  {
    path: 'editor',
    component: ComposeTrailBugfixComponent,
    canActivate: [AuthGuard, DtUserGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [GuestGuard] },
  {
    path: 'signup/next',
    component: SignupNextComponent,
    canActivate: [AuthGuard, EmailVerifiedCompleteGuard, DtUserMissingGuard],
  },
  {
    path: 'verify',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard, EmailVerifiedIncompleteGuard],
  },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'audit', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
