import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Expense} from '../../models/expense';
import {SubmitExpensePage} from '../submit-expense/submit-expense';
import {ExpenseDetailPage} from '../expense-detail/expense-detail';
import { ExpenseService } from '../../providers/expense-service';
import { ExpenseFbProvider } from '../../providers/expense-firebase';

@Component({
  selector: 'page-view-expenses',
  templateUrl: 'view-expenses.html'
})
export class ViewExpensesPage implements OnInit {
  
  expenses: Expense[];
  constructor(public navCtrl: NavController,private expenseService:ExpenseService,private expenseService1:ExpenseFbProvider) {

  }
  ngOnInit(): void {
   /* this.expenses = [
      new Expense("14/3/2018", 1250,"Accomodation","RWS Hotel","travel","heart-outline"),
      new Expense("15/3/2018", 20,"Transport","Uber","meeting","heart-outline"),
       new Expense("17/3/2018", 130,"Meal", "Hai Di Lao","lunch","heart-outline")]; */
      /* this.expenseService.getExpenses().subscribe(expenses => this.expenses = expenses);
        
       for(let item of this.expenses){
          if(!item.favIcon)
            item.favIcon = "heart-outline";
       }*/
        this.expenseService1.getItems().subscribe(expenses =>{
        this.expenses=expenses;
        this.initIcon();
       }
       );

  }
  private initIcon() {
    for (let item of this.expenses) { // this.expenses is undefined
    if (!item.favIcon)
    item.favIcon = "heart-outline";;
    }
    }
  
      toggleFav(item:Expense){
      if (item.favIcon == "heart-outline")
            item.favIcon = "heart";
      else 
           item.favIcon = "heart-outline";
  
      }
      deleteItem(item:Expense){
      //this.expenses.splice(this.expenses.indexOf(item),1);
      this.expenseService1.removeItem(item)
      }
      getItems(ev:any){
        this.ngOnInit;
        let val = ev.target.value;
        console.log("search"+val);

      // this.expenseService.searchExpenses(val)
      //.subscribe(expenses => {
      //this.expenses = expenses;
      //this.initIcon();
      //});

      this.expenses=this.expenseService1.searchItems(val)

        if (val && val.trim() != '') {
          this.expenses = this.expenses.filter(item => 
          item.merchant.toLowerCase().includes(val.toLowerCase())
          || item.notes &&
          item.notes.toLowerCase().includes(val.toLowerCase()) ||
          item.category.toLowerCase().includes(val.toLowerCase()) 
          ) 
      }
    }
    goToExpenseDetail(params){
      if(!params) params={};
      this.navCtrl.push(ExpenseDetailPage,params);
    }
    goToSubmitExpense(){
      this.navCtrl.push(SubmitExpensePage);
    }
  
}
