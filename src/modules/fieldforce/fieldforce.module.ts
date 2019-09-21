import { NgModule, ModuleWithProviders } from '@angular/core';
import { VERSION } from './version';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AppSettings } from '@ngscaffolding/models';
import { ComponentsModule } from '../../modules/componentsModule/components.module';


import {
  AuthoriseRoleGuard,
  AppSettingsService,
  MenuService,
  LoggingService, ReferenceValuesService,
  VersionsService
} from 'ngscaffolding-core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx';

const appRoutes: Routes = [
  { path: 'home', loadChildren: './pages/landing/home.module#HomePageModule', canActivate: [AuthoriseRoleGuard] },
  { path: 'sendupdate', loadChildren: './pages/sendUpdate/send-update.module#SendUpdatePageModule', canActivate: [AuthoriseRoleGuard] },
  { path: 'workitems', loadChildren: './pages/workItemsList/workItemsList.module#WorkItemsListPageModule', canActivate: [AuthoriseRoleGuard] },
  { path: 'workitemdetail/:id', loadChildren: './pages/workItemDetail/workItemDetail.module#WorkItemDetailPageModule', canActivate: [AuthoriseRoleGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [  ],
  exports: [],
  providers:[
    Geolocation,
    Network
  ]
})
export class FieldForceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FieldForceModule
    };
  }

  constructor(
    appSettingsService: AppSettingsService,
    menuService: MenuService,
    logger: LoggingService,
    referenceValuesService: ReferenceValuesService,
    versions: VersionsService
  ) {
    logger.info('Setting Values', 'FieldForceApp.startup');

    versions.addVersion('fieldforceMobile', VERSION.version, true);

    appSettingsService.setValue(AppSettings.title , 'FieldForce');
    appSettingsService.setValue(AppSettings.iconUrl , '');
    appSettingsService.setValue(AppSettings.apiHome , 'http://localhost:3000');
    appSettingsService.setValue(AppSettings.apiAuth , 'http://localhost:3010');
    appSettingsService.setValue(AppSettings.authTokenEndpoint , '/auth/token');
    appSettingsService.setValue(AppSettings.errorLogConsole , true);
    appSettingsService.setValue(AppSettings.errorLogServer , true);
    appSettingsService.setValue(AppSettings.errorShowUser , true);

    appSettingsService.setValue(AppSettings.inputShowCalendarIcon , true);

    appSettingsService.setValue(AppSettings.showFullMessages , false);
    appSettingsService.setValue(AppSettings.showToastMessages , true);

    appSettingsService.setValue(AppSettings.showProfileSetting , true);
    appSettingsService.setValue(AppSettings.showProfilePicture , true);

    appSettingsService.setValue(AppSettings.authClientId , 'democlient');
    appSettingsService.setValue(AppSettings.authClientSecret , 'secret');
    appSettingsService.setValue(AppSettings.authScope , 'ngscaffoldingAPI');
    appSettingsService.setValue(AppSettings.authShowForgotPassword , true);
    appSettingsService.setValue(AppSettings.authShowRegister , true);
    appSettingsService.setValue(AppSettings.authShowRememberMe , true);
    appSettingsService.setValue(AppSettings.authSaveinLocalStorage , true);
    appSettingsService.setValue(AppSettings.authTermsAndConditions ,
      'Demo Application Your Terms and Conditions Here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo sed egestas.');

    menuService.addMenuItemsFromCode([
      {
        label: 'Chart Sample',
        icon: 'grid',
            routerLink: 'charttest'
      },
      {
        name: 'input.builder.simple',
        label: 'Input Builder',
        icon: 'brush',
        routerLink: 'inputbuildersimple'
      },
      {
        name: 'users.test',
        label: 'Users Test',
        icon: 'brush',
        routerLink: 'users/userdetails',
        order: 10000
      },
      {
        label: 'DataGrid Samples',
        items: [
          {
            label: 'Data Grid Test',
            icon: 'grid',
            routerLink: 'datagridtest'
          }
        ]
      },
      {
        label: 'Input Builder (Simple)',
        items: [

        ]
      }
    ]);
  }
}
