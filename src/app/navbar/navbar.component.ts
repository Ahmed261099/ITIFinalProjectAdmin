import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public authService: AuthServiceService) {}

  // logout() {
  //   console.log('logged out');
  //   this.authService.logoutUser();
  //   console.log('logged out successfully');
  // }
}
