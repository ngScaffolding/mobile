import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../app/app.shared.module';
import { SupportFieldForcePage } from './supportFieldForce.page';
import { AlertController } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SupportFieldForcePage
      }
    ])
  ],
  providers:[AlertController],
  declarations: [SupportFieldForcePage]
})
export class SupportFieldForcePageModule {}
