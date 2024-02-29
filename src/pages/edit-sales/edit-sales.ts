import { Component,OnInit } from "@angular/core";
import { AuthService} from "../../providers/auth-service";
import {NavController,NavParams} from "ionic-angular";
import { Sale } from '../../models/sale';
import {Product} from '../../models/product';
import { NgForm } from '@angular/forms';
import { SaleFbProvider } from '../../providers/sale-firebase';

@Component({
    selector: 'page-edit-sales',
    templateUrl: 'edit-sales.html'
  })
  
  export class EditSalePage implements OnInit{
    products: Product[]; 
   
    saleMan: string;
    teams: string[];
    sale: Sale;
    branches: string[];
    customers: string[];
    saleData:Sale[];
    submitted = false;
    price:number;
    constructor(public navCtrl: NavController, private authService: AuthService, private navParams: NavParams, private saleService:SaleFbProvider) {
        
        this.saleService.getProductItems().subscribe(product =>{
        this.products=product 
         });
       
        //this.salemans=["Joe",'Amy','Chris','David','Maria']
        this.teams=["Team A","Team B","Team C","Team D"]
        this.branches=["Branch 1","Branch 2"]
        this.customers=["Royal","Kiwi","Woodlands","Orchard"]

        let prodObj=navParams.get("Product");
        let qty=navParams.get("qty");
        let team=navParams.get("team");
        let branch=navParams.get("branch");
        let saleMan=navParams.get("saleMan");
        let date=navParams.get("date");
        let customer=navParams.get("customer");
        let amount=navParams.get("amount");
        let productname=navParams.get("productname");
        let key=navParams.get('key');

        let user = this.authService.getCurrentUser();
        if (user != null) {
          if (user.displayName != null)
            this.saleMan = user.displayName;
          
        }

        this.price=1;
       
    
         
        
         this.sale=new Sale(prodObj,qty,team,branch,saleMan,
            date,customer,amount,productname);
          this.sale.key=key;
        
    }
    ngOnInit(): void {
        
       
    }

    prodPrice(item: Product){
    
        this.price=item.price;
        
      }
      onSubmit(form: NgForm){
        this.submitted = true; 
        this.sale.productname=this.sale.product.name;
        this.sale.amount= this.sale.qty * this.sale.product.price;
       
        this.saleService.updateItem(this.sale);
          alert("Updated")
      }
  }