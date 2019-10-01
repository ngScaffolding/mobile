import { Component, OnInit } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery, ReferenceValuesQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReferenceValue, ReferenceValueItem } from 'ngscaffolding-models';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatusUpdatesService } from '../../services/statusUpdates/statusUpdates.service';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { WorkItemsQuery } from '../../services/workItems/workItems.query';
import { WorkItem } from '../../models';
import { WorkItemsService } from '../../services/workItems/workItems.service';
import { NotificationService } from '../../../../app/services/notification/notification.service';

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
  updateComment: string;

  filterValue: string;
  selectedAsset: string;

  shippedAssetsFull: ReferenceValueItem[];
  shippedAssets: ReferenceValueItem[];

  ngOnInit(): void {
    this.workItem = this.workItemsQuery.getEntity(this.route.snapshot.params.id);
    this.updateStages$ = this.refValuesService.getReferenceValue('FieldForce.WorkItemUpdateStages.Reference');
    this.refValuesService.getReferenceValue('FieldForce.WorkItemUpdateCodes.Reference').subscribe(refVal => {
      this.fullUpdateCodes = refVal.referenceValueItems;
    });

    this.refValuesService.getReferenceValue('FieldForce.ShippedAssets.Reference').subscribe(refVal => {
      this.shippedAssetsFull = refVal.referenceValueItems;
      this.shippedAssets = refVal.referenceValueItems;
    });
  }

  statusChanged($event: any) {
    // tslint:disable-next-line: triple-equals
    this.updateStatus2 = null;
    this.updateCodes = this.fullUpdateCodes.filter(c => c.subtitle == this.updateStatus);
  }

  sendUpdate() {
    this.workItemsService.sendUpdate(this.workItem.WorkItemID, this.updateStatus2, this.updateComment);

    setTimeout(_ => {
      this.notification.showMessage({
        summary: 'Update',
        detail: 'Update Details Sent',
        severity: 'success'
      });
    }, 1000);
  }

  sendAsset() {
    this.workItemsService.sendAdditionalValues(this.workItem.WorkItemID, {AssetTag: this.selectedAsset});

        setTimeout(_ => {
      this.notification.showMessage({
        summary: 'Asset Update',
        detail: 'Asset Details Sent',
        severity: 'success'
      });
    }, 1000);
  }

  updateFilter(filterValue: string) {
    this.shippedAssets = this.shippedAssetsFull.filter(asset => asset.value.toUpperCase().startsWith(this.filterValue.toUpperCase()));
  }

  constructor(
    private notification: NotificationService,
    private refValuesService: ReferenceValuesService,
    private route: ActivatedRoute,
    private workItemsQuery: WorkItemsQuery,
    private workItemsService: WorkItemsService,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private authQuery: UserAuthenticationQuery,
    private translate: TranslateService,
    private statusUpdateService: StatusUpdatesService
  ) {}
}