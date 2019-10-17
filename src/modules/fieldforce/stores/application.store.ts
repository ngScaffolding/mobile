import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, Store } from '@datorama/akita';
import { WorkItem } from '../models';
import { create } from 'domain';


@Injectable({ providedIn: 'root' })


export interface ApplicationState {
    referencesDownloaded: boolean;
 }

 export function createInitialState(): ApplicationState {
   return {
     referencesDownloaded: false
   };
 }

 @StoreConfig({ name: 'workItems', idKey: 'WorkItemID' })
export class ApplicationStore extends Store<ApplicationState> {

  constructor() {
    super(createInitialState());
  }
}

