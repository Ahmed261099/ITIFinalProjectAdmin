import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { deleteUser, updateProfile } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
// import 'ngx-toastr/toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userLoggedIn: boolean;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {    // for admin login
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // if(user){
        console.log('login success');
        localStorage.setItem('token', 'true');
        this.router.navigate(['/Home']);
        // }
        // else{
        //   alert("you are not admin");
        //   this.router.navigate(['/login']);
        // }
      })
      .catch((error) => {
        alert('error code' + error.code);
        this.router.navigate(['/login']);
      });
  }

  SignUp(email: string, password: string) {                            // authentication new users for login
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        console.log(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async deleteUserFromAuth(email: string, password: string) {
    console.log(email, password);
    this.afAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Sign In SuccessFul! " + user);
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
        });
    return (await this.afAuth.currentUser)?.delete();
  }

  logoutUser(): Promise<void> {
    return this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return error;
      });
  }
}
