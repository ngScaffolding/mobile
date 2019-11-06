import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../app/app.shared.module';
import { WorkItemDetailPage } from './workItemDetail.page';
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
        component: WorkItemDetailPage,
        children: [
          {
              path: 'details',
              loadChildren: () => import('../workItemTop/workItemTop.module').then(m => m.WorkItemTopPageModule)
          },
          {
              path: 'record',
              loadChildren: () => import('../workItemInputs/workItemInputs.module').then(m => m.WorkItemInputsPageModule)
          },
          {
              path: 'update',
              loadChildren: () => import('../workItemUpdate/workItemUpdate.module').then(m => m.WorkItemUpdatePageModule)
          }
      ]
      },
      {
          path: '',
          redirectTo: 'workitemdetails/details',
          pathMatch: 'full'
      }
    ])
  ],
  declarations: [WorkItemDetailPage]
})
export class WorkItemDetailPageModule {}
