import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EngineerComponent } from './engineer/engineer.component';
import { LoginComponent } from './login/login.component';
import { ProviderComponent } from './provider/provider.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SingleUserComponent } from './single-user/single-user.component';

const routes: Routes = [
  {path:"", redirectTo:"Home" , pathMatch:"full"},
  {path:"Home" , component:HomeComponent},
  {path: "login", component: LoginComponent },
  {path: "add", component: CreateUserComponent},
  {path: "engineer", children:[
    {path: "", component: EngineerComponent},
    {path: "viewUser/:userID", component: SingleUserComponent}
    // {path: "add/:userID", component: SingleUserComponent, canActivate: [AuthGuardGuard]}
  ] },
  {path: "provider", children:[
    {path: "", component: ProviderComponent},
    {path: "viewUser/:userID", component: SingleUserComponent}
    // {path: "add/:userID", component: SingleUserComponent, canActivate: [AuthGuardGuard]}
  ] },
  {path: "client", children:[
    {path: "", component: ClientComponent },
    {path: "viewUser/:userID", component: SingleUserComponent},
  ]
  },
  {path: "edit", component: EditUserComponent },
  {path:"**" , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
