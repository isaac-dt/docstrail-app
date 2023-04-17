import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../store/app.reducer';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  readonly isLoading$ = this.store.select(selectIsLoading);
  constructor(readonly store: Store) {}
}
