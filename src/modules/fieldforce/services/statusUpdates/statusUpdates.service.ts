import { Injectable } from '@angular/core';
import { StatusUpdatesStore } from '../../stores/statusUpdates.store';
import { NetworkQuery } from 'src/app/services/network/network.query';
import { StatusUpdate } from '../../models';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from 'ngscaffolding-core';
import { AppSettings } from 'ngscaffolding-models';
import { StatusUpdatesQuery } from '../../stores/statusUpdates.query';

@Injectable({ providedIn: 'root' })
export class StatusUpdatesService {
  constructor(private statusUpdatesStore: StatusUpdatesStore,
     private statusUpdatesQuery: StatusUpdatesQuery,
     private networkQuery: NetworkQuery, private appSettingsService: AppSettingsService, private http: HttpClient) {
    setInterval(_ => {
      if (networkQuery.isConnectedNow()) {
        if (statusUpdatesQuery.getCount() > 0) {
          let updates = statusUpdatesQuery.getAll();
          for (const update of updates) {
            this.http.post(this.appSettingsService.getValue(AppSettings.apiHome) + '/api/v1/statusupdates', update).subscribe(
              data => {
                console.log(`Status Update Sucessfully sent`, update);
                statusUpdatesStore.remove(update.NotificationID);
              },
              err => {
                console.log('Unable to send Error to Server, offline?');
              }
            );
          }
        }

      }
    }, 30000);
  }

  public sendUpdate(statusUpdate: StatusUpdate) {
    // Simply push to our queue
    this.statusUpdatesStore.add(statusUpdate);
  }
}
