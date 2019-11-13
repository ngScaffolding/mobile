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
import { WorkItemsStore } from '../../services/workItems/workItems.store';

@Component({
  templateUrl: 'workItemTop.page.html',
  styleUrls: ['workItemTop.page.scss']
})
export class WorkItemTopPage {
  workItem$: Observable<WorkItem>;

  constructor(
    private workItemsQuery: WorkItemsQuery,
  ) {
  }

  ionViewDidEnter(): void {
    this.workItem$ = this.workItemsQuery.selectActive() as Observable<WorkItem>;
  }
}
