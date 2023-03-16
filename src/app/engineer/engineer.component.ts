import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.scss'],
})
export class EngineerComponent {
  users: any[] = [];
  i: number = 0
  s: string =  "engineer";
  result: boolean = false;
  default: string = "../../assets/images/default.jpg";
  constructor(
    firestore: AngularFirestore,
    private authService: AuthServiceService,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getEngineers();
  }

  getEngineers() {
    console.log(this.s);
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

  handleDelete(email: string, password:string, id: string){
    console.log("delete?");
    this.result = confirm("Are you sure to delete?");
    if(this.result){
      this.authService.deleteUserFromAuth(email, password);
      this.usersService.deleteSingleUser(id).then(() => {
      console.log('deleted successfully');
    }).catch(error => {
      console.log(error);
    })
    }
  }

}
