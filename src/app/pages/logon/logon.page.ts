import { Component, OnInit } from '@angular/core';
import { LoggingService, AppSettingsQuery, AppSettingsService, SpinnerService, UserAuthenticationBase } from 'ngscaffolding-core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '@ngscaffolding/models';
import { NotificationService } from '../../services/notification/notification.service';
import { UIStateQuery } from '../../services/uiState/uiState.query';
import { UIStateStore, UIState } from '../../services/uiState/uiState.store';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.page.html',
  styleUrls: ['./logon.page.scss']
})
export class LogonPage {
  private readonly className = 'LoginPagecomponent';
  private readonly rememberMeCookie = 'authRememberMe';
  private readonly userNameCookie = 'authuserName';

  rememberMe: boolean;
  returnUrl: string;

  inputModel: any = {};

  constructor(
    public appSettingsQuery: AppSettingsQuery,
    private uiStateQuery: UIStateQuery,
    private uiStateStore: UIStateStore,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    public appSettings: AppSettingsService,
    private userAuthService: UserAuthenticationBase,
    private storage: Storage
  ) {}

  ionViewDidEnter(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.uiStateQuery.select(['logonRememberMe', 'logonUserID']).subscribe(result => {
      this.rememberMe = result.logonRememberMe;
      this.inputModel.username = result.logonUserID;
    });
  }

  rememberChanged(event: any) {
    const update: Partial<UIState> = { logonRememberMe: event.detail.checked };
    if (!update.logonRememberMe) {
      update.logonUserID = null;
    } else {
      this.uiStateStore.update({ logonUserID: this.inputModel.username });
    }
  }

  userNameChanged(event: any) {
    if (this.rememberMe) {
      this.uiStateStore.update({ logonUserID: event.detail.value });
    }
  }

  logon(form) {
    if (this.rememberMe && this.inputModel.username) {
      this.storage.set(this.userNameCookie, this.inputModel.username);
    } else {
      // Clear UserName
      this.storage.remove(this.userNameCookie);
    }

    this.userAuthService.logon(this.inputModel.username, this.inputModel.password).subscribe(
      authUser => {
        this.router.navigate(['home']);
      },
      err => {
        this.notification.showMessage({
          summary: 'Logon Failed',
          detail: 'Check you User Name and Password and try again',
          severity: 'error'
        });
        // this.spinnerService.hideSpinner();
      }
    );
  }
}
