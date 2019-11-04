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
import { Router } from '@angular/router';
import { WorkItemsStore } from '../../stores/workItems.store';

@Component({
  templateUrl: 'workItemsList.page.html',
  styleUrls: ['workItemsList.page.scss']
})
export class WorkItemsListPage {
  workItems$: Observable<WorkItem[]>;
  showCompleted = true;

  constructor(
    private notification: NotificationService,
    private workItemsQuery: WorkItemsQuery,
    private workItemsService: WorkItemsService,
    private router: Router,
    private workItemsStore: WorkItemsStore
  ) {
    this.workItems$ = workItemsQuery.selectAll({});
  }

  showCompletedChanged() {
    if (this.showCompleted) {
      this.workItems$ = this.workItemsQuery.selectAll({});
    } else {
      this.workItems$ = this.workItemsQuery.selectAll({ filterBy: workItem => workItem.WorkItemStatusCodeID !== 5 });
    }
  }

  openWorkItem(workItemId: string) {
    this.workItemsStore.setActive(workItemId);
    setTimeout(() => {
      this.router.navigate(['/workitemdetail']);
    }, 50);
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
