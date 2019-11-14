import { APP_INITIALIZER } from '@angular/core';
import { dependencies as statusUpdatesDependencies, startPolling } from './statusUpdates.init';
import { dependencies as workItemUpdatesDependencies, startWorkItemsPolling } from './workItemsUpdates.init';
import { dependencies as cacheDependencies, warmCache } from './cache.init';
import { AppSettingsService } from 'ngscaffolding-core';
import { environment } from '../environments/environment';

const appInitializerFn = (appConfig: AppSettingsService) => {
  return () => {
    return new Promise((resolve, reject) => {
      appConfig.setValues(environment.appConfig);
      resolve();
    });
  };
};

export const appInitialisers = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    multi: true,
    deps: [AppSettingsService]
  },
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
  }
];
