import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  CoreModule,
  AuthoriseRoleGuard,
  AppSettingsService,
  UserAuthenticationBase,
  UserAuthenticationService,
  UserAuthenticationQuery,
  CoreErrorHandlerService,
  VersionsService,
  MenuService
} from 'ngscaffolding-core';
import { TokenInterceptor } from './interceptors/token.interceptor';

export function jwtOptionsFactory(authQuery: UserAuthenticationQuery) {
  return {
    tokenGetter: () => {
      return authQuery.getSnapshot().token;
    }
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    // CoreModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [UserAuthenticationQuery]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // ngScaffolding-core
    { provide: ErrorHandler, useClass: CoreErrorHandlerService },
    // HTTP Token Interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
    // Allows use of Angular Elements
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {}
