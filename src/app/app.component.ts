import { Component, ViewChild } from '@angular/core';
import { Platform, Nav,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyProgressPage } from '../pages/my-progress/my-progress';
import { SalesProgressPage } from '../pages/sales-progress/sales-progress';
import { IncreaseSalesPage } from '../pages/increase-sales/increase-sales';
import { ProductPage } from '../pages/product-reg/product-reg';
import { ProductListPage } from '../pages/product-list/product-list';
import { ProductEditPage } from '../pages/product-edit/product-edit';
import { AuthService } from '../providers/auth-service';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { Events } from 'ionic-angular';
import { User } from '../models/User';
import { SaleFbProvider } from '../providers/sale-firebase';
import { SignupPage } from '../pages/signup/signup';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = LoginPage;
  //rootPage: any = IncreaseSalesPage;
  menus: Array<{ icon: string, title: string, component: any }>;
  userName: String;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthService, private events: Events, 
    private SaleProvider: SaleFbProvider,private alertController:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

     /**  this.menus = [{ icon: "trending-up", title: "IncreaseSales", component: IncreaseSalesPage },
      { icon: "star-outline", title: "ViewProgress", component: MyProgressPage },
      { icon: "globe", title: "OverallProgress", component: SalesProgressPage },
      { icon: "logo-pinterest", title: "ProductRegister", component: ProductPage },
      { icon: "logo-buffer", title: "ProductList", component: ProductListPage }
      ]*/

      events.subscribe("user:loggedin", () => {
        let user = this.authService.getCurrentUser();
        alert(user.email);
        if (user != null) {
          this.SaleProvider.getUserItemsByEmail(user.email).subscribe(userList => {
           // alert("in subscribe")
            for (let user of userList) {
              //alert("this is user list" + user.level);
              if (user.level == "manager") {
                this.menus = [{ icon: "trending-up", title: "IncreaseSales", component: IncreaseSalesPage },
                { icon: "star-outline", title: "ViewProgress", component: MyProgressPage },
                { icon: "globe", title: "OverallProgress", component: SalesProgressPage },
                { icon: "logo-pinterest", title: "ProductRegister", component: ProductPage },
                { icon: "logo-buffer", title: "ProductList", component: ProductListPage },
                { icon: "person", title: "SaleManRegister", component: SignupPage}
                ]
              } else {
                this.menus = [{ icon: "trending-up", title: "IncreaseSales", component: IncreaseSalesPage },
                { icon: "star-outline", title: "ViewProgress", component: MyProgressPage }
                
                ]

              }
            }
          });
        } else {
          this.menus = null;
        }

      });





    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      title:"Success submit",
     
    })

    await alert.present();
  }
  goToIncreaseSales(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(IncreaseSalesPage);
  } goToMyProgress(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(MyProgressPage);
  } goToSalesProgress(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SalesProgressPage);
  } goToProductRegister(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ProductPage);
  } goToProductList(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ProductListPage);
  } goToProductEdit(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ProductEditPage);
  } goToLogin(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  } goToProfile(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ProfilePage);

  }
  logout() {
    this.authService.logout;

    this.events.subscribe("user:loggedin");
    this.navCtrl.setRoot(LoginPage);

  } goToMenu(page) {
    //  if (params == "OverallProgress") { if (!params) params = {}; this.navCtrl.setRoot(SalesProgressPage); }
    //else if (params == "ProductRegister") {if (!params) params = {}; this.navCtrl.setRoot(ProductPage); }
    // else if (params == "ProductList") {if (!params) params = {}; this.navCtrl.setRoot(ProductListPage); }
    this.navCtrl.setRoot(page.component);

  }
}
