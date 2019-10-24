import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface UIState {
  logonRememberMe: boolean;
  logonUserID: string;
}

const UIStateInitial: UIState = {
  logonRememberMe: false,
  logonUserID: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'UIState' })
export class UIStateStore extends Store<UIState> {
  constructor() {
    super(UIStateInitial);
    console.log('UIStateStore Constructor');
  }
}
