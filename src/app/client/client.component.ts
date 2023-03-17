import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  users: any[] = [];
  i: number = 0;
  s: string = 'client';
  result: boolean = false;
  default: string = '../../assets/images/default.jpg';
  constructor(
    firestore: AngularFirestore,
    private authService: AuthServiceService,
    private usersService: UsersService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   // if (!this.authService.userLoggedIn) {
  //   //   this.router.navigate(['/login']);
  //   // }

  // }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.usersService.getUsers(this.s).subscribe((data) => {
      this.users = [];
      data.forEach((element: any) => {
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.users);
    });
  }

  async handleDelete(email: string, password: string, id: string, role: string) {
    console.log(email, password, id, role);
    console.log('delete?');
    this.result = confirm('Are you sure to delete?');
    if (this.result) {
      // await this.authService.deleteUserFromAuth(email, password);
      this.usersService
        .deleteSingleUser(id, role)
        .then(() => {
          console.log('deleted successfully');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
