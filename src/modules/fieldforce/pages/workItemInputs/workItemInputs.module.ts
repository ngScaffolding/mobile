import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../app/app.shared.module';
import { WorkItemInputsPage } from './workItemInputs.page';

import { InputBuilderModule } from 'ngscaffolding-inputbuilder-mobile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: WorkItemInputsPage
      }
    ])
  ],
  declarations: [WorkItemInputsPage]
})
export class WorkItemInputsPageModule {}
