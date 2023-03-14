import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.scss'],
})
export class EngineerComponent {
  users: any[] = [];
  i: number = 0
  s: string =  "engineer";
  default: string = "../../assets/images/default.jpg";
  constructor(
    firestore: AngularFirestore,
    private authService: AuthServiceService,
    private usersService: UsersService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getEngineers();
  }

  getEngineers() {
    this.usersService.getUsers(this.s).subscribe(data => {
      this.users = [];
      data.forEach((element: any) => {
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.users);
    });
  }


}
