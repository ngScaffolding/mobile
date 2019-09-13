import { Component } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ReferenceValue } from 'ngscaffolding-models';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatusUpdate } from '../../models';
import { StatusUpdatesService } from '../../services/statusUpdates/statusUpdates.service';

@Component({
  templateUrl: 'send-update.page.html',
  styleUrls: ['send-update.page.scss']
})
export class SendUpdatePage {
  notifications$: Observable<ReferenceValue>;

  notificationStatus: any;

  constructor(refValuesService: ReferenceValuesService, private geolocation: Geolocation, private authQuery: UserAuthenticationQuery, private statusUpdateService: StatusUpdatesService) {
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
      })
      .catch(error => {
        console.log('Error getting location', error);

        this.statusUpdateService.sendUpdate(update);
      });
  }
}
