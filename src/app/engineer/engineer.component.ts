import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.scss'],
})
export class EngineerComponent {
  users: Observable<any[]>;
  constructor(
    firestore: AngularFirestore,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.users = firestore.collection('engineers').valueChanges();

    // console.log(this.users);
  }

  ngOnInit(): void {
    if (!this.authService.userLoggedIn) {  
      this.router.navigate(['/login']);
    }
    
  }

  // products:any=[{
  //   id:1,
  //   name: "yasmin",
  //   age: 20

  // },
  // {
  //   id:1,
  //     name: "yasmin",
  //     age: 20
  // }]

  logout() {
    console.log('logged out');
    this.authService.logoutUser();
    console.log('logged out successfully');
  }
}
