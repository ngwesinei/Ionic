import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IncreaseSalesPage } from '../pages/increase-sales/increase-sales';
import { MyProgressPage } from '../pages/my-progress/my-progress';
import { SalesProgressPage } from '../pages/sales-progress/sales-progress';
import { BySaleManPage } from '../pages/by-sale-man/by-sale-man';
import { ByProductPage } from '../pages/by-product/by-product';
import { ByTeamPage } from '../pages/by-team/by-team';
import { PagePage } from '../pages/page/page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SaleService } from '../providers/sale-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SaleFbProvider } from "../providers/sale-firebase";
import{ AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from "../providers/auth-service";
import { SaleDetailPage } from '../pages/sale-detail/sale-detail';
import {ProductPage}  from '../pages/product-reg/product-reg';
import { ProductListPage } from '../pages/product-list/product-list'; 
import {ProductEditPage} from '../pages/product-edit/product-edit';
import {LoginPage} from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {SummaryPage} from '../pages/summary/summary';
import {EditSalePage} from "../pages/edit-sales/edit-sales";
import { AngularFireStorageModule } from 'angularfire2/storage';
import {SaleManGraphPage} from '../pages/sale-man-graph/sale-man-graph';
const firebaseConfig = {
  apiKey: "AIzaSyBWF18E_NphbHOzChK42dc_px1-nExyyVU",
  authDomain: "salesgrowth-5e6e5.firebaseapp.com",
  databaseURL: "https://salesgrowth-5e6e5.firebaseio.com",
  projectId: "salesgrowth-5e6e5",
  storageBucket: "salesgrowth-5e6e5.appspot.com",
  messagingSenderId: "728171592530"
}

@NgModule({
  declarations: [
    MyApp,
    IncreaseSalesPage,
    MyProgressPage,
    SalesProgressPage,
    BySaleManPage,
    ByProductPage,
    ByTeamPage,
    SaleDetailPage,
    ProductPage,
    ProductListPage,
    ProductEditPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    EditProfilePage,
    EditSalePage,
    SummaryPage,
    SaleManGraphPage,
    PagePage
   
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IncreaseSalesPage,
    MyProgressPage,
    SalesProgressPage,
    BySaleManPage,
    ByProductPage,
    ByTeamPage,
    SaleDetailPage,
    ProductPage,
    ProductListPage,
    ProductEditPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    EditProfilePage,
    EditSalePage,
    SummaryPage,
    SaleManGraphPage,
    PagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SaleService,
    SaleFbProvider,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule {}