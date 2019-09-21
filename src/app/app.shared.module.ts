import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupPipe } from './pipes/lookup.pipe';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LookupPipe],
  imports: [CommonModule],
  exports: [CommonModule, TranslateModule, LookupPipe]
})
export class SharedModule {}
