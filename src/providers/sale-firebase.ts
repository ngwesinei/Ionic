import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Sale } from '../models/sale';
import { User } from '../models/User';
import { Product } from '../models/product';
import { AuthService } from './auth-service';
@Injectable()
export class SaleFbProvider {
  saleList: Sale[]; // Stores the expense list for search functionality
  userList: User[];
  myuser: User;
  productList: Product[];//Stores the product list for search functionality
  
  constructor(private db: AngularFireDatabase, private authService: AuthService) {
  }
  getItems(): Observable<any[]> {
    let expenseObservable: Observable<any[]>;
    expenseObservable =
      this.db.list('/saleItems/').snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({
            key:
              c.payload.key, ...c.payload.val()
          }))));
    expenseObservable.subscribe(result => {
      this.saleList = result;
    });
    return expenseObservable;
  }

  getItemsBySaleMan(saleMan: string): Observable<any[]> {
    let expenseObservable: Observable<any[]>;
    expenseObservable=this.db.list('/saleItems/', ref =>
    ref.orderByChild('saleMan').equalTo(saleMan)).snapshotChanges().
    pipe(
      map(changes =>
        changes.map(c => ({
          key:
            c.payload.key, ...c.payload.val()
        }))));
        expenseObservable.subscribe(result => {
          this.saleList = result;
        });
        return expenseObservable;
  }
  getItemsByProduct(productname: string): Observable<any[]> {
    let expenseObservable: Observable<any[]>;
    expenseObservable=this.db.list('/saleItems/', ref =>
    ref.orderByChild('productname').equalTo(productname)).snapshotChanges().
    pipe(
      map(changes =>
        changes.map(c => ({
          key:
            c.payload.key, ...c.payload.val()
        }))));
        expenseObservable.subscribe(result => {
          this.saleList = result;
        });
        return expenseObservable;
  }


  searchItems(val: string): Sale[] {
    if (!val || !val.trim()) {
      // if no search term, return all expenses.
      return this.saleList;
    }
    val = val.toLowerCase();
    // Filter locally instead of invoking multiple calls to server
    // esp when user types character by charcter in search bar
    return this.saleList.filter(item => item.date.toLowerCase().includes(val) 
    || item.productname.toString().toLowerCase().includes(val) 
    || item.team.toLowerCase().includes(val) || item.branch.toLowerCase().includes(val)|| item.saleMan.toLowerCase().includes(val));
  }
  addItem(item) {
    
    this.db.list('/saleItems/').push(item);
    
  }
  removeItem(item) {
    this.db.list('/saleItems/').remove(item.key);
  }
  updateItem(item) {
    
    this.db.list('/saleItems/').update(item.key, item);
  }

/**
 * for product data module 
 * 
*/
searchProductItems(val: string): Product[] {
  if (!val || !val.trim()) {
    // if no search term, return all expenses.
    return this.productList;
  }
  val = val.toLowerCase();
  // Filter locally instead of invoking multiple calls to server
  // esp when user types character by charcter in search bar
  return this.productList.filter(item => item.name.toLowerCase().includes(val) 
  || item.target.toLowerCase().includes(val) || item.price.toString().includes(val));
}

  getProductItems(): Observable<any[]> {
    let expenseObservable: Observable<any[]>;
    expenseObservable =
      this.db.list('/product/').snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({
            key:
              c.payload.key, ...c.payload.val()
          }))));
    expenseObservable.subscribe(result => {
      this.productList = result;
    });
    return expenseObservable;
  }
  addProductItem(item){
    this.db.list('/product/').push(item);
  }

  removeProductItem(item) {
    this.db.list('/product/').remove(item.key);
  }
  updateProductItem(item) {
   this.db.list('/product/').update(item.key, item);
  }

  /**
 * for user data 
 * 
 */
getUserItems(): Observable<any[]> {
  let expenseObservable: Observable<any[]>;
  expenseObservable =
    this.db.list('/user/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key:
            c.payload.key, ...c.payload.val()
        }))));
  expenseObservable.subscribe(result => {
    this.userList = result;
  });
  return expenseObservable;
}
  addUserItem(item) {
    item.photoURL="pic1.jpg";
    this.db.list('/user/').push(item);
    
  }
  getUserItemsByEmail(email: string): Observable<any[]> {
    let expenseObservable: Observable<any[]>;
    expenseObservable=this.db.list('/user/', ref =>
    ref.orderByChild('email').equalTo(email)).snapshotChanges().
    pipe(
      map(changes =>
        changes.map(c => ({
          key:
            c.payload.key, ...c.payload.val()
        }))));
        expenseObservable.subscribe(result => {
          this.userList = result;
        });
        return expenseObservable;
  }
  signup(email: string, password: string, level: string ,name: string){
    email=email.toLowerCase();
    this.myuser=new User(name,email,password,level);
    this.myuser.photoURL="";
    this.addUserItem(this.myuser);
 }
}