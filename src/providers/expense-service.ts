import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { EXPENSES } from '../mock/mock-expenses';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ExpenseService {

private expensesUrl = '../assets/mock-expenses.json';
   
 constructor(private http: HttpClient) { }

 getExpenses(): Observable<Expense[]>{
 return this.http.get<Expense[]>(this.expensesUrl)
 }
/*Get expenses whose name contains search val */
searchExpenses(val: string): Observable<Expense[]> {
    if (!val || !val.trim()) {
    // if no search term, return all expenses.
    return this.getExpenses();
    }
    
    return this.http.get<Expense[]>(this.expensesUrl)
    .pipe(
    map(expenses => expenses.filter(item =>
    item.merchant.toLowerCase().includes(val.toLowerCase()) ||
    item.category.toLowerCase().includes(val.toLowerCase()) ||
    item.notes && item.notes.toLowerCase().includes(val.toLowerCase())) )
    );
    }

}