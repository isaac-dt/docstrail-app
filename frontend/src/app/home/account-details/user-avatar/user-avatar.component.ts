import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/generated/types/account/user/user.pb';
import { selectAvatarColor } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input('user') user!: User;
  @Input('sizePx') sizePx: number = 35;

  readonly avatarColor$ = this.store.select(selectAvatarColor);

  constructor(readonly store: Store) {}

  getFullNameInitials(fullName: string = '') {
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join(' ')
      .toLocaleUpperCase();
  }
}
