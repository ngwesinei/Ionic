import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BySaleManPage } from '../by-sale-man/by-sale-man';
import { ByProductPage } from '../by-product/by-product';
import { ByTeamPage } from '../by-team/by-team';
import {SummaryPage} from '../summary/summary';
import {SaleManGraphPage} from '../sale-man-graph/sale-man-graph';

@Component({
  selector: 'page-sales-progress',
  templateUrl: 'sales-progress.html'
})
export class SalesProgressPage {

  tab1Root = ByProductPage;
  tab2Root = BySaleManPage;
 // tab3Root = ByTeamPage;
  //tab4Root = ByGraphPage;
  tab5Root = SummaryPage;
  tab6Root = SaleManGraphPage;
  constructor(public navCtrl: NavController) {
  }
  
}
