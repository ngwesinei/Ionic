import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActivitiesPage}from "../activities/activities";
import { MyMapsPage}from "../my-maps/my-maps";
import {MySlidersPage}from "../my-sliders/my-sliders";

/**
 * Generated class for the MyTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-tabs',
  templateUrl: 'my-tabs.html',
})
export class MyTabsPage {
  tab1Root = ActivitiesPage;
  tab2Root = MyMapsPage;
  tab3Root = MySlidersPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTabsPage');
  }

}
