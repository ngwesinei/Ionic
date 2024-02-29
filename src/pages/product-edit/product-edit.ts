import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Product } from '../../models/product'
import { NgForm } from '@angular/forms';
import { NavParams } from 'ionic-angular';
import { SaleFbProvider } from '../../providers/sale-firebase';
import { ProductListPage } from '../product-list/product-list';

@Component({
    selector: 'page-product-edit',
    templateUrl: 'product-edit.html'
  })
  export class ProductEditPage{
    product : Product;
   
    submitted = false; 
    constructor(public navCtrl: NavController,private saleService:SaleFbProvider,private navParams:NavParams) {
      let name = navParams.get('name');
      let price = navParams.get('price');
      let target = navParams.get('target');
      let key=navParams.get('key');
      
     
      this.product = new Product(name,price,target);
      this.product.key=key;
     
    }
    onSubmit(form: NgForm){
      this.submitted = true; 
      this.saleService.updateProductItem(this.product);
        alert("Updated")
        
    }
  }