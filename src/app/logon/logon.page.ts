import { Component, OnInit } from '@angular/core';
import { LoggingService, AppSettingsQuery, AppSettingsService, SpinnerService, UserAuthenticationBase } from 'ngscaffolding-core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '@ngscaffolding/models';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.page.html',
  styleUrls: ['./logon.page.scss']
})
export class LogonPage implements OnInit {
  private readonly className = 'LoginPagecomponent';
  private readonly rememberMeCookie = 'authRememberMe';
  private readonly userNameCookie = 'authuserName';

  rememberMe: boolean;
  returnUrl: string;

  inputModel: any = {};

  constructor(public appSettingsQuery: AppSettingsQuery,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    public appSettings: AppSettingsService,
    private userAuthService: UserAuthenticationBase,
    private storage: Storage) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Are we going to Remember?
    if (this.appSettings.getValue(AppSettings.authShowRememberMe)) {
      this.storage.get(this.rememberMeCookie).then(remember => {
        this.rememberMe = remember === 'true';
      });

      if (this.rememberMe) {
         this.storage.get(this.userNameCookie).then(userName => {
          this.inputModel.username = userName;
        });
      }
    }
  }

  logon(form) {

    if (this.rememberMe && this.inputModel.username) {
      this.storage.set(this.userNameCookie, this.inputModel.username);
    } else {
      // Clear UserName
      this.storage.remove(this.userNameCookie);
    }

    this.userAuthService.logon(this.inputModel.username, this.inputModel.password)
    .subscribe(authUser => {
      this.router.navigate(['home']);
    }, err =>{
      this.notification.showMessage({
        summary: 'Logon Failed',
        detail: 'Check you User Name and Password and try again',
        severity: 'error'
      });
      // this.spinnerService.hideSpinner();
    });
  }
}
