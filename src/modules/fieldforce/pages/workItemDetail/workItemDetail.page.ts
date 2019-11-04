import { Component, OnInit } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery, ReferenceValuesQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReferenceValue, ReferenceValueItem } from 'ngscaffolding-models';
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
  isLoaded = false;

  filterValue: string;
  selectedAsset: string;

  shippedAssetsFull: ReferenceValueItem[];
  shippedAssets: ReferenceValueItem[];

  ngOnInit(): void {
    this.workItem = this.workItemsQuery.getEntity(this.workItemsQuery.getActiveId());
    this.updateStages$ = this.refValuesService.getReferenceValue('FieldForce.WorkItemUpdateStages.Reference');
    this.refValuesService.getReferenceValue('FieldForce.WorkItemUpdateCodes.Reference').subscribe(refVal => {
      this.fullUpdateCodes = refVal.referenceValueItems;
    });

    this.refValuesService.getReferenceValue('FieldForce.ShippedAssets.Reference').subscribe(refVal => {
      this.shippedAssetsFull = refVal.referenceValueItems;
      this.shippedAssets = refVal.referenceValueItems;
    });
  }

  ionViewDidEnter(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 500);
  }

  statusChanged($event: any) {
    // tslint:disable-next-line: triple-equals
    this.updateStatus2 = null;
    this.updateCodes = this.fullUpdateCodes.filter(c => c.subtitle == this.updateStatus);
  }

  sendUpdate() {
    this.workItemsService.sendUpdate(this.workItem.WorkItemID, this.updateStatus2, this.updateComment);

    const completeCode = this.updateCodes.find(code => code.display === 'Work Completed').value;
    // TODO: Magic Number
    const completeStatus = 5;
    if (this.updateStatus2 === completeCode) {
      this.workItem.WorkItemStatusCodeID = completeStatus;
    }

    setTimeout(_ => {
      this.notification.showMessage({
        summary: 'Update',
        detail: 'Update Details Sent',
        severity: 'success'
      });
    }, 500);
  }

  sendAsset() {
    this.workItemsService.sendAdditionalValues(this.workItem.WorkItemID, { AssetTag: this.selectedAsset });

    setTimeout(_ => {
      this.notification.showMessage({
        summary: 'Asset Update',
        detail: 'Asset Details Sent',
        severity: 'success'
      });
    }, 500);
  }

  updateFilter(filterValue: string) {
    this.shippedAssets = this.shippedAssetsFull.filter(asset => asset.value.toUpperCase().startsWith(this.filterValue.toUpperCase()));
  }

  constructor(
    private notification: NotificationService,
    private refValuesService: ReferenceValuesService,
    private route: ActivatedRoute,
    private workItemsQuery: WorkItemsQuery,
    private workItemsService: WorkItemsService
  ) {}
}
