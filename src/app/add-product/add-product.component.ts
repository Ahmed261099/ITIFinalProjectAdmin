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

  addProductForm: FormGroup;
  submitted = false;
  loading = false;
  id: string | null ;
  role : string | null ;
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
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.role = this._ActivatedRoute.snapshot.paramMap.get('role');
    console.log(this.id)
    console.log(this.role)
  }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('category');
    this.getProduct();
    this.isEdit();
  }

  addEditProduct()
  {
    this.submitted = true ;
    if(this.addProductForm.invalid)
    {
      return ;
    }
    if(this.id === null && this.role === null)
    {
      this.addProduct();
    }
    else
    {
      this.EditProduct(this.id , this.role);
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
            image: "",
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

  EditProduct(id: any , role:any)
  {
      const product:any = {
        name:  this.addProductForm.value.name ,
        username:  this.addProductForm.value.username,
        email:  this.addProductForm.value.email,
        emailFormated: this.addProductForm.value.email.toLowerCase(),
        address: [
          {
            city : this.addProductForm.value.city,
            street: this.addProductForm.value.street
          }
        ],
        phone: this.addProductForm.value.phone,
        password: this.addProductForm.value.password
      }

      this.loading = true ;
      this.categoryService.updateProduct(id , role).then(() => {
        this.loading = false ;
        this.router.navigate([`/${role}`])
      })
  }
  isEdit()
  {
    if(this.id !== null && this.role !== null)
    {
      this.title = `Edit ${this.role}` ;
      this.loading = true;
      this.editFlag = false ;
      this.categoryService.getSingleProduct(this.id).subscribe( (data) => {
        this.loading = false ;
        console.log(data.payload.data().wishlist)
        this.addProductForm.setValue({
          name: data.payload.data()['name'],
          username: data.payload.data()['username'],
          email: data.payload.data()['email'],
          city: data.payload.data().address[0].city,
          street: data.payload.data().address[0].street,
          phone: data.payload.data()['phone'],
          password: data.payload.data()['password'],
          confirmPassword: data.payload.data()['password'],

        })
      })
    }

  }

}
