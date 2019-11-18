import { APP_INITIALIZER } from '@angular/core';
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
  }
];
