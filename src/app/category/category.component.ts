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
    });
  }
  

}
