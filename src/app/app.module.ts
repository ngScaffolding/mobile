import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { CUSTOM_IMPORTS } from '../custom/custom.app';
import { appInitialisers } from '../custom/custom.init';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppSettings } from 'ngscaffolding-models';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SuperTabsModule } from '@ionic-super-tabs/angular';

// Modules
import { ComponentsModule } from '../modules/componentsModule/components.module';
import { MenuComponent } from './components/menu/menu.component';
import { UserModule } from '../modules/userModule/user.module';

// Services
import { NotificationService } from './services/notification/notification.service';

// Ionic Modules
import { IonicStorageModule } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import {
  CoreModule,
  AuthoriseRoleGuard,
  AppSettingsService,
  UserAuthenticationBase,
  UserAuthenticationService,
  UserAuthenticationQuery,
  CoreErrorHandlerService,
  VersionsService,
  MenuService,
  LoggingService
} from 'ngscaffolding-core';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export function jwtOptionsFactory(authService: UserAuthenticationService) {
  return {
    tokenGetter: () => {
      return authService.getToken();
    }
  };
}



@NgModule({
  declarations: [AppComponent, MenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(),
    CoreModule.forRoot(),
    CUSTOM_IMPORTS,
    SuperTabsModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [UserAuthenticationQuery]
      }
    }),
    AppRoutingModule,
    UserModule,
    TranslateModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    NotificationService,
    // ngScaffolding-core
    AuthoriseRoleGuard,
    { provide: ErrorHandler, useClass: CoreErrorHandlerService },
    // HTTP Token Interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // Here for browser use only
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: UserAuthenticationBase, useClass: UserAuthenticationService },
    // Custom Initialisers
    ...appInitialisers
  ],
  // Allows use of Angular Elements
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(appSettingsService: AppSettingsService, logger: LoggingService, menuService: MenuService) {
    logger.info('Setting Values ngScaffolding-mobile startup');

    appSettingsService.setValue(AppSettings.title, 'ngScaffolding Mobile');
    appSettingsService.setValue(AppSettings.isMobile, true);

    // Password complexity
    appSettingsService.setValue(AppSettings.authPasswordMinLength, 8);
    appSettingsService.setValue(AppSettings.authPasswordUpperCase, true);
    appSettingsService.setValue(AppSettings.authPasswordLowerCase, true);
    appSettingsService.setValue(AppSettings.authPasswordNumeric, true);
    appSettingsService.setValue(AppSettings.authPasswordSpecial, false);

    menuService.addMenuItemsFromCode([
      {
        label: 'Change Password',
        icon: 'lock',
        routerLink: 'changepassword',
        name: 'changepassword',
        order: 940
      },
      {
        label: 'Logoff',
        icon: 'log-out',
        routerLink: 'logoff',
        name: 'logoff',
        order: 950
      },
      {
        label: 'About',
        icon: 'information-circle-outline',
        routerLink: 'about',
        name: 'about',
        order: 900
      }
    ]);
  }
}
