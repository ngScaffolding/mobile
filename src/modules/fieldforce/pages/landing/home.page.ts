import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusUpdatesService } from '../../services/statusUpdates/statusUpdates.service';
import { NetworkService } from 'src/app/services/network/network.service';
import { WorkItemsService } from '../../services/workItems/workItems.service';
import { ReferenceValuesQuery, ReferenceValuesService } from 'ngscaffolding-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const preLoad = ['FieldForce.WorkItemUpdateStages.Reference', 'FieldForce.WorkItemUpdateCodes.Reference', 'FieldForce.ShippedAssets.Reference'];

    for (const reference of preLoad) {
      this.subscriptions.push(this.refValuesService.getReferenceValue(reference).subscribe());
    }
  }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      for (const sub of this.subscriptions) {
        if (sub) {
          sub.unsubscribe();
        }
      }
    }
  }

  constructor(private statusUpdatesService: StatusUpdatesService, private refValuesService: ReferenceValuesService, private networkService: NetworkService, private workItemsService: WorkItemsService, private refValues: ReferenceValuesQuery) {}
}
