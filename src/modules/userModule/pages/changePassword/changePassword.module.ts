import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../componentsModule/components.module';
import { ChangePasswordComponent } from './changePassword.component';
import { SharedModule } from '../../../../app/app.shared.module';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot(),
    SharedModule
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordPageModule {}
