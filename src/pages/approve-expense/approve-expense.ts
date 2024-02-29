import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Profile} from '../../models/profile';
import { ExpenseFbProvider } from '../../providers/expense-firebase';
import { Expense } from '../../models/expense';


@Component({
  selector: 'page-approve-expense',
  templateUrl: 'approve-expense.html'
})
export class ApproveExpensePage implements OnInit {
  expenses: Expense[];
  profile: Profile[];
  constructor(public navCtrl: NavController,private expenseService1:ExpenseFbProvider) {
  }
 /* 
  ngOnInit(): void {
    this.profile = [
      new Profile("Amy", "$12 Transport","Uber","Attend Meeting","assets/img/lhvbjFoRPOveZsP5vKki_profile-female.jpg"),
      new Profile("Ben", "$888 Accomodation","Hard Rock Hotel RWS","assets/img/VRZ91uDVRQOjewiKsGYv_profile-male.jpg")];
 
  }
  */
  ngOnInit():void {
    this.expenseService1.getItemsByStatus('pending')
    .subscribe(expenses => {
    this.expenses = expenses;
    });
    } 
 
    approveExpense(item: Expense) {
      item.status = 'approved';
      this.expenseService1.updateItem(item);
      }

      rejectExpense(item: Expense) {
        item.status = 'rejected';
        this.expenseService1.updateItem(item);
        }
  
}
