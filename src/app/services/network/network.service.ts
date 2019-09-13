import { Network } from '@ionic-native/network/ngx';
import { Injectable } from '@angular/core';
import { NetworkStore } from './network.store';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  constructor(private network: Network, private networkStore: NetworkStore) {
    // watch network for a disconnection
    network.onDisconnect().subscribe(() => {
      networkStore.update({ isConnected: false, type: null });
      console.log('network was disconnected :-(');
    });

    // watch network for a connection
    network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        networkStore.update({ isConnected: true, type: this.network.type });
        console.log(`Netowork Connected - ${this.network.type}`);
      }, 3000);
    });
  }
}
