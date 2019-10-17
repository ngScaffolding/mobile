import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuQuery } from 'ngscaffolding-core';
import { CoreMenuItem } from '@ngscaffolding/models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  menuItems: Array<CoreMenuItem>;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuQuery: MenuQuery,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }

  expand(menuItem: CoreMenuItem) {
    menuItem.expanded = !menuItem.expanded;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Listen for menuItems
      this.menuQuery
        .select(menuState => menuState.menuItems)
        .subscribe(items => {
          if (items) {
            this.menuItems = JSON.parse(JSON.stringify(items));
            this.menuItems.forEach(menu => (menu.expanded = false));
          }
        });
    });

    // Lock screen to portrait on phones
    if (!this.platform.is('tablet')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }
}
