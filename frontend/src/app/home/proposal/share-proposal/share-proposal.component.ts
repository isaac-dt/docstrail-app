import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import {
  selectIsProposalReviewMode,
  selectSelectedProposalInfo,
  selecteSelectedProposalPermissions,
} from 'src/app/store/app.reducer';
import { MultiEntriesContext } from '../../common-components/trail-multi-entries/trail-multi-entries.component';
import { WriteShareProposalRequest } from 'src/app/generated/types/trail/proposal/proposal.api.pb';
import { Proposal } from 'src/app/generated/types/trail/proposal/proposal.pb';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionOp } from 'src/app/generated/types/permission.pb';
import { uploadShareProposalRequest } from 'src/app/store/app.actions/proposal.actions';
import { TextInputContext } from '../../common-components/trail-text-input/trail-text-input.component';
import { Validators } from '@angular/forms';
import { DropdownContext } from '../../common-components/trail-dropdown/trail-dropdown.component';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-share-proposal',
  templateUrl: './share-proposal.component.html',
  styleUrls: ['./share-proposal.component.scss'],
})
export class ShareProposalComponent implements OnDestroy, AfterViewInit {
  @ViewChild('shareMenuTrigger') shareMenuTrigger!: MatMenuTrigger;
  @Input('useAddIcon') useAddIcon?: boolean = false;
  @Input('default') default?: PermissionOp;
  @Input('useReviewMode') useReviewMode: boolean = false;
  @Output('onEmitMenuTrigger') triggerEmitter =
    new EventEmitter<MatMenuTrigger>();

  readonly PermissionOp = PermissionOp;
  readonly selectedProposalPermissions$ = this.store.select(
    selecteSelectedProposalPermissions
  );
  readonly selectedProposalInfo$ = this.store.select(
    selectSelectedProposalInfo
  );
  readonly isReviewMode$ = this.store.select(selectIsProposalReviewMode);
  readonly destroyed = new ReplaySubject<void>();

  textInputContext?: TextInputContext;
  selectionContext?: DropdownContext;

  constructor(readonly store: Store, readonly snackbar: MatSnackBar) {}

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngAfterViewInit() {
    this.triggerEmitter.emit(this.shareMenuTrigger);
  }

  submitNewReviewersRequest(proposal: Proposal) {
    const accessorEmail = this.textInputContext!.control.value;
    const operation = this.selectionContext!.control.value;
    if (!accessorEmail) {
      this.textInputContext!.control.setErrors({ required: true });
      this.textInputContext!.clearErrorAfterDelay();
      return;
    }
    const request = WriteShareProposalRequest.fromPartial({
      proposalId: proposal.id,
      accessorEmail,
      operation,
    });
    this.store.dispatch(uploadShareProposalRequest({ request }));
    this.shareMenuTrigger.closeMenu();
    this.textInputContext!.control.reset();
    this.textInputContext!.control.setErrors(null);
  }

  saveTextInputContext(context: TextInputContext) {
    this.textInputContext = context;
    this.textInputContext.addValidators(Validators.required);
  }

  saveDropdownContext(context: DropdownContext) {
    this.selectionContext = context;
    if (!this.default) {
      this.isReviewMode$
        .pipe(takeUntil(this.destroyed))
        .subscribe((isReviewMode) => {
          if (isReviewMode === true) {
            this.selectionContext?.setValue(PermissionOp.REVIEW);
          } else {
            this.selectionContext?.setValue(PermissionOp.ALL);
          }
        });
    }
  }
}
