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
import { selectFireAuthUserData } from 'src/app/store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
      map((fireAuthUserData) => {
        if (fireAuthUserData) return true;
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
