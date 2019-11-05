import { Injectable } from '@angular/core';
import { QueryEntity, QueryConfig } from '@datorama/akita';
import { WorkItem } from '../../models';
import { WorkItemsState, WorkItemsStore } from './workItems.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'WorkItemStatusCodeID'
})

export class WorkItemsQuery extends QueryEntity<WorkItemsState, WorkItem> {
  constructor(protected store: WorkItemsStore) {
    super(store);
  }
}
