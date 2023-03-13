// import { AnimationDriver } from '@angular/animations/browser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

    constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
        this.userLoggedIn = false;

        this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
            if (user?.uid === "3F7lmjgoX1aQA2ScNfQ7ZbmgHum2") {
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
            }
        });
    }

    loginUser(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(({user}) => {
              if(user?.uid === "3F7lmjgoX1aQA2ScNfQ7ZbmgHum2"){
                console.log('login success');
                localStorage.setItem("token", "true");
                this.router.navigate(['/engineer']);
              }
              else{
                alert("you are not admin");
                this.router.navigate(['/login']);
              }

            })
            .catch(error => {
                console.log('error code', error.code);
                this.router.navigate(['/login']);
            });
    }

    logoutUser(): Promise<void> {
        return this.afAuth.signOut()
            .then(() => {
              localStorage.removeItem("token")
                this.router.navigate(['/login']);
            })
            .catch(error => {
                console.log('Auth Service: logout error...');
                console.log('error code', error.code);
                console.log('error', error);
                if (error.code)
                    return error;
            });
    }

    setUserInfo(payload: object) {
        console.log('Auth Service: saving user info...');
        this.afs.collection('users')
            .add(payload).then(function (res) {
                console.log("Auth Service: setUserInfo response...")
                console.log(res);
            })
    }

    getCurrentUser() {
        return this.afAuth.currentUser;
    }
}
