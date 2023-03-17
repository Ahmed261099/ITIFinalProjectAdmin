import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  @ViewChild('rols') rols!: ElementRef;

  createUser: FormGroup;
  submitted = false;
  loading = false;
  id: string | null ;
  role : string | null ;
  title: string = `Add User`
  editFlag:boolean = true ;
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private authService: AuthServiceService,
    private _ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService
  )
  {
    this.createUser = this.fb.group({
      name: ['', [Validators.required, , Validators.pattern(/^([A-z]{3,}|[A-z]{3,} [A-z]{3,})$/)]],
      username: ['', [Validators.required, Validators.pattern(/^([A-z0-9]{3,}|[A-z0-9]{3,} [A-z0-9]{3,})/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, Validators.pattern(/^[A-z]{3,}$/)]],
      street: ['', [Validators.required, Validators.pattern(/^[A-z]{3,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
    });
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.role = this._ActivatedRoute.snapshot.paramMap.get('role');
    console.log(this.id)
    console.log(this.role)
  }
  ngOnInit(): void {
    this.isEdit();
  }

  addEditUser()
  {
    this.submitted = true ;
    if(this.createUser.invalid)
    {
      return ;
    }
    if(this.id === null && this.role === null)
    {
      this.addUser();
    }
    else
    {
      this.EditUser(this.id , this.role);
      this.editFlag = false ;
    }
  }

  addUser() {
    if (this.createUser.invalid) return console.log('invalid');



    if(this.rols.nativeElement.value === "Engineer" || this.rols.nativeElement.value === "Provider"){
      const User: any = {
        name: this.createUser.value.name.trim(),
        username: this.createUser.value.username.trim(),
        email: this.createUser.value.email.trim(),
        emailFormated: this.createUser.value.email.toLowerCase().trim(),
        role: this.rols.nativeElement.value.trim(),
        address: [
          {
            city: this.createUser.value.city.trim(),
            street: this.createUser.value.street.trim(),
          },
        ],
        phone: this.createUser.value.phone.trim(),
        password: this.createUser.value.password.trim(),
        timestamp: new Date(),
        image: '',
        cart: [],
        wishlist: [],
        experience: 'https://console.firebase.google.com/u/0/project/project-iti-d4ddb/storage/project-iti-d4ddb.appspot.com/files',
        feedback: [],
        messages: [],
        portofolio: [],
        spetialization: '',
        rate: 0,
      };

      this.authService.SignUp(User.email, User.password);

      this.loading = true ;
      this.usersService
      .addUser(User)
      .then(() => {
        this.toastr.success('added successfully');
        this.loading = false ;
        if (this.rols.nativeElement.value === 'Engineer')
          this.router.navigate(['/Engineer']);
        else if (this.rols.nativeElement.value === 'Provider')
          this.router.navigate(['/Provider']);
        else this.router.navigate(['/customer']);
      })
      .catch((error) => {
        this.toastr.error(error.code);
        this.loading = false ;
      });
    }
    else{
      const User: any = {
        name: this.createUser.value.name.trim(),
        username: this.createUser.value.username.trim(),
        email: this.createUser.value.email.trim(),
        emailFormated: this.createUser.value.email.toLowerCase().trim(),
        role: this.rols.nativeElement.value.trim(),
        address: [
          {
            city: this.createUser.value.city.trim(),
            street: this.createUser.value.street.trim(),
          },
        ],
        phone: this.createUser.value.phone.trim(),
        password: this.createUser.value.password.trim(),
        timestamp: new Date(),
        image: '',
        cart: [],
        wishlist: [],
        messages: [],
      };
      this.usersService
      .addUser(User)
      .then(() => {
        this.toastr.success('added successfully');
        this.router.navigate(['/customer']);
      })
      .catch((error) => {
        this.toastr.error(error.code);
      });
    }

  }

  EditUser(id: any , role:any)
  {
      const user:any = {
        name:  this.createUser.value.name.trim(),
        username:  this.createUser.value.username.trim(),
        email:  this.createUser.value.email.trim(),
        emailFormated: this.createUser.value.email.toLowerCase().trim(),
        address: [
          {
            city : this.createUser.value.city.trim(),
            street: this.createUser.value.street.trim()
          }
        ],
        phone: this.createUser.value.phone.trim(),
        password: this.createUser.value.password.trim()
      }

      this.loading = true ;
      this.usersService.updateUser(id , role ,user ).then(() => {
        this.loading = false ;
        this.toastr.success(role, " edit successfully");
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
      this.usersService.getSingleUser(this.id , this.role).subscribe( (data) => {
        this.loading = false ;
        console.log(data.payload.data().wishlist)
        this.createUser.setValue({
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
