import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { WorkItemUpdate } from '../../models/workitem.update.model';

export interface WorkItemUpdateState extends EntityState<WorkItemUpdate> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workItemsUpdateState', idKey: 'WorkItemUpdateID' })

export class WorkItemUpdateStore extends EntityStore<WorkItemUpdateState, WorkItemUpdate> {

  constructor() {
    super();
    console.log('WorkItemUpdateStore Constructor');
  }
}

