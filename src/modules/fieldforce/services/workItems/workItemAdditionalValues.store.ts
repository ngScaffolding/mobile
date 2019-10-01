import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { WorkItemAdditionalValues } from '../../models';
export interface WorkItemAdditionalValuesState extends EntityState<WorkItemAdditionalValues> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workItemsAdditionalValuesState', idKey: 'AdditionalValueID' })

export class WorkItemAdditionalValuesStore extends EntityStore<WorkItemAdditionalValuesState, WorkItemAdditionalValues> {

  constructor() {
    super();
    console.log('WorkItemAdditionalValuesStore Constructor');
  }
}

