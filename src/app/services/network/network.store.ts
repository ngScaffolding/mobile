import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { createBasicUser, BasicUser } from 'ngscaffolding-models';

export interface NetworkState {
  isConnected?: boolean;
  type?: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'networkState' })
export class NetworkStore extends Store<NetworkState> {
  constructor() {
    super({ isConnected: true, type: '' });
    console.log('NetworkStore Constructor');
  }
}
