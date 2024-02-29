import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Sale } from '../../models/sale';

@Component({
  selector: 'page-sale-detail',
  templateUrl: 'sale-detail.html'
})

export class SaleDetailPage {

  sale: Sale;

  constructor(public navCtrl: NavController,private navParams:NavParams) {
    let product = navParams.get('product');
    let qty = navParams.get('qty');
    let team = navParams.get('team');
    let branch = navParams.get("branch");
    let saleMan= navParams.get("saleMan");
    let date=  navParams.get("date");
    let customer= navParams.get("customer");
    let amount=navParams.get("amount");
    let productname=navParams.get('productname')
    this.sale = new Sale(product,qty,team,branch,saleMan,date,customer,amount,productname);
  }
  
}
