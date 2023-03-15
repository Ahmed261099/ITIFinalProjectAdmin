import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    if (this.authService.userLoggedIn) {
      console.log('object');
      this.router.navigate(['/Home']);
    }
  }

  loginUser() {

    if (this.loginForm.invalid) return;

    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        // console.log(result);
        if (result == null) {
          if (this.authService.userLoggedIn) {
            console.log('logging in...');
            this.router.navigate(['/Home']);
          } else {
            // alert('you are not admin');
            // this.loginForm.reset();
          }
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
      });
  }
}
