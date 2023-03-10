import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EngineerComponent } from './engineer/engineer.component';
import { ProviderComponent } from './provider/provider.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { SideBarMenuComponent } from './side-bar-menu/side-bar-menu.component';
import { NotfoundComponent } from './notfound/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EngineerComponent,
    ProviderComponent,
    ClientComponent,
    HomeComponent,
    SideBarMenuComponent,
    NotfoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
