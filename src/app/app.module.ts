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
import { CreateUserComponent } from './create-user/create-user.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
// import { EnvironmentsComponent } from './environments/environments.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from '@angular/fire/compat';

import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgPipesModule } from 'ng-pipes';
import { CategoryComponent } from './category/category.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthServiceService } from './../services/auth-service.service';
import { OrdersComponent } from './orders/orders.component';
import { SingleOrderComponent } from './single-order/single-order.component';


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
    CreateUserComponent,
    LoginComponent,
    // EditUserComponent,
    CategoryComponent,
    SingleUserComponent,
    SingleProductComponent,
    AddProductComponent,
    OrdersComponent,
    SingleOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgPipesModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    BrowserAnimationsModule,
    MatSidenavModule,
    AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
