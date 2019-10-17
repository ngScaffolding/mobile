import { Injectable, NgZone } from '@angular/core';
import { StatusUpdatesStore } from '../../stores/statusUpdates.store';
import { NetworkQuery } from 'src/app/services/network/network.query';
import { StatusUpdate } from '../../models';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService, UserAuthenticationQuery, LoggingService } from 'ngscaffolding-core';
import { AppSettings } from 'ngscaffolding-models';
import { StatusUpdatesQuery } from '../../stores/statusUpdates.query';
import { timer, combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StatusUpdatesService {
  constructor(
    private log: LoggingService,
    private statusUpdatesStore: StatusUpdatesStore,
    private authQuery: UserAuthenticationQuery,
    private statusUpdatesQuery: StatusUpdatesQuery,
    private ngZone: NgZone,
    private networkQuery: NetworkQuery,
    private appSettingsService: AppSettingsService,
    private http: HttpClient
  ) {}

  public sendUpdate(statusUpdate: StatusUpdate) {
    // Simply push to our queue
    this.statusUpdatesStore.add(statusUpdate);
  }

  private processStatusUpdates() {
    if (this.networkQuery.isConnectedNow()) {
      if (this.statusUpdatesQuery.getCount() > 0) {
        const updates = this.statusUpdatesQuery.getAll();
        for (const update of updates) {
          this.http.post(this.appSettingsService.getValue(AppSettings.apiHome) + '/api/v1/statusupdates', update).subscribe(
            data => {
              this.log.info(`Status Update Sucessfully sent`);
              this.statusUpdatesStore.remove(update.NotificationID);
            },
            err => {
              this.log.error('Unable to send Status Update to Server');
            }
          );
        }
      } else {
        this.log.info('StatusUpdates Nothing to Send');
      }
    }
  }

  startPolling() {
    const poll = timer(0, 30000);
    const combined = combineLatest([poll, this.authQuery.authenticated$]);

    this.ngZone.runOutsideAngular(() => {
      combined.subscribe(([_poll, isAuthenticated]) => {
        if (!isAuthenticated) {
          return;
        }
        this.log.info('Starting StatusUpdates Polling');
        this.ngZone.run(() => this.processStatusUpdates());
      });
    });
  }
}
