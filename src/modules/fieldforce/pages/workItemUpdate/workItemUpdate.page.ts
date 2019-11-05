import { Component } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ReferenceValue, ReferenceValueItem } from 'ngscaffolding-models';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatusUpdatesService } from '../../services/statusUpdates/statusUpdates.service';
import { ToastController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { WorkItemsQuery } from '../../services/workItems/workItems.query';
import { WorkItem } from '../../models';
import { WorkItemsService } from '../../services/workItems/workItems.service';
import { NotificationService } from '../../../../app/services/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkItemsStore } from '../../services/workItems/workItems.store';

@Component({
  templateUrl: 'workItemUpdate.page.html',
  styleUrls: ['workItemUpdate.page.scss']
})
export class WorkItemUpdatePage  {

  workItem$: Observable<WorkItem>;
  workItem: WorkItem;
  updateStages$: Observable<ReferenceValue>;
  fullUpdateCodes: ReferenceValueItem[];
  updateCodes: ReferenceValueItem[];
  updateStatus: any;
  updateStatus2: any;
  updateComment: string;


  ionViewDidEnter(): void {
    this.workItem$ = this.workItemsQuery.selectActive() as Observable<WorkItem>;
    this.workItem = this.workItemsQuery.getEntity(this.workItemsQuery.getActiveId());


    this.updateStages$ = this.refValuesService.getReferenceValue('FieldForce.WorkItemUpdateStages.Reference');
    this.refValuesService.getReferenceValue('FieldForce.WorkItemUpdateCodes.Reference').subscribe(refVal => {
      this.fullUpdateCodes = refVal.referenceValueItems;
    });
  }

  sendUpdate() {
    this.workItemsService.sendUpdate(this.workItem.WorkItemID, this.updateStatus2, this.updateComment);

    const completeCode = this.updateCodes.find(code => code.display === 'Work Completed').value;
    // TODO: Magic Number
    const completeStatus = 5;
    if (this.updateStatus2 === completeCode) {
      this.workItemsStore.updateActive({WorkItemStatusCodeID: completeStatus});
    }

    setTimeout(_ => {
      this.notification.showMessage({
        summary: 'Update',
        detail: 'Update Details Sent',
        severity: 'success'
      });
      this.updateStatus = null;
      this.updateStatus2 = null;
    }, 500);
  }

  statusChanged($event: any) {
    // tslint:disable-next-line: triple-equals
    this.updateStatus2 = null;
    this.updateCodes = this.fullUpdateCodes.filter(c => c.subtitle == this.updateStatus);
  }

  constructor(
    private notification: NotificationService,
    private refValuesService: ReferenceValuesService,
    private route: ActivatedRoute,
    private workItemsQuery: WorkItemsQuery,
    private workItemsStore: WorkItemsStore,
    private workItemsService: WorkItemsService
  ) {}
}
