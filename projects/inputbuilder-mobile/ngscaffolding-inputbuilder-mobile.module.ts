import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { VERSION } from './version';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VersionsService, CoreModule } from 'ngscaffolding-core';

import { IonicModule } from '@ionic/angular';
import { InputBuilderComponent } from './inputBuilder/inputBuilder.component';

import { AutoCompleteModule } from 'ionic4-auto-complete';

// Components
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    IonicModule,
    HttpClientModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [InputBuilderComponent],
  exports: [InputBuilderComponent]
})
export class InputBuilderMobileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputBuilderMobileModule
    };
  }
  constructor(versions: VersionsService) {
    versions.addVersion('ngscaffolding-inputbuilder-mobile', VERSION.version);
  }
}
