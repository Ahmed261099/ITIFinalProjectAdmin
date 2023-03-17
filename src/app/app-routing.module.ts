import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EngineerComponent } from './engineer/engineer.component';
import { LoginComponent } from './login/login.component';
import { ProviderComponent } from './provider/provider.component';
import { AuthGuardGuard } from './../services/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { CategoryComponent } from './category/category.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: CreateUserComponent },
  { path: 'edit/:role/:id', component: CreateUserComponent },
  {
    path: 'Engineer',
    children: [
      { path: '', component: EngineerComponent },
      { path: 'viewUser/:userID', component: SingleUserComponent},
      // {path: "add/:userID", component: SingleUserComponent, canActivate: [AuthGuardGuard]}
    ],
  },
  {
    path: 'Provider',
    children: [
      { path: '', component: ProviderComponent },
      { path: 'viewUser/:userID', component: SingleUserComponent },
      // {path: "add/:userID", component: SingleUserComponent, canActivate: [AuthGuardGuard]}
    ],
  },
  // {path: "Provider", component: ProviderComponent },
  // {path: "customer", component: ClientComponent },
  {
    path: 'customer',
    children: [
      { path: '', component: ClientComponent },
      { path: 'viewUser/:userID', component: SingleUserComponent },
    ],
  },
  // {path: "edit", component: EditUserComponent },
  {
    path: 'category/:role',
    children: [
      { path: '', component: CategoryComponent },
      { path: 'viewProduct/:productID', component: SingleUserComponent },
    ], 
  },
  { path: 'addProduct/:category', component: AddProductComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
