import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthoriseRoleGuard } from 'ngscaffolding-core';


const appRoutes: Routes = [
  // { path: 'changepassword', loadChildren: './pages/changePassword/changePassword.module#ChangePasswordPageModule', canActivate: [AuthoriseRoleGuard] },
  { path: 'changepassword', loadChildren: './pages/changePassword/changePassword.module#ChangePasswordPageModule'},
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [ ],
  exports: [ ]
})
export class UserModule {}
