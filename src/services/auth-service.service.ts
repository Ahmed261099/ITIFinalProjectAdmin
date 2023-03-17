import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { deleteUser, updateProfile } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import 'ngx-toastr/toastr';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userLoggedIn: boolean;
  userData: any;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user?.uid === "MQmXgjJBU6WGKNuPwB73ctYhmK33") {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {

    // for admin login
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user?.uid === "MQmXgjJBU6WGKNuPwB73ctYhmK33") {
            console.log(user);
            this.userLoggedIn = true;
            this.router.navigate(['Home']);
          }
          else{
            this.userLoggedIn = false;

            this.toastr.error("you are not admin!!");
          }
        });
      })
      .catch((error) => {
        if(error.code === "auth/user-not-found")
          this.toastr.error("user not found");
        else if(error.code === "auth/wrong-password")
          this.toastr.error("wrong password")
        else if(error.code === "auth/user-not-found")
          this.toastr.error("user not found")
        else
          this.toastr.error("invalid..." + error.code)
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  get isLoggedIn(): boolean {

    const user = JSON?.parse(localStorage.getItem('user')!);
    return (user !== null) ? true : false;
  }


  SignUp(email: string, password: string) {
    // authentication new users for login
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        console.log(result.user);
      })
      .catch((error) => {
        this.toastr.error(error.code);
      });
  }

  // async deleteUserFromAuth(email: string, password: string) {
  //   console.log(email, password);
  //   const newUser = this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       var user = userCredential.user;
  //       console.log('Sign In Successfully! ' + user);
  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log(errorCode);
  //     });
  //   return (await this.afAuth.currentUser)?.delete();
  // }

  logoutUser() {
    this.userLoggedIn = false;
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

}
