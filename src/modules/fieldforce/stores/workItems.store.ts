import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { WorkItem } from '../models';

export interface WorkItemsState extends EntityState<WorkItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workItems', idKey: 'WorkItemID' })

export class WorkItemsStore extends EntityStore<WorkItemsState, WorkItem> {

  constructor() {
    super();
    console.log('WorkItemsStore Constructor');
  }
}

