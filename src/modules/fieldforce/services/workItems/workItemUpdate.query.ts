import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WorkItemUpdate } from '../../models/workitem.update.model';
import { WorkItemUpdateState , WorkItemUpdateStore } from './workItemUpdate.store';

@Injectable({
  providedIn: 'root'
})
export class WorkItemUpdateQuery extends QueryEntity<WorkItemUpdateState, WorkItemUpdate> {
  constructor(protected store: WorkItemUpdateStore) {
    super(store);
  }
}
