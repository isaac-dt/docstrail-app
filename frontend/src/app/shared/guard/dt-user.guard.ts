import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable, switchMap, of, withLatestFrom } from 'rxjs';
import {
  selectDtUser,
  selectFireAuthUserData,
} from 'src/app/store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class DtUserGuard implements CanActivate {
  constructor(
    readonly store: Store,
    readonly router: Router,
    readonly httpClient: HttpClient
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectDtUser).pipe(
      first((dtUser) => dtUser !== undefined),
      withLatestFrom(this.store.select(selectFireAuthUserData)),
      map(([dtUser, fireAuthUserData]) => {
        if (dtUser) return true;
        if (!fireAuthUserData?.emailVerified)
          this.router.navigate(['signup/next']);
        else this.router.navigate(['error']);
        return false;
      })
    );
  }
}
