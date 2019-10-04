import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupPipe } from './pipes/lookup.pipe';

// Pipes
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'ngscaffolding-core';

@NgModule({
  declarations: [LookupPipe],
  imports: [CommonModule],
  exports: [CommonModule, TranslateModule, LookupPipe, CoreModule]
})
export class SharedModule {}
