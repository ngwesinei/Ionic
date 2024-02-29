import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import {User} from '../../models/User';
import {AuthService} from '../../providers/auth-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
private user: User;
  private imgSrc;

  constructor(public navCtrl: NavController, private authService: AuthService) {
  this.user = new User('', '', '','');
  }
  ngOnInit() {
    this.authService.getCurrentUserObserver().subscribe(user => {
      if (user) {
        this.user = new User(user.displayName, user.email, '','');
        this.user.photoURL = "pic1.jpg";
        if (this.user.photoURL && this.user.photoURL.length > 0) {
          this.authService.getDownloadUrl(this.user.photoURL).then(
            (url) => {
              console.log('Retrieved image ' + url);
              this.imgSrc = url;
            }, (err) => {
              // Handle error
            });
        }
      }
      else {
        this.user = new User('You are not logged in', 'You are not logged in', '','');
      }
    });
  }

  ionViewDidEnter() {
    this.ngOnInit(); // Update current user's profile
  }

  goToEditProfile() {
    this.navCtrl.push(EditProfilePage, this.user);
  }

}
