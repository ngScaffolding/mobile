import { StatusUpdatesService } from '../modules/fieldforce/services/statusUpdates/statusUpdates.service';

export function startPolling(statusUpdatesService: StatusUpdatesService) {
    return () => statusUpdatesService.startPolling();
}

export const dependencies = [StatusUpdatesService];
