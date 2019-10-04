import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { StatusUpdate } from '../models/status-update.model';

export interface StatusUpdatesState extends EntityState<StatusUpdate> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'statusUpdates', idKey: 'NotificationID' })

export class StatusUpdatesStore extends EntityStore<StatusUpdatesState, StatusUpdate> {

  constructor() {
    super();
    console.log('StatusUpdatesState Constructor');
  }
}

