import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { UsersService } from '../../services/users.service';

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
  result: boolean = false;

  constructor(
    private userService: UsersService,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSingleUser();
  }

  getSingleUser() {
    this.userId = this.route.snapshot.paramMap.get('userID');
    if (this.router.url === `/Engineer/viewUser/${this.userId}`) {
      console.log(this.router.url);
      this.role = 'Engineer';
    } else if (this.router.url === `/Provider/viewUser/${this.userId}`) {
      console.log(this.router.url);
      this.role = 'Provider';
    } else {
      console.log(this.router.url);
      this.role = 'customer';
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
      feedback: feedback.filter((_, index) => index++ !== i),
    };

    console.log(newFeedback);
    if(confirm("Are you sure to delete this feedback?")){
      this.userService
      .editField(this.userId, newFeedback, this.role)
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  deletePortfolio(portfolio: any[], i: number) {
    this.userId = this.route.snapshot.paramMap.get('userID');
    console.log(portfolio, i, this.userId);
    const newPortfolio: any = {
      portofolio: portfolio.filter((_, index) => index++ !== i),
    };

    console.log(newPortfolio);
    if(confirm("Are you sure to delete this portfolio?")){
      this.userService
      .editField(this.userId, newPortfolio, this.role)
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  handleDelete(email: string, password: string, id: string) {
    this.userId = this.route.snapshot.paramMap.get('userID');
    console.log(email, password, this.userId, this.role);
    console.log('delete?');
    this.result = confirm('Are you sure to delete?');
    if (this.result) {
      // this.authService.deleteUserFromAuth(email, password);
      this.userService
        .deleteSingleUser(this.userId, this.role)
        .then(() => {
          console.log('deleted successfully');
          this.router.navigate([`/${this.role}`])
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
