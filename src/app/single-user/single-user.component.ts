import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss'],
})
export class SingleUserComponent {
  userId: any;
  User: any;
  role: any;
  default: string = '../../assets/images/default.jpg';

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSingleUser();
  }

  getSingleUser() {
    this.userId = this.route.snapshot.paramMap.get('userID');
    if (this.router.url === `/engineer/viewUser/${this.userId}`) {
      console.log(this.router.url);
      this.role = 'Engineer';
    } else if (this.router.url === `/provider/viewUser/${this.userId}`) {
      console.log(this.router.url);
      this.role = 'Provider';
    } else {
      console.log(this.router.url);
      this.role = 'Client';
    }

    console.log(this.userId);
    this.userService.getSingleUser(this.userId, this.role).subscribe((user) => {
      this.User = user.payload.data();
      console.log(this.User);
    });
  }

  deletefeedback(feedback: any[], i: number) {
    this.userId = this.route.snapshot.paramMap.get('userID');
    console.log(feedback, i, this.userId);
    const newFeedback: any = {
      // feedback: feedback[index]
      feedback: feedback.filter((_, index) => index++ === i),
    };

    console.log(newFeedback);

    this.userService
      .editField(this.userId, newFeedback)
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
