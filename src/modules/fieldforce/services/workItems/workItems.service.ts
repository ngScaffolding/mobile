import { Injectable } from '@angular/core';
import { WorkItemsStore } from './workItems.store';
import { NetworkQuery } from 'src/app/services/network/network.query';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService, UserAuthenticationQuery } from 'ngscaffolding-core';
import { AppSettings, ZuluDateHelper } from 'ngscaffolding-models';
import { WorkItemsQuery } from './workItems.query';
import { catchError, timeout, map, retry } from 'rxjs/operators';
import { WorkItemStatusReport } from '../../models/workItem.statusReport.model';
import { Observable } from 'rxjs';
import { WorkItem } from '../../models';
import { WorkItemUpdate } from '../../models/workitem.update.model';
import * as uuidv4 from 'uuid/v4';
import { WorkItemUpdateStore } from './workItemUpdate.store';
import { WorkItemUpdateQuery } from './workItemUpdate.query';
import { WorkItemAdditionalValuesStore } from './workItemAdditionalValues.store';
import { WorkItemAdditionalValuesQuery } from './workItemAdditionalValues.query';

@Injectable({ providedIn: 'root' })
export class WorkItemsService {
  constructor(
    private authQuery: UserAuthenticationQuery,
    private workItemsStore: WorkItemsStore,
    private workItemsQuery: WorkItemsQuery,
    private workItemsUpdateStore: WorkItemUpdateStore,
    private workItemsUpdateQuery: WorkItemUpdateQuery,
    private workItemAdditionalValuesStore: WorkItemAdditionalValuesStore,
    private workItemAdditionalValuesQuery: WorkItemAdditionalValuesQuery,
    private networkQuery: NetworkQuery,
    private appSettingsService: AppSettingsService,
    private http: HttpClient
  ) {
    setInterval(_ => {
      this.sendWorkItemUpdates().subscribe(data => this.getWorkItemUpdates());
      // this.sendWorkItemUpdates().pipe(map(data => this.getWorkItemUpdates()));
    }, 30000);

    // Send work Item updates
    setInterval(_ => {
      this.sendUpdatesServer();
    }, 30000);

    // Send work Item Additional Values
    setInterval(_ => {
      this.sendAdditionalValuesServer();
    }, 30000);
  }

  public sendWorkItemUpdates(): Observable<any> {
    return new Observable<any>(observer => {
      observer.next();
      observer.complete();
    });
  }

  public sendUpdate(workItemID: string, updateCode: number, comment: string) {
    const update: WorkItemUpdate = {
      WorkItemUpdateID: uuidv4(),
      WorkItemID: workItemID,
      WorkItemUpdateCodeID: updateCode,
      LastUpdated: ZuluDateHelper.getZuluDate(new Date()),
      Comment: comment,
      UserID: this.authQuery.getUserId()
    };

    this.workItemsUpdateStore.add(update);
  }

  public sendAdditionalValues(workItemID: string, updateValues: object) {
    this.workItemAdditionalValuesStore.add({
      AdditionalValueID: uuidv4(),
      WorkItemID: workItemID,
      Updates: updateValues
    });
  }

  public getWorkItemUpdates() {
    if (this.networkQuery.isConnectedNow()) {
      const reqDate = new Date();
      const reqString = this.formatDate(reqDate);
      this.http
        .get<WorkItemStatusReport[]>(`${this.appSettingsService.getValue(AppSettings.apiHome)}/api/v1/workitems/worklist/${reqString}`)
        // .pipe(
        //   timeout(30000),
        //   retry(3),
        //   map(statusReportLines => {
        .subscribe(
          statusReportLines => {
            console.log(`Download WorkList`, statusReportLines);
            for (const workItemUpdate of statusReportLines) {
              //      Check to see if WorkItem is in Local Store
              //      If I dont Have a copy yet -- (Done below) or WorkItem.LastUpdated > LocalCopy.LastUpdated
              if (!this.workItemsQuery.hasEntity(workItemUpdate.WorkItemID)) {
                this.getWorkItem(workItemUpdate.WorkItemID);
              } else if (this.workItemsQuery.getEntity(workItemUpdate.WorkItemID).LastUpdated < workItemUpdate.LastUpdated) {
                this.getWorkItem(workItemUpdate.WorkItemID);
              }
            }

            // Need to Wait?

            // Remove un-needed WorkItems
            for (const localWorkItem of this.workItemsQuery.getAll()) {
              //      If LocalWorkItem not in downloaded list (Above)

              if (statusReportLines.findIndex(listItem => listItem.WorkItemID === localWorkItem.WorkItemID) === -1) {
                this.workItemsStore.remove(localWorkItem.WorkItemID);
              }
            }

            // Look for updates in additional collections
            for (const localWorkItem of this.workItemsQuery.getAll()) {
              const statusReportLine = statusReportLines.find(listItem => listItem.WorkItemID === localWorkItem.WorkItemID);
              if (statusReportLine) {
                if (statusReportLine.LastUpdated > localWorkItem.LastUpdated) {
                  this.getWorkItem(statusReportLine.WorkItemID);
                }
              }
            }
          },
          err => {
            var x = err;
          }
        );
    }
  }

  public getWorkItem(id: string) {
    this.http
      .get<WorkItem>(`${this.appSettingsService.getValue(AppSettings.apiHome)}/api/v1/workitems/${id}`)
      .pipe(
        timeout(30000),
        retry(3),
        map(data => {
          this.workItemsStore.add(data);
        })
      )
      .subscribe();
  }

  private sendUpdatesServer() {
    const updates = this.workItemsUpdateQuery.getAll();
    for (const update of updates) {
      this.http.post(`${this.appSettingsService.getValue(AppSettings.apiHome)}/api/v1/workitems/${update.WorkItemID}/updates`, update).subscribe(
        _ => {
          this.workItemsUpdateStore.remove(update.WorkItemUpdateID);
        },
        err => {
          console.error('Failed to send update', err);
        }
      );
    }
  }

  private sendAdditionalValuesServer() {
    const additionalValues = this.workItemAdditionalValuesQuery.getAll();
    for (const additionalValue of additionalValues) {
      this.http.post(`${this.appSettingsService.getValue(AppSettings.apiHome)}/api/v1/workitems/${additionalValue.WorkItemID}/additionalvalues`, additionalValue.Updates).subscribe(
        _ => {
          this.workItemAdditionalValuesStore.remove(additionalValue.AdditionalValueID);
        },
        err => {
          console.error('Failed to send update', err);
        }
      );
    }
  }

  private formatDate(date: Date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
