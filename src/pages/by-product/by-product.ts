import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SaleFbProvider } from '../../providers/sale-firebase';
import { Sale } from '../../models/sale';
import {Product} from '../../models/product';

@Component({
    selector: 'page-by-product',
    templateUrl: 'by-product.html'
})
export class ByProductPage{

    products: string[];
    prodImg: string[];
    targetAmt: string[];
    saleData: Sale[];
    totAmt: number[];
    results: Array<{ title: string, totamount: any, target: number }>=[];

    constructor(public navCtrl: NavController, private saleService: SaleFbProvider) {
       
       
    }
    ionViewDidLoad() {
            
        this.saleService.getProductItems().subscribe(product => {
            for (let prod of product){
                var amount=0

                this.saleService.getItemsByProduct(prod.name).subscribe(saleData=>{
                     for(let sale of saleData){
                         amount=amount+sale.amount;
                     }
                     this.results.push({title:prod.name,totamount:amount,target:prod.target});
                     amount=0;
                     });
                
            }
        });
    }

 

}
