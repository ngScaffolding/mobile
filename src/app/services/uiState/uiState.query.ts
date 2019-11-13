import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { UIState, UIStateStore } from './uiState.store';

@Injectable({
  providedIn: 'root'
})
export class UIStateQuery extends Query<UIState> {

  // connected$ = this.select(state => state.isConnected);
  // type$ = this.select(state => state.type);

  constructor(protected store: UIStateStore) {
    super(store);
  }
}
