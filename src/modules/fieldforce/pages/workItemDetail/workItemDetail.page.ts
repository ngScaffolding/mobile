import { Component, OnInit } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery, ReferenceValuesQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReferenceValue, ReferenceValueItem } from 'ngscaffolding-models';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatusUpdatesService } from '../../services/statusUpdates/statusUpdates.service';
import { ToastController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { WorkItemsQuery } from '../../services/workItems/workItems.query';
import { WorkItem } from '../../models';
import { WorkItemsService } from '../../services/workItems/workItems.service';

@Component({
  templateUrl: 'workItemDetail.page.html',
  styleUrls: ['workItemDetail.page.scss']
})
export class WorkItemDetailPage implements OnInit {

  workItem: WorkItem;

  updateStages$: Observable<ReferenceValue>;
  fullUpdateCodes: ReferenceValueItem[];
  updateCodes: ReferenceValueItem[];
  updateStatus: any;
  updateStatus2: any;

  ngOnInit(): void {
    this.workItem = this.workItemsQuery.getEntity(this.route.snapshot.params.id);
    this.updateStages$ = this.refValuesService.getReferenceValue('FieldForce.WorkItemUpdateStages.Reference');
    this.refValuesService.getReferenceValue('FieldForce.WorkItemUpdateCodes.Reference').subscribe(refVal => {
      this.fullUpdateCodes = refVal.referenceValueItems;
    });
  }

  statusChanged($event: any){
    // tslint:disable-next-line: triple-equals
    this.updateStatus2 = null;
    this.updateCodes = this.fullUpdateCodes.filter(c => c.subtitle == this.updateStatus);
  }
  sendUpdate(){
    this.workItemsService.sendUpdate(this.workItem.WorkItemID, this.updateStatus2);
  }

  constructor(
    private refValuesService: ReferenceValuesService,
    private route: ActivatedRoute,
    private workItemsQuery: WorkItemsQuery,
    private workItemsService: WorkItemsService,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private authQuery: UserAuthenticationQuery,
    private toastController: ToastController,
    private translate: TranslateService,
    private statusUpdateService: StatusUpdatesService
  ) {
  }

}
