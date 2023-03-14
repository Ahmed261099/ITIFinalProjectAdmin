import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        this.afAuth.onAuthStateChanged((user) => {
          console.log(user);

            if (user) {
              // this.router.navigate(['/Home']);
                resolve(true);
            } else {
                console.log('user is not logged in');
                resolve(false);
                this.router.navigate(['/login']);
            }
        });
    });

  }

}
