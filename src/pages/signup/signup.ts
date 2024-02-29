import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SaleFbProvider } from '../../providers/sale-firebase';
import { User } from '../../models/User';
import { ProfilePage } from '../profile/profile';
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    user: User;
    signupError: string;
    constructor(public navCtrl: NavController, private authService: AuthService, private saleService:SaleFbProvider) {
        this.user = new User('', '', '', '');
    }

    signup() {
        this.authService.signup(this.user.email,this.user.password)
            .then(
                () => {
                    this.saleService.signup(this.user.email,this.user.password,this.user.level,this.user.name);
                    this.authService.updateProfile(this.user.name,
                        '').then(
                            () => this.navCtrl.setRoot(ProfilePage),
                            error => this.signupError = error.message
                        );
                },
                 error => this.signupError = error.message
            );
    }

}

