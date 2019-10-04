import { Component } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ReferenceValue } from 'ngscaffolding-models';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatusUpdatesService } from '../../services/statusUpdates/statusUpdates.service';
import { ToastController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { WorkItemsQuery } from '../../services/workItems/workItems.query';
import { WorkItem } from '../../models';
import { WorkItemsService } from '../../services/workItems/workItems.service';
import { NotificationService } from '../../../../app/services/notification/notification.service';

@Component({
  templateUrl: 'workItemsList.page.html',
  styleUrls: ['workItemsList.page.scss']
})
export class WorkItemsListPage {
  workItems$: Observable<WorkItem[]>;
  constructor(
    private notification: NotificationService,
    private workItemsQuery: WorkItemsQuery,
    private workItemsService: WorkItemsService,
    private navCtrl: NavController,
    private refValuesService: ReferenceValuesService,
    private geolocation: Geolocation,
    private authQuery: UserAuthenticationQuery,
    private toastController: ToastController,
    private translate: TranslateService,
    private statusUpdateService: StatusUpdatesService
  ) {
    this.workItems$ = workItemsQuery.selectAll({});
  }

  refreshList() {

    this.workItemsService.getWorkItemUpdates();

    setTimeout(_ => {
      this.notification.showMessage({
        summary: 'Refresh',
        detail: 'Refresh request sent',
        severity: 'success'
      });
    }, 1000);
  }
}
