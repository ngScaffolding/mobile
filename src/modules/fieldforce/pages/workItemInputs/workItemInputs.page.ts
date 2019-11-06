import { Component } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ReferenceValue, ReferenceValueItem } from 'ngscaffolding-models';
import { WorkItemsQuery } from '../../services/workItems/workItems.query';
import { WorkItem } from '../../models';
import { WorkItemsService } from '../../services/workItems/workItems.service';
import { NotificationService } from '../../../../app/services/notification/notification.service';
import { Router } from '@angular/router';
import { WorkItemsStore } from '../../services/workItems/workItems.store';

@Component({
  templateUrl: 'workItemInputs.page.html',
  styleUrls: ['workItemInputs.page.scss']
})
export class WorkItemInputsPage {
  workItem: WorkItem;
  workItem$: Observable<WorkItem>;

  filterValue: string;
  selectedAsset: string;

  shippedAssetsFull: ReferenceValueItem[];
  shippedAssets: ReferenceValueItem[];

  constructor(
    private notification: NotificationService,
    private refValuesService: ReferenceValuesService,
    private workItemsQuery: WorkItemsQuery,
    private workItemsService: WorkItemsService,
    private router: Router,
    private workItemsStore: WorkItemsStore
  ) {
  }

  ionViewDidEnter(): void {
    this.workItem$ = this.workItemsQuery.selectActive() as Observable<WorkItem>;
    this.workItem = this.workItemsQuery.getEntity(this.workItemsQuery.getActiveId());

    this.refValuesService.getReferenceValue('FieldForce.ShippedAssets.Reference').subscribe(refVal => {
      this.shippedAssetsFull = refVal.referenceValueItems;
      this.shippedAssets = refVal.referenceValueItems;
    });
  }
  updateFilter(filterValue: string) {
    this.shippedAssets = this.shippedAssetsFull.filter(asset => asset.value.toUpperCase().startsWith(this.filterValue.toUpperCase()));
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
}
