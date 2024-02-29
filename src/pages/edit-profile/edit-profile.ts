import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { User } from '../../models/User';


@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})

export class EditProfilePage implements OnInit {
  private user: User;
  private imgSrc;

  constructor(public navCtrl: NavController, private authService: AuthService, private navParams: NavParams) {
    let displayName = navParams.get('name');
    let email = navParams.get('email');
    let photoURL = navParams.get('photoURL');
    this.user = new User(displayName, email, '','');
    this.user.photoURL = photoURL;
  }

  ngOnInit() {
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

 
  updateProfile() {

    if (this.user.photoURL == undefined) {
      let photoURL = this.user.email.replace(/[^a-zA-Z0-9]/g, '_');
      this.user.photoURL = photoURL;
    }

    this.authService.updateProfile(this.user.name, this.user.photoURL);

    if (this.imgSrc && this.imgSrc.startsWith('data:')) {
      // Remove 'data:image/png;base64,'
      let base64Image = this.imgSrc.split(',')[1];

      this.authService.saveImage(base64Image, this.user.photoURL, { contentType: 'image/jpeg' }).then(function (snapshot) {
        alert('Upload success');
        this.authService.updateProfile(this.user.name, this.user.photoURL);
      }, function (error) {
        alert('error ' + error.message);
      });
    }

  }

}
