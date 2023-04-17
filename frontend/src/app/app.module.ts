import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StoreModule } from '@ngrx/store';
import { appStoreReducer, APP_STORE } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from './store/app.effects/app.effects';
import { SignupNextComponent } from './auth/signup-next/signup-next.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthEffects } from './store/app.effects/auth.effects';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { TemplatesComponent } from './_deprecated-resources/templates.component';
import { TemplateDetailsComponent } from './_deprecated-resources/template-details.component';
import { CreateTemplateComponent } from './_deprecated-resources/create-template/create-template.component';
import { BuildTemplateComponent } from './_deprecated-resources/create-template/build-template/build-template.component';
import { ImportTemplateComponent } from './_deprecated-resources/create-template/import-template/import-template.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PackageComponent } from './_deprecated-resources/package/package.component';
import { BuildPackageComponent } from './_deprecated-resources/package/build-package/build-package.component';
import { MatSliderModule } from '@angular/material/slider';
import { TriggerSelectorComponent } from './_deprecated-resources/trigger-selector/trigger-selector.component';
import { InboxAllComponent } from './home/inbox/inbox-all/inbox-all.component';
import { InboxPageComponent } from './home/inbox/inbox-page/inbox-page.component';
import { InboxNewComponent } from './home/inbox/inbox-new/inbox-new.component';
import { InboxMentionedComponent } from './home/inbox/inbox-mentioned/inbox-mentioned.component';
import { InboxApprovedComponent } from './home/inbox/inbox-approved/inbox-approved.component';
import { InboxArchivedComponent } from './home/inbox/inbox-archived/inbox-archived.component';
import { ProposalAllComponent } from './home/proposal/proposal-all/proposal-all.component';
import { ProposalDraftComponent } from './home/proposal/proposal-draft/proposal-draft.component';
import { ProposalSharedComponent } from './home/proposal/proposal-shared/proposal-shared.component';
import { ProposalPageComponent } from './home/proposal/proposal-page/proposal-page.component';
import { TrashComponent } from './home/trash/trash.component';
import { EditorComponent } from './_deprecated-resources/editor/editor.component';
import { QuillModule } from 'ngx-quill';
import quillConfig from './quill-config';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditorContentSuggestionComponent } from './_deprecated-resources/editor/editor-content-suggestion/editor-content-suggestion.component';
import { EditorCollaborationSpaceComponent } from './_deprecated-resources/editor/editor-collaboration-space/editor-collaboration-space.component';
import { EditorTopbarComponent } from './_deprecated-resources/editor/editor-topbar/editor-topbar.component';
import { ComposeDocComponent } from './_deprecated-resources/compose/compose-trail-bugfix/compose-doc/compose-doc.component';
import { ComposeTopbarComponent } from './_deprecated-resources/compose/compose-topbar/compose-topbar.component';
import { ComposeTrailBugfixComponent } from './_deprecated-resources/compose/compose-trail-bugfix/compose-trail-bugfix.component';
import { TrailMultiEntriesComponent } from './home/common-components/trail-multi-entries/trail-multi-entries.component';
import { TrailTextAreaComponent } from './home/common-components/trail-text-area/trail-text-area.component';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { AccountDetailsComponent } from './home/account-details/account-details.component';
import { ComposeNewComponent } from './_deprecated-resources/compose/compose-new/compose-new.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TrailCheckboxComponent } from './home/common-components/trail-checkbox/trail-checkbox.component';
import { TrailDropdownComponent } from './home/common-components/trail-dropdown/trail-dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { TrailFormSectionComponent } from './home/common-components/trail-form-section/trail-form-section.component';
import { TrailFormTabsComponent } from './home/common-components/trail-form-tabs/trail-form-tabs.component';
import { TrailHeaderComponent } from './home/common-components/trail-header/trail-header.component';
import { JgraphTitleRowComponent } from './home/proposal/jgraph-title-row/jgraph-title-row.component';
import { JgraphCommentContainerComponent } from './home/proposal/comment/comment-container/comment-container.component';
import { JgraphWhiteBackgroundComponent } from './home/proposal/jgraph-white-background/jgraph-white-background.component';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { DraftCommentComponent } from './home/proposal/comment/draft-comment/draft-comment.component';
import { JgraphReviewContainerComponent } from './home/proposal/review-container/review-container.component';
import { OldCommentComponent } from './home/proposal/comment/old-comment/old-comment.component';
import { UserAvatarComponent } from './home/account-details/user-avatar/user-avatar.component';
import { MomentModule } from 'ngx-moment';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShareProposalComponent } from './home/proposal/share-proposal/share-proposal.component';
import { RouterModule } from '@angular/router';
import { NotificationDotComponent } from './home/common-components/notification-dot/notification-dot.component';
import { ProposalDataEffects } from './store/app.effects/proposal.data.effects';
import { ProposalUiEffects } from './store/app.effects/proposal.ui.effects';
import { CommentDataEffects } from './store/app.effects/comment.data.effects';
import { CommentUiEffects } from './store/app.effects/comment.ui.effects';
import { JGraphDataEffects } from './store/app.effects/jgraph.data.effects';
import { TrailTextInputComponent } from './home/common-components/trail-text-input/trail-text-input.component';
import { TermsAndConditionsComponent } from './terms/terms-and-conditions/terms-and-conditions.component';
import { ErrorComponent } from './error/error.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { MobileComponent } from './error/mobile/mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoadingComponent,
    SignupNextComponent,
    LoginComponent,
    VerifyEmailComponent,
    SidenavComponent,
    TemplatesComponent,
    CreateTemplateComponent,
    TemplateDetailsComponent,
    BuildTemplateComponent,
    ImportTemplateComponent,
    PackageComponent,
    BuildPackageComponent,
    TriggerSelectorComponent,
    InboxAllComponent,
    InboxPageComponent,
    InboxNewComponent,
    InboxMentionedComponent,
    InboxApprovedComponent,
    InboxArchivedComponent,
    ProposalAllComponent,
    ProposalDraftComponent,
    ProposalSharedComponent,
    ProposalPageComponent,
    TrashComponent,
    EditorComponent,
    EditorContentSuggestionComponent,
    EditorCollaborationSpaceComponent,
    EditorTopbarComponent,
    ComposeDocComponent,
    ComposeTopbarComponent,
    ComposeTrailBugfixComponent,
    TrailMultiEntriesComponent,
    TrailTextAreaComponent,
    TrailTextInputComponent,
    SearchBarComponent,
    AccountDetailsComponent,
    ComposeNewComponent,
    TrailCheckboxComponent,
    TrailDropdownComponent,
    TrailFormSectionComponent,
    TrailFormTabsComponent,
    TrailHeaderComponent,
    JgraphTitleRowComponent,
    JgraphCommentContainerComponent,
    JgraphWhiteBackgroundComponent,
    DraftCommentComponent,
    JgraphReviewContainerComponent,
    OldCommentComponent,
    UserAvatarComponent,
    ShareProposalComponent,
    NotificationDotComponent,
    TermsAndConditionsComponent,
    ErrorComponent,
    MobileComponent,
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatSidenavModule,
    MatTabsModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSliderModule,
    MomentModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        m: 59,
      },
    }),
    QuillModule.forRoot(quillConfig),
    EditorModule,
    provideFirebaseApp(() => initializeApp({ ...environment.firebaseConfig })),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    StoreModule.forRoot({
      [APP_STORE]: appStoreReducer,
      router: routerReducer,
    }),
    EffectsModule.forRoot([
      AppEffects,
      AuthEffects,
      ProposalDataEffects,
      ProposalUiEffects,
      CommentDataEffects,
      CommentUiEffects,
      JGraphDataEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    provideAuth(() => getAuth()),
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 10000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
