import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SaleFbProvider } from '../../providers/sale-firebase';
import { Sale } from '../../models/sale';
import { SaleDetailPage } from '../sale-detail/sale-detail';
import {EditSalePage} from "../edit-sales/edit-sales";
import {AuthService} from "../../providers/auth-service";
import {IncreaseSalesPage} from "../increase-sales/increase-sales";
@Component({
  selector: 'page-my-progress',
  templateUrl: 'my-progress.html'
})
export class MyProgressPage implements OnInit{
  saleData:Sale[];
  saleMan:string;
  transformData:{ key: string; value: any; }[];
  constructor(public navCtrl: NavController, private saleService:SaleFbProvider,private authService: AuthService) {
  }

  ngOnInit(): void {

    let user = this.authService.getCurrentUser();
    if (user != null) {
      if (user.displayName != null)
        this.saleMan = user.displayName;
      
    }
        this.saleService.getItemsBySaleMan(this.saleMan).subscribe(saleData=>{
        this.saleData=saleData;  
        });

      //  this.saleService.getItems().subscribe(saleData=>{
       //   this.saleData=saleData;
        //});

        // this.transformData=this.transformArray(this.saleData,"date")
    }

    deleteItem(item:Sale){
      //this.expenses.splice(this.expenses.indexOf(item),1);
      this.saleService.removeItem(item)
      }
      getItems(ev:any){
        this.ngOnInit;
        let val = ev.target.value;
        console.log("search"+val);

        this.saleData=this.saleService.searchItems(val)

       
    }
    goToSaleDetail(params){
      if(!params) params={};
      this.navCtrl.push(SaleDetailPage,params);
    }

    goToSaleEdit(params){
      if(!params)params={};
      this.navCtrl.push(EditSalePage,params);
    }

    goToRegister(params){
      if(!params)params={};
      this.navCtrl.push(IncreaseSalesPage,params);
    }
    
    transformArray(array: Array<any>, field) {
      if (array) {
        const groupedObj = array.reduce((prev, cur) => {
          if (!prev[cur[field]]) {
            prev[cur[field]] = [cur];
          } else {
            prev[cur[field]].push(cur);
          }
          return prev;
        }, {});
        return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
      }
      return [];
    }
 
   }
  

