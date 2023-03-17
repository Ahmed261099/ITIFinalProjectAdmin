import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  // @ViewChild('rols') rols!: ElementRef;
  Product:any ;
  addProductForm: FormGroup;
  submitted = false;
  loading = false;
  id: string | null ;
  updatedProductId:string |null ;
  title: string = `Add Product`
  editFlag:boolean = true ;
  productId: any;
  Products: Array<any> = [];
  arr: any;
  newArray: any;
  setProducts: any;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthServiceService,
    private _ActivatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    public database: AngularFirestore
  )
  {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.id = this._ActivatedRoute.snapshot.paramMap.get('name');
    this.updatedProductId = this._ActivatedRoute.snapshot.paramMap.get('id')
    console.log("Hi yasmeen"+this.updatedProductId)
  }
  ngOnInit(): void {
    this.isEdit();
    this.productId = this.route.snapshot.paramMap.get('category');
    this.getProduct();
    this.getProducts();
  }

  addEditProduct()
  {
    this.submitted = true ;
    if(this.addProductForm.invalid)
    {
      return ;
    }
    if(this.id === null)
    {
      this.addProduct();
    }
    else
    {
      this.EditProduct(this.id);
      this.editFlag = false ;
    }
  }

  getProduct(){
    this.categoryService.getProducts(this.productId).subscribe((product) => {
      this.arr = product.payload.data()
      this.newArray = this.arr.products;
      console.log(this.newArray);
    });
  }

  addProduct() {
    if (this.addProductForm.invalid) return console.log('invalid');
    this.Products = this.newArray
    console.log(this.Products);

      const Product: any = {
            id: this.newArray.length + 1,
            name: this.addProductForm.value.name,
            price: this.addProductForm.value.price,
            quantity: this.addProductForm.value.quantity,
            description: this.addProductForm.value.description,
            image: "https://firebasestorage.googleapis.com/v0/b/project-iti-d4ddb.appspot.com/o/defaultProductImage.jpg?alt=media&token=7953f354-e39b-4c0b-aacc-811f555dcaa2",
            spetialization: this.productId
        };

      this.Products.push(Product);
      this.setProducts = this.Products;

      const categoryProducts: any = {
        products: this.setProducts
      }

      this.loading = true ;
      this.categoryService
      .addProduct(this.productId, categoryProducts)
      .then(() => {
        alert('added successfully');
        this.loading = false ;
        // if (this.rols.nativeElement.value === 'Engineer')
        //   this.router.navigate(['/engineer']);
        // else if (this.rols.nativeElement.value === 'Provider')
        //   this.router.navigate(['/provider']);
        // else this.router.navigate(['/client']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false ;
      });
  }
  // deletePortfolio(portfolio: any[], i: number) {
  //   this.userId = this.route.snapshot.paramMap.get('userID');
  //   console.log(portfolio, i, this.userId);
  //   const newPortfolio: any = {
  //     portofolio: portfolio.filter((_, index) => index++ !== i),
  //   };

  //   console.log(newPortfolio);
  //   if(confirm("Are you sure to delete this portfolio?")){
  //     this.userService
  //     .editField(this.userId, newPortfolio, this.role)
  //     .then(() => {
  //       console.log('success');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }
  getProducts() {
    if(this.id !== null)
    {
      this.categoryService.getProducts(this.id).subscribe((product) => {
        this.Product = product.payload.data();
    })
    };
  }
  EditProduct(id: any )
  {

    console.log("update ya ahmed" +id)

      const product:any = {
        name:  this.addProductForm.value.name ,
        price:  this.addProductForm.value.price,
        quantity:  this.addProductForm.value.quantity,
        description: this.addProductForm.value.description,
      }
      this.loading = true ;
      this.categoryService.updateProduct(id ,product).then(() => {
        this.loading = false ;
        // this.router.navigate([`/category/${id}`])
      })
  }

  isEdit()
  {
    if(this.id !== null)
    {
      this.title = `Edit Product` ;
      this.loading = true;
      this.editFlag = false ;
      this.categoryService.getSingleProduct(this.id).subscribe( (data) => {
        const productsUpdated:any[] = data.payload.data().products;
        const productUpdate:any = productsUpdated.filter( (p) => p.id === this.updatedProductId)
        console.log( productUpdate[0].name  )
        this.loading = false ;
        this.addProductForm.setValue({
          name: productUpdate[0].name,
          price: productUpdate[0].price,
          quantity: productUpdate[0].quantity,
          description: productUpdate[0].description,
        })
      })
    }

  }

}
