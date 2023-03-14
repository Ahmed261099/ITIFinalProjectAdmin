import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  @ViewChild('rols') rols!: ElementRef;

  createUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
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
      this.usersService
      .addUser(User)
      .then(() => {
        alert('added successfully');
        if (this.rols.nativeElement.value === 'Engineer')
          this.router.navigate(['/engineer']);
        else if (this.rols.nativeElement.value === 'Provider')
          this.router.navigate(['/provider']);
        else this.router.navigate(['/client']);
      })
      .catch((error) => {
        console.log(error);
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
}
