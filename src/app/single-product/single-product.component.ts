import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {

  product: any;
  productId: any;
  categoryId: any;
  arr: Array<any> = [];
  newArray: Array<any> = [];

  constructor(private productService: CategoryService, private route: ActivatedRoute,){ }

  ngOnInit(): void {
    this.GetSingleProduct()
  }

  GetSingleProduct() {
    this.categoryId = this.route.snapshot.paramMap.get('role');
    this.productId = this.route.snapshot.paramMap.get('productID');
    console.log(this.categoryId, this.productId);
    this.productService.getSingleProduct(this.categoryId).subscribe((product) => {
      this.product = product.payload.data();
      this.arr = this.product.products
      this.newArray = this.arr?.filter(product => product.id === this.productId);
      console.log(this.arr?.filter((product) => product.id === this.productId));
      console.log(this.newArray[0]);
    });
  }

}
