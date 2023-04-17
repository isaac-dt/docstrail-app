import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';
import { selectDtUser } from 'src/app/store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class DtUserMissingGuard implements CanActivate {
  constructor(readonly store: Store, readonly router: Router) {}

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
      map((dtUser) => {
        if (!dtUser) return true;
        this.router.navigate(['']);
        return false;
      })
    );
  }
}
