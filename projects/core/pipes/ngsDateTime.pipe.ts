import * as dateFormatimp from 'dateformat';
const dateFormat = dateFormatimp;

import { Pipe, PipeTransform } from '@angular/core';
import { AppSettingsQuery } from '../services/appSettings/appSettings.query';
import { AppSettings } from 'ngscaffolding-models';

@Pipe({ name: 'ngsDateTime' })
export class NgsDateTimePipe implements PipeTransform {
  constructor(private appSettings: AppSettingsQuery) {}
  transform(inputDate: Date): string {
    if (inputDate) {
      // If a string gets through, convert to date object
      if (typeof inputDate === 'string' || inputDate instanceof String) {
        inputDate = new Date(inputDate);
      }

      const format = this.appSettings.getEntity(AppSettings.dateTimeFormat);
      if (format && format.value) {
        return dateFormat(inputDate, format.value);
      } else {
        return dateFormat(inputDate, 'default');
      }
    } else {
      return '';
    }
  }
}
