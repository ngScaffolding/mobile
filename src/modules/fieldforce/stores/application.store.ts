import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';


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

