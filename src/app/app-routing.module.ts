import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { EngineerComponent } from './engineer/engineer.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProviderComponent } from './provider/provider.component';


const routes: Routes = [
  {path:"", redirectTo:"home" , pathMatch:"full"},
  {path:"home" , component:HomeComponent},
  {path:"engineer" , component:EngineerComponent},
  {path:"provider" , component:ProviderComponent},
  {path:"client" , component:ClientComponent},
  {path:"**" , component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
