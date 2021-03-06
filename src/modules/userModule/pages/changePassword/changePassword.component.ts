import { Component, OnInit, ElementRef } from '@angular/core';
import {
  UserServiceBase,
  UserAuthenticationService,
  LoggingService,
  UserAuthenticationQuery,
  AppSettingsQuery,
  SpinnerService,
  ComponentLoaderService,
  UserService
} from 'ngscaffolding-core';
import { Router } from '@angular/router';
import { AppSettings, ChangePasswordModel } from 'ngscaffolding-models';
import { NotificationService } from '../../../../app/services/notification/notification.service';

@Component({
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.scss']
})
export class ChangePasswordComponent {
  inputModel: any = {};
  minLength: number;
  upperCase: boolean;
  lowerCase: boolean;
  numerics: boolean;
  specialChars: boolean;

  complexityPassed = false;
  failComplexLength = false;
  failComplexUpperCase = false;
  failComplexLowerCase = false;
  failComplexNumerics = false;
  failComplexSpecial = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private userAuthService: UserAuthenticationService,
    private router: Router,
    private logger: LoggingService,
    private authQuery: UserAuthenticationQuery,
    public appSettings: AppSettingsQuery,
    private spinner: SpinnerService,
    private componentLoader: ComponentLoaderService,
    private elementRef: ElementRef
  ) {}

  ionViewWillEnter() {
    this.minLength = this.appSettings.getEntity(AppSettings.authPasswordMinLength).value;
    this.upperCase = this.appSettings.getEntity(AppSettings.authPasswordUpperCase).value;
    this.lowerCase = this.appSettings.getEntity(AppSettings.authPasswordLowerCase).value;
    this.numerics = this.appSettings.getEntity(AppSettings.authPasswordNumeric).value;
    this.specialChars = this.appSettings.getEntity(AppSettings.authPasswordSpecial).value;
    this.inputModel = {};
  }

  checkComplexity() {
    const newPassword = this.inputModel.newPassword;
    if (newPassword.length < this.minLength) {
      this.failComplexLength = true;
    } else {
      this.failComplexLength = false;
    }

    if (this.upperCase) {
      this.failComplexUpperCase = !/[A-Z]/.test(newPassword);
    } else {
      this.failComplexUpperCase = false;
    }

    if (this.lowerCase) {
      this.failComplexLowerCase = !/[a-z]/.test(newPassword);
    } else {
      this.failComplexLowerCase = false;
    }

    if (this.numerics) {
      this.failComplexNumerics = !/\d/.test(newPassword);
    } else {
      this.failComplexNumerics = false;
    }

    if (this.specialChars) {
      this.failComplexSpecial = !/[!@#\$%\^&]/.test(newPassword);
    } else {
      this.failComplexSpecial = false;
    }
    this.complexityPassed = !(
      this.failComplexLength ||
      this.failComplexLowerCase ||
      this.failComplexUpperCase ||
      this.failComplexNumerics ||
      this.failComplexSpecial
    );
  }
  changePassword() {
    this.spinner.showSpinner('Changing Password');

    const change: ChangePasswordModel = {
      userId: this.authQuery.getValue().userDetails.userId,
      currentPassword: this.inputModel.currentPassword,
      newPassword: this.inputModel.newPassword
    };

    this.userService.changePassword(change).subscribe(
      result => {
        this.notificationService.showMessage({
          severity: 'info',
          summary: 'Success',
          detail: 'Password Changed. You will now be logged off.'
        });
        this.spinner.hideSpinner();
        setTimeout(_ => {
          this.userAuthService.logoff();
          this.router.navigateByUrl('/login');
        }, 4000);
      },
      err => {
        this.notificationService.showMessage({
          severity: 'error',
          summary: 'Change Password Failed',
          detail: err.error.message
        });
        this.spinner.hideSpinner();
      }
    );
  }
}
