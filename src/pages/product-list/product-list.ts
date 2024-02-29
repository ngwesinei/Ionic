import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Product }from '../../models/product';
import { SaleFbProvider } from '../../providers/sale-firebase';
import { ProductPage } from '../../pages/product-reg/product-reg';
import { NavParams } from 'ionic-angular';
import {ProductEditPage} from '../../pages/product-edit/product-edit';

@Component({
    selector: 'page-product-list',
    templateUrl: 'product-list.html'
  })
  export class ProductListPage implements OnInit {
  
    product: Product[];
    constructor(public navCtrl: NavController,private saleService1:SaleFbProvider,private navParams:NavParams) {
      
    }
    ngOnInit(): void {
     
          this.saleService1.getProductItems().subscribe(product =>{
          this.product=product
          
         }
         );
  
    }
   
    
        
        deleteItem(item:Product){
        //this.expenses.splice(this.expenses.indexOf(item),1);
        this.saleService1.removeProductItem(item)
        }
        getItems(ev:any){
          this.ngOnInit;
          let val = ev.target.value;
          console.log("search"+val);
  
        this.product=this.saleService1.searchProductItems(val);
  
         
      }
      
      goToProductRegister(){
        this.navCtrl.push(ProductPage);
      }
      goToProductEdit(params){
        if(!params) params={};
        this.navCtrl.push(ProductEditPage,params);
        
      }
    
  }