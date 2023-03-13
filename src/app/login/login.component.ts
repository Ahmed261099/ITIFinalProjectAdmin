// import { Component } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// // import { AngularFirestore } from '@angular/fire/compat/firestore';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// // import { ToastrService } from 'ngx-toastr';
// // import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {

//   loginUser: FormGroup;
//   loading: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private afAuth: AngularFireAuth,
//     // private toastr: ToastrService,
//     private router: Router,
//     // private firebaseError: FirebaseCodeErrorService
//   ) {
//     this.loginUser = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     })
//   }

//   ngOnInit(): void {}

//   login() {
//     const email = this.loginUser.value.email;
//     const password = this.loginUser.value.password;

//     this.loading = true;
//     this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
//       this.router.navigate(['/engineer']);
//       // if(user.user?.emailVerified) {
//       //   this.router.navigate(['/dashboard']);
//       // } else {
//       //   this.router.navigate(['/engineer']);
//       // }
//     }).catch((error) => {
//       this.loading = false;
//       console.log('Error ' + error.code);
//       // this.toastr.error(this.firebaseError.codeError(error.code), );
//     })
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isProgressVisible: boolean;
    loginForm: FormGroup;
    firebaseErrorMessage: string;
    loading: boolean = false;

    constructor(private authService: AuthServiceService, private router: Router, private afAuth: AngularFireAuth) {

        this.isProgressVisible = false;

        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });

        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        if (this.authService.userLoggedIn) {  
            this.router.navigate(['/engineer']);
        }
    }

    loginUser() {
        this.isProgressVisible = true;                          

        if (this.loginForm.invalid)
            return;

        this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
            this.isProgressVisible = false; 
            // console.log(result);                    
            if (result == null) {   
              if (this.authService.userLoggedIn) {                            
                console.log('logging in...');
                this.router.navigate(['/engineer']); 
              }
              else{
                console.log("you are not admin");
                // this.loginForm.reset();
              }             
            }
            else if (result.isValid == false) {
                console.log('login error', result);
                this.firebaseErrorMessage = result.message;
            }
        });
    }
}
