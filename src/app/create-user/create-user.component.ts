import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { UsersService } from '../../services/users.service';

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
    private _ActivatedRoute: ActivatedRoute
  )
  {
    this.createUser = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // role: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
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
        name: this.createUser.value.name,
        username: this.createUser.value.username,
        email: this.createUser.value.email,
        emailFormated: this.createUser.value.email.toLowerCase(),
        role: this.rols.nativeElement.value,
        address: [
          {
            city: this.createUser.value.city,
            street: this.createUser.value.street,
          },
        ],
        phone: this.createUser.value.phone,
        password: this.createUser.value.password,
        timestamp: new Date(),
        image: '',
        cart: [],
        wishlist: [],
        experience: '',
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
        alert('added successfully');
        this.loading = false ;
        if (this.rols.nativeElement.value === 'Engineer')
          this.router.navigate(['/engineer']);
        else if (this.rols.nativeElement.value === 'Provider')
          this.router.navigate(['/provider']);
        else this.router.navigate(['/client']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false ;
      });
    }
    else{
      const User: any = {
        name: this.createUser.value.name,
        username: this.createUser.value.username,
        email: this.createUser.value.email,
        emailFormated: this.createUser.value.email.toLowerCase(),
        role: this.rols.nativeElement.value,
        address: [
          {
            city: this.createUser.value.city,
            street: this.createUser.value.street,
          },
        ],
        phone: this.createUser.value.phone,
        password: this.createUser.value.password,
        timestamp: new Date(),
        image: '',
        cart: [],
        wishlist: [],
        messages: [],
      };
      this.usersService
      .addUser(User)
      .then(() => {
        alert('added successfully');
        // if (this.rols.nativeElement.value === 'Engineer')
        //   this.router.navigate(['/engineer']);
        // else if (this.rols.nativeElement.value === 'Provider')
        //   this.router.navigate(['/provider']);
        // else
        this.router.navigate(['/client']);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  }

  EditUser(id: any , role:any)
  {
      const user:any = {
        name:  this.createUser.value.name ,
        username:  this.createUser.value.username,
        email:  this.createUser.value.email,
        emailFormated: this.createUser.value.email.toLowerCase(),
        address: [
          {
            city : this.createUser.value.city,
            street: this.createUser.value.street
          }
        ],
        phone: this.createUser.value.phone,
        password: this.createUser.value.password
      }

      this.loading = true ;
      this.usersService.updateUser(id , role ,user ).then(() => {
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
