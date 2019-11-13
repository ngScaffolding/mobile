import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkItemsQuery } from '../../services/workItems/workItems.query';
import { WorkItem } from '../../models';
import { WorkItemsService } from '../../services/workItems/workItems.service';
import { NotificationService } from '../../../../app/services/notification/notification.service';
import { Router } from '@angular/router';
import { WorkItemsStore } from '../../services/workItems/workItems.store';

@Component({
  templateUrl: 'workItemsList.page.html',
  styleUrls: ['workItemsList.page.scss']
})
export class WorkItemsListPage {
  workItems$: Observable<WorkItem[]>;
  showCompleted = false;

  constructor(
    private notification: NotificationService,
    private workItemsQuery: WorkItemsQuery,
    private workItemsService: WorkItemsService,
    private router: Router,
    private workItemsStore: WorkItemsStore
  ) {
    this.updateDisplayList();
  }

  updateDisplayList() {
    if (this.showCompleted) {
      this.workItems$ = this.workItemsQuery.selectAll({});
    } else {
      this.workItems$ = this.workItemsQuery.selectAll({ filterBy: workItem => workItem.WorkItemStatusCodeID !== 5 });
    }
  }

  openWorkItem(workItemId: string) {
    this.workItemsStore.setActive(workItemId);
    this.router.navigate(['/workitemdetail/details']);
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
