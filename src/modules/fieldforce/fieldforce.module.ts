import { NgModule, ModuleWithProviders } from '@angular/core';
import { VERSION } from './version';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AppSettings } from 'ngscaffolding-models';
import { ComponentsModule } from '../../modules/componentsModule/components.module';
import { InputBuilderMobileModule } from 'ngscaffolding-inputbuilder-mobile';

import {
    AuthoriseRoleGuard,
    AppSettingsService,
    MenuService,
    LoggingService,
    ReferenceValuesService,
    VersionsService
} from 'ngscaffolding-core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx';

const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: './pages/landing/home.module#HomePageModule',
        canActivate: [AuthoriseRoleGuard],
        data: { preload: true }
    },
    {
        path: 'sendupdate',
        loadChildren: './pages/sendUpdate/send-update.module#SendUpdatePageModule',
        canActivate: [AuthoriseRoleGuard],
        data: { preload: true }
    },
    {
        path: 'workitemdetail',
        loadChildren: './pages/workItemDetail/workItemDetail.module#WorkItemDetailPageModule',
        canActivate: [AuthoriseRoleGuard],
        data: { preload: true }
    },
    {
        path: 'workitems',
        loadChildren: './pages/workItemsList/workItemsList.module#WorkItemsListPageModule',
        canActivate: [AuthoriseRoleGuard],
        data: { preload: true }
    },
    {
        path: 'supportfieldforce',
        loadChildren: './pages/supportFieldForce/supportFieldForce.module#SupportFieldForcePageModule',
        canActivate: [AuthoriseRoleGuard],
        data: { preload: true }
    }
];

@NgModule({
    imports: [CommonModule, ComponentsModule, InputBuilderMobileModule, RouterModule.forChild(appRoutes)],
    declarations: [],
    exports: [],
    providers: [Geolocation, Network]
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
        logger.info('Setting Values Field ForceApp.startup');

        versions.addVersion('fieldforceMobile', VERSION.version, true);

        appSettingsService.setValue(AppSettings.title, 'FieldForce');
        appSettingsService.setValue(AppSettings.iconUrl, '');

        appSettingsService.setValue(AppSettings.authTokenEndpoint, '/auth/token');
        appSettingsService.setValue(AppSettings.errorLogConsole, true);
        appSettingsService.setValue(AppSettings.errorLogServer, true);
        appSettingsService.setValue(AppSettings.errorShowUser, true);

        appSettingsService.setValue(AppSettings.inputShowCalendarIcon, true);

        appSettingsService.setValue(AppSettings.showFullMessages, false);
        appSettingsService.setValue(AppSettings.showToastMessages, true);

        appSettingsService.setValue(AppSettings.showProfileSetting, true);
        appSettingsService.setValue(AppSettings.showProfilePicture, true);

        appSettingsService.setValue(AppSettings.dateTimeFormat, 'dd/mm/yyyy HH:MM TT');
        appSettingsService.setValue(AppSettings.dateFormat, 'dd/mm/yyyy');

        appSettingsService.setValue(AppSettings.authClientId, 'democlient');
        appSettingsService.setValue(AppSettings.authClientSecret, 'secret');
        appSettingsService.setValue(AppSettings.authScope, 'ngscaffoldingAPI');
        appSettingsService.setValue(AppSettings.authShowForgotPassword, true);
        appSettingsService.setValue(AppSettings.authShowRegister, true);
        appSettingsService.setValue(AppSettings.authShowRememberMe, true);
        appSettingsService.setValue(AppSettings.authSaveinLocalStorage, true);
        appSettingsService.setValue(
            AppSettings.authTermsAndConditions,
            'Demo Application Your Terms and Conditions Here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo sed egestas.'
        );

        appSettingsService.setValue(AppSettings.mobileCacheNames, [
            'FieldForce.WorkItemUpdateStages.Reference',
                'FieldForce.WorkItemUpdateCodes.Reference',
                'FieldForce.ShippedAssets.Reference',
                'FieldForce.Clients.Reference',
                'FieldForce.Priorities.Reference',
                'FieldForce.WorkItems.Types',
                'FieldForce.WorkItems.SubTypes',
                'FieldForce.StatusCodes.Reference',
                'FieldForce.NotificationCodes.Reference'
        ]);

        menuService.addMenuItemsFromCode([
            {
                label: 'Home',
                icon: 'home',
                routerLink: 'home',
                name: 'home',
                order: 100
            },
            {
                label: 'Work Items',
                icon: 'build',
                routerLink: 'workitems',
                name: 'workitems',
                order: 150
            },
            {
                label: 'FF Support',
                icon: 'settings',
                routerLink: 'supportfieldforce',
                name: 'supportfieldforce',
                order: 800
            }
        ]);
    }
}
