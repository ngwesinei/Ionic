import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SaleFbProvider } from '../../providers/sale-firebase';
import { AuthService } from '../../providers/auth-service';

@Component({
    selector: 'page-by-sale-man',
    templateUrl: 'by-sale-man.html'
})
export class BySaleManPage {

    results: Array<{ profile: string, title: string, totamount: any, Email: string }> = [];


    constructor(public navCtrl: NavController, private saleService: SaleFbProvider, private authService: AuthService) {
    }
    ionViewDidLoad() {

        this.saleService.getUserItems().subscribe(user => {
            for (let u of user) {
               // var imgSrc = "";
                var amount = 0
                
                if (u.photoURL && u.photoURL.length > 0) {
                    this.authService.getDownloadUrl(u.photoURL).then(
                        (url) => {
                            console.log('Retrieved image ' + url);
                            
                           // imgSrc = url;
                            this.saleService.getItemsBySaleMan(u.name).subscribe(saleData => {
                                for (let sale of saleData) {
                                    amount = amount + sale.amount;
                                }
                                this.results.push({ profile:url, title: u.name, Email: u.email, totamount: amount });
                               // imgSrc="";
                                amount = 0;
                               
                            });

                        }, (err) => {
                            // Handle error
                            
                        });
                }
                
              
               

            }
        });
    }

}
