import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectDtOrg,
  selectDtUser,
  selectFireAuthUserData,
} from 'src/app/store/app.reducer';
import { submitLogout } from 'src/app/store/app.actions/auth.actions';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent {
  @Input('imageOnly') isImageOnly: boolean = false;
  @Input('sizePx') sizePx: number = 35;
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    try {
      if (
        !this.elRef.nativeElement
          .querySelector('#account-menu-container')
          .contains(event.target) &&
        !this.elRef.nativeElement
          .querySelector('#account-menu-avatar')
          .contains(event.target)
      ) {
        this.toggleIsAccountSettingsVisible();
      }
    } catch {}
  }

  readonly fireAuthUserData$ = this.store.select(selectFireAuthUserData);
  readonly dtUser$ = this.store.select(selectDtUser);
  readonly dtOrg$ = this.store.select(selectDtOrg);

  isAccountSettingsVisible: boolean = false;

  constructor(readonly store: Store, private elRef: ElementRef) {}

  signOut() {
    this.store.dispatch(submitLogout());
  }
  getFullNameInitials(fullName: string = '') {
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join(' ')
      .toLocaleUpperCase();
  }

  toggleIsAccountSettingsVisible() {
    if (this.isImageOnly) return;
    this.isAccountSettingsVisible = !this.isAccountSettingsVisible;
  }
}
