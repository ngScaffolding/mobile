import { Query } from '@datorama/akita';
import { ApplicationState, ApplicationStore } from './application.store';

export class SessionQuery extends Query<ApplicationState> {
    referencesDownloaded$ = this.select(state => !!state.referencesDownloaded);

  constructor(protected store: ApplicationStore) {
    super(store);
  }
}
