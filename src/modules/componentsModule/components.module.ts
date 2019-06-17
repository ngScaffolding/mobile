import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';


import { HeaderBarComponent } from './headerBar/headerBar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule
  ],
  declarations: [ HeaderBarComponent ],
  exports: [ HeaderBarComponent ]
})
export class ComponentsModule {}