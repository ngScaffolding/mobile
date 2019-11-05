import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { WorkItem } from '../models';

export interface WorkItemsState extends EntityState<WorkItem>, ActiveState {}

const initialState = {
  active: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workItems', idKey: 'WorkItemID' })

export class WorkItemsStore extends EntityStore<WorkItemsState, WorkItem> {
  constructor() {
    super(initialState);
    console.log('WorkItemsStore Constructor');
  }
}

