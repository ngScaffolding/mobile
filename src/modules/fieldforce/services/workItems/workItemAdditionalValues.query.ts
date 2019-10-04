import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WorkItemAdditionalValuesState , WorkItemAdditionalValuesStore } from './workItemAdditionalValues.store';
import { WorkItemAdditionalValues } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class WorkItemAdditionalValuesQuery extends QueryEntity<WorkItemAdditionalValuesState, WorkItemAdditionalValues> {
  constructor(protected store: WorkItemAdditionalValuesStore) {
    super(store);
  }
}
