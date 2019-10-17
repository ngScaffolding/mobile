import { APP_INITIALIZER } from '@angular/core';
import { dependencies as statusUpdatesDependencies, startPolling } from './statusUpdates.init';
import { dependencies as workItemUpdatesDependencies, startWorkItemsPolling } from './workItemsUpdates.init';
import { dependencies as cacheDependencies, warmCache } from './cache.init';

export const appInitialisers = [
  {
    provide: APP_INITIALIZER,
    useFactory: startPolling,
    multi: true,
    deps: statusUpdatesDependencies
  },
  {
    provide: APP_INITIALIZER,
    useFactory: startWorkItemsPolling,
    multi: true,
    deps: workItemUpdatesDependencies
  },
  {
    provide: APP_INITIALIZER,
    useFactory: warmCache,
    multi: true,
    deps: cacheDependencies
  }
];
