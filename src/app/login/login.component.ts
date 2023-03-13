import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
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
