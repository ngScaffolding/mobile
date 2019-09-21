import { Component } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ReferenceValue } from 'ngscaffolding-models';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatusUpdate } from '../../models';
import { StatusUpdatesService } from '../../services/statusUpdates/statusUpdates.service';
import { ToastController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'send-update.page.html',
  styleUrls: ['send-update.page.scss']
})
export class SendUpdatePage {
  notifications$: Observable<ReferenceValue>;

  notificationStatus: any;

  constructor(
    private navCtrl: NavController,
    private refValuesService: ReferenceValuesService,
    private geolocation: Geolocation,
    private authQuery: UserAuthenticationQuery,
    private toastController: ToastController,
    private translate: TranslateService,
    private statusUpdateService: StatusUpdatesService
  ) {
    this.notifications$ = refValuesService.getReferenceValue('FieldForce.NotificationCodes.Reference');
  }

  sendUpdate() {
    const update = new StatusUpdate();
    update.NotificationCodeID = this.notificationStatus;
    update.UserName = this.authQuery.getUserId();
    update.When = new Date();

    this.geolocation
      .getCurrentPosition({ enableHighAccuracy: true })
      .then(resp => {
        console.log(`Got Location ${JSON.stringify(resp)}`);

        update.Longitude = resp.coords.longitude;
        update.Latitude = resp.coords.latitude;
        update.Accuracy = resp.coords.accuracy;

        this.statusUpdateService.sendUpdate(update);
        this.messageSent();
      })
      .catch(error => {
        console.log('Error getting location', error);

        this.statusUpdateService.sendUpdate(update);
        this.messageSent();
      });
  }

  async messageSent() {
    const toast = await this.toastController.create({
      message: this.translate.instant('Status Update Sent'),
      duration: 2000
    });
    toast.present();
    setTimeout(_ => {
      this.navCtrl.back();
    }, 1000);
  }
}
