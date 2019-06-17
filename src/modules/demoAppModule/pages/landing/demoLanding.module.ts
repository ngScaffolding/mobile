import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DemoLandingComponent } from './demoLanding.component';

const routes: Routes = [
  {
    path: '',
    component: DemoLandingComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot()
  ],
  declarations: [DemoLandingComponent]
})
export class DemoLandingPageModule {}
