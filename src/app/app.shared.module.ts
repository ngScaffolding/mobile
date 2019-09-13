import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Translate
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})

export class SharedModule {}
