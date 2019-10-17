import { WorkItemsService } from '../modules/fieldforce/services/workItems/workItems.service';

export function startWorkItemsPolling(workItemsService: WorkItemsService) {
    return () => workItemsService.startPolling();
}

export const dependencies = [WorkItemsService];
