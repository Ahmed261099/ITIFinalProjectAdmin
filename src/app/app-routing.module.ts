import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EngineerComponent } from './engineer/engineer.component';
import { LoginComponent } from './login/login.component';
import { ProviderComponent } from './provider/provider.component';
import { AuthGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [AuthGuardGuard] },
  // {path: "add", children: [
  //   {path: "", component: CreateUserComponent},
  //   {path: "", component: CreateUserComponent},
  // ] },
  {path: "engineer", children:[
    {path: "", component: EngineerComponent},
    {path: "add/:userID", component: CreateUserComponent}
  ], canActivate: [AuthGuardGuard] },
  {path: "provider", component: ProviderComponent },
  {path: "client", component: ClientComponent },
  {path: "edit", component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
