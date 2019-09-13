import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { NetworkState, NetworkStore } from './network.store';

@Injectable({
  providedIn: 'root'
})
export class NetworkQuery extends Query<NetworkState> {

  connected$ = this.select(state => state.isConnected);
  type$ = this.select(state => state.type);

  constructor(protected store: NetworkStore) {
    super(store);
  }

  isConnectedNow() {
    return toBoolean(this.getValue().isConnected);
  }
}
