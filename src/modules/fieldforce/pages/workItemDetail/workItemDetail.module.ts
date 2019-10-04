import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../app/app.shared.module';
import { WorkItemDetailPage } from './WorkItemDetail.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SuperTabsModule,
    RouterModule.forChild([
      {
        path: '',
        component: WorkItemDetailPage
      }
    ])
  ],
  declarations: [WorkItemDetailPage]
})
export class WorkItemDetailPageModule {}
