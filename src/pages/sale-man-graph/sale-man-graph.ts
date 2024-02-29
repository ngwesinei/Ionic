import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SaleFbProvider } from '../../providers/sale-firebase';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'page-salemangraph',
    templateUrl: 'sale-man-graph.html'
})
export class SaleManGraphPage {
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
                categories: ['Maria', 'Chris', 'Amy', 'David','Joe']
            },
            yAxis: {
                title: {
                    text: 'Amount ($)'
                }
            },
            series: [{
                name: 'Vitamins',
                data: [1, 0, 4, 8, 2]
            }, {
                name: 'Minerals',
                data: [5, 7, 3, 9, 2]
            }]
        });
        var data = [];
        this.saleService.getItems()
            .subscribe(saleData => {
                for (let sale of saleData) {
                    var array;
                    if (data[sale.productname] == null) {
                        array = [0, 0, 0, 0, 0];
                        data[sale.productname] = array;
                    }
                    else
                        array = data[sale.productname];
                    switch (sale.saleMan) {
                        case 'Maria':
                            array[0] += parseFloat(sale.amount);
                            break;
                        case 'Chris':
                            array[1] += parseFloat(sale.amount);
                            break;
                        case 'Amy':
                            array[2] += parseFloat(sale.amount);
                            break;
                        case 'David':
                            array[3] += parseFloat(sale.amount);
                            break;
                        case 'Joe':
                            array[4] += parseFloat(sale.amount);
                            break;
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