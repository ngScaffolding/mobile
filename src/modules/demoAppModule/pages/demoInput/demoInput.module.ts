import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../componentsModule/components.module';
import { DemoInputComponent } from './demoInput.component';
import { InputBuilderMobileModule } from 'ngscaffolding-inputbuilder-mobile';

const routes: Routes = [
  {
    path: '',
    component: DemoInputComponent
  }
];

@NgModule({
  imports: [CommonModule, ComponentsModule, FormsModule, InputBuilderMobileModule, IonicModule, RouterModule.forChild(routes), TranslateModule.forRoot()],
  declarations: [DemoInputComponent]
})
export class DemoInputPageModule {}
