import { Component, OnInit } from '@angular/core';
import { ReferenceValuesService, UserAuthenticationQuery, ReferenceValuesQuery } from 'ngscaffolding-core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReferenceValue, ReferenceValueItem } from 'ngscaffolding-models';
import { WorkItemsQuery } from '../../services/workItems/workItems.query';
import { WorkItem } from '../../models';
import { WorkItemsService } from '../../services/workItems/workItems.service';
import { NotificationService } from '../../../../app/services/notification/notification.service';
import { WorkItemsStore } from '../../services/workItems/workItems.store';

@Component({
  templateUrl: 'workItemDetail.page.html',
  styleUrls: ['workItemDetail.page.scss']
})
export class WorkItemDetailPage {
  workItem: WorkItem;
  workItem$: Observable<WorkItem>;




  ionViewDidEnter(): void {
    this.workItem$ = this.workItemsQuery.selectActive() as Observable<WorkItem>;

    this.workItem = this.workItemsQuery.getEntity(this.workItemsQuery.getActiveId());
  }





  constructor(
    private notification: NotificationService,
    private route: ActivatedRoute,
    private workItemsQuery: WorkItemsQuery,
    private workItemsStore: WorkItemsStore,
    private workItemsService: WorkItemsService
  ) {}
}
