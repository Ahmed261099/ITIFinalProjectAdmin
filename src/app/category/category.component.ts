import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CategoryService } from '../../services/category.service';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  categoryId: any;
  Product: any;
  i: number = 0;
  default: string = '../../assets/images/default.jpg';
  constructor(
    firestore: AngularFirestore,
    private authService: AuthServiceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('role');
    console.log(this.categoryId);
    this.getProducts();
  }

  getProducts() {
    this.categoryService.getProducts(this.categoryId).subscribe((product) => {
      this.Product = product.payload.data();
    });
  }

  _deleteProduct(id: string, data: any[], i: number) {
    console.log(id, data);

    const newProduct: any = {
      products: data.filter((_, index) => index++ !== i),
    };

    console.log(newProduct);

    if(confirm("Are you sure to delete this feedback?")){
    this.categoryService.deleteProduct(id, newProduct).then(() => {
      this.toastr.success('item deleted successfully');
      })
      .catch((error) => {
        this.toastr.error(error.code);
      });
    }
  }
}
