import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CategoryService } from '../../services/category.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  categoryId: any;
  Product: any;
  default: string = '../../assets/images/default.jpg';
  constructor(
    firestore: AngularFirestore,
    private authService: AuthServiceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('role');
    console.log(this.categoryId);
    this.getProducts();
  }

  getProducts() {
    this.categoryService.getProducts(this.categoryId).subscribe((product) => {
      this.Product = product.payload.data();
      // console.log(this.Product.products);
    });
  }

  // getEngineers() {
  //   console.log(this.s);
  //   this.usersService.getUsers(this.s).subscribe((data) => {
  //     this.products = [];
  //     data.forEach((element: any) => {
  //       this.products.push({
  //         id: element.payload.doc.id,
  //         ...element.payload.doc.data(),
  //       });
  //     });
  //     console.log(this.products);
  //   });
  // }

  // handleDelete(email: string, password: string, id: string, role: string) {
  //   console.log(email, password, id, role);
  //   console.log('delete?');
  //   this.result = confirm('Are you sure to delete?');
  //   if (this.result) {
  //     this.authService.deleteUserFromAuth(email, password);
  //     this.usersService
  //       .deleteSingleUser(id, role)
  //       .then(() => {
  //         console.log('deleted successfully');
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }
}
