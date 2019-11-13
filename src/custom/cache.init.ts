import { ReferenceValuesQuery, LoggingService, UserAuthenticationQuery, ReferenceValuesService } from 'ngscaffolding-core';
import { timer, combineLatest } from 'rxjs';

export function warmCache(refValuesService: ReferenceValuesService, log: LoggingService, authQuery: UserAuthenticationQuery) {
  return () => {
    const poll = timer(0, 20000);
    const combined = combineLatest([poll, authQuery.authenticated$]);
    let isDownloaded = false;

    combined.subscribe(([_poll, isAuthenticated]) => {
      if (!isAuthenticated || isDownloaded) {
        return;
      }
      log.info('Starting Cache Warm');

      const preLoad = [
        'FieldForce.WorkItemUpdateStages.Reference',
        'FieldForce.WorkItemUpdateCodes.Reference',
        'FieldForce.ShippedAssets.Reference',
        'FieldForce.Clients.Reference',
        'FieldForce.Priorities.Reference',
        'FieldForce.WorkItems.Types',
        'FieldForce.WorkItems.SubTypes',
        'FieldForce.StatusCodes.Reference',
        'FieldForce.NotificationCodes.Reference',
      ];

      for (const reference of preLoad) {
        refValuesService.getReferenceValue(reference).subscribe(() => (isDownloaded = true));
      }
    });
  };
}

export const dependencies = [ReferenceValuesService, LoggingService, UserAuthenticationQuery];
