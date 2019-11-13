import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { resetStores } from '@datorama/akita';
import { LoggingService } from 'ngscaffolding-core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-supportFieldForce',
  templateUrl: 'supportFieldForce.page.html',
  styleUrls: ['supportFieldForce.page.scss']
})
export class SupportFieldForcePage {
  
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private logger: LoggingService,
    private translate: TranslateService
  ) {}

  async clearCache() {
    const alert = await this.alertController.create({
      header: this.translate.instant('Confirm Clear'),
      message: this.translate.instant('This will remove ALL offline updates. Continue?'),
      buttons: [
        {
          text: this.translate.instant('Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel');
          }
        },
        {
          cssClass: 'danger',
          text: this.translate.instant('Clear Cache'),
          handler: () => {
            this.logger.warning('User Cleared Cache');

            // Clear Akita Stores
            resetStores();

            const toast = this.toastController.create({
              message: this.translate.instant('Cache Cleared.'),
              duration: 2000
            });

            // setTimeout(() => {
            //   this.router.navigateByUrl('/login');
            // }, 2100);
          }
        }
      ]
    });

    await alert.present();
  }
}
