import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public authService: AuthServiceService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if(this.authService.isLoggedIn !== true) {
      console.log("guard");
      this.router.navigate(['login'])
    }
    else {
      console.log("guard login");
      // this.router.navigate(['Home'])

    }
    return true;
    // return new Promise((resolve, reject) => {
    //   this.afAuth.onAuthStateChanged((user) => {
    //     console.log(user);

    //     if (user) {
    //       resolve(true);
    //       // this.router.navigate(['Home']);
    //     } else {
    //       console.log('user is not logged in');
    //       resolve(false);
    //       this.router.navigate(['login']);
    //     }
    //   });
    // });
  }
}
