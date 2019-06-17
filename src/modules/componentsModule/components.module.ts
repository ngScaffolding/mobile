import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderBarComponent } from './headerBar/headerBar.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [ HeaderBarComponent ],
  exports: [ HeaderBarComponent ]
})
export class ComponentsModule {}