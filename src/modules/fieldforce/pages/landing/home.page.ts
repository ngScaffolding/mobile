import { Component } from '@angular/core';
import { StatusUpdatesService } from '../../services/statusUpdates/statusUpdates.service';
import { NetworkService } from 'src/app/services/network/network.service';
import { WorkItemsService } from '../../services/workItems/workItems.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private statusUpdatesService: StatusUpdatesService, private networkService: NetworkService, private workItemsService: WorkItemsService) {}

}
