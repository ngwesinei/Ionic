import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Sale } from '../../models/sale';
import { NgForm } from '@angular/forms';
import { SaleFbProvider } from '../../providers/sale-firebase';
import {Product} from '../../models/product';
import {AuthService} from "../../providers/auth-service";

@Component({
  selector: 'page-increase-sales',
  templateUrl: 'increase-sales.html'
})
export class IncreaseSalesPage {
  products: Product[]; 
  saleMan: string;
  teams: string[];
  sale: Sale;
  branches: string[];
  customers: string[];
  saleData:Sale[];
  submitted = false;
  price:number;
  constructor(public navCtrl: NavController,private saleService:SaleFbProvider,private authService: AuthService) {
    this.price=1;
    this.saleService.getProductItems().subscribe(product =>{
    this.products=product 
     });

     let user = this.authService.getCurrentUser();
    if (user != null) {
      if (user.displayName != null)
        this.saleMan = user.displayName;
      
    }
    //this.salemans=["Joe",'Amy','Chris','David','Maria']
    this.teams=["Team A","Team B","Team C","Team D"]
    this.branches=["Branch 1","Branch 2"]
    this.customers=["Royal","Kiwi","Woodlands","Orchard"]
    this.sale=new Sale(null,0,this.teams[0],this.branches[0],this.saleMan,new Date().toISOString(),this.customers[0],0,null);
   //*to call ngModel value(must have initialization) */
    
  }
  get testing() { 
    return JSON.stringify(this.sale);
  }
  prodPrice(item: Product){
    
    this.price=item.price;
    
  }
  onSubmit(form: NgForm){
    this.submitted = true; 
    this.sale.productname=this.sale.product.name;
    this.sale.amount= this.sale.qty * this.sale.product.price;
   
    this.saleService.addItem(this.sale);
      alert("Submitted")
    this.sale=new Sale(null,0,this.teams[0],this.branches[0],this.saleMan,new Date().toISOString(),this.customers[0],0,null);
  }
  
  
}
