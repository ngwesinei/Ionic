import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SaleFbProvider } from '../../providers/sale-firebase';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'page-summary',
    templateUrl: 'summary.html'
})
export class SummaryPage {
    chart: Highcharts.Chart;
    constructor(public navCtrl: NavController, private saleService: SaleFbProvider) {
    }
    ionViewDidLoad() {
        this.chart = (Highcharts as any).chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Sales'
            },
            xAxis: {
                categories: ['Team A', 'Team B', 'Team C', 'Team D']
            },
            yAxis: {
                title: {
                    text: 'Amount ($)'
                }
            },
            series: [{
                name: 'Vitamins',
                data: [1, 0, 4, 8]
            }, {
                name: 'Minerals',
                data: [5, 7, 3, 9]
            }]
        });
        var data = [];
        this.saleService.getItems()
            .subscribe(saleData => {
                for (let sale of saleData) {
                    var array;
                    if (data[sale.productname] == null) {
                        array = [0, 0, 0, 0];
                        data[sale.productname] = array;
                    }
                    else
                        array = data[sale.productname];
                    switch (sale.team) {
                        case 'Team A':
                            array[0] += parseFloat(sale.amount);
                            break;
                        case 'Team B':
                            array[1] += parseFloat(sale.amount);
                            break;
                        case 'Team C':
                            array[2] += parseFloat(sale.amount);
                            break;
                        case 'Team D':
                            array[3] += parseFloat(sale.amount);
                        default:
                            break;
                    }
                }
                while (this.chart.series.length > 0) {
                    this.chart.series[0].remove(false);
                }
                for (let series in data) {
                    this.chart.addSeries({
                      name: series,
                      data: data[series],
                      type: 'bar'
                     });
                  }

            });
    }
}