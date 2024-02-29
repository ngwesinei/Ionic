import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MyProgressPage } from '../my-progress/my-progress';
import { User } from '../../models/User';
import { AuthService } from '../../providers/auth-service';
import {Events} from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: User;
  loginError: string;

  constructor(public navCtrl: NavController, private authService:AuthService, private events:Events) {
    this.user= new User('','','','');
  }
  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  login(){
   this.authService.login(this.user.email,this.user.password).then(
      () =>{
        this.events.publish("user:loggedin");
        this.navCtrl.setRoot(MyProgressPage),
        error => this.loginError= error.message
      }
     
    );
  }
}
