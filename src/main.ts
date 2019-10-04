import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableAkitaProdMode, persistState, akitaConfig } from '@datorama/akita';
import { debounceTime } from 'rxjs/operators';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

akitaConfig({
  resettable: true
});

persistState({
  preStorageUpdateOperator: () => debounceTime(10)}
);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
