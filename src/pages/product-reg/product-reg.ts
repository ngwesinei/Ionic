import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Product } from '../../models/product'
import { NgForm } from '@angular/forms';

import { SaleFbProvider } from '../../providers/sale-firebase';

@Component({
    selector: 'page-product-reg',
    templateUrl: 'product-reg.html'
  })
  export class ProductPage{
    product : Product;
    submitted = false; 
    constructor(public navCtrl: NavController,private saleService:SaleFbProvider) {
      
      this.product = new Product("",0,"");
    }
    onSubmit(form: NgForm){
     this.submitted = true; 
      this.saleService.addProductItem(this.product);
      alert("Submitted")
      this.product = new Product("",0,"");
    }
  }