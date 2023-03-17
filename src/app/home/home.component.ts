import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public authService: AuthServiceService, private router: Router) {
    // if (!this.authService.userLoggedIn) {
    //   console.log('object');
    //   this.router.navigate(['login']);
    // }

  }

}
