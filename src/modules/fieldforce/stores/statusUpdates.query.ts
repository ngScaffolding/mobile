import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StatusUpdate } from '../models';
import { StatusUpdatesState, StatusUpdatesStore  } from './statusUpdates.store';

@Injectable({
  providedIn: 'root'
})
export class StatusUpdatesQuery extends QueryEntity<StatusUpdatesState, StatusUpdate> {
  constructor(protected store: StatusUpdatesStore) {
    super(store);
  }
}
