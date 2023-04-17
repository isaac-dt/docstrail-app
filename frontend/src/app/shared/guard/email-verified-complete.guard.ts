import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable, withLatestFrom } from 'rxjs';
import {
  selectDtUser,
  selectFireAuthUserData,
} from 'src/app/store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class EmailVerifiedCompleteGuard implements CanActivate {
  constructor(readonly store: Store, readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectFireAuthUserData).pipe(
      first((fireAuthUserData) => fireAuthUserData !== undefined),
      withLatestFrom(this.store.select(selectDtUser)),
      map(([fireAuthUserData]) => {
        if (fireAuthUserData?.emailVerified) return true;
        this.router.navigate(['verify']);
        return false;
      })
    );
  }
}
