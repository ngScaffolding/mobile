import {
    ReferenceValuesQuery,
    LoggingService,
    UserAuthenticationQuery,
    ReferenceValuesService
} from 'ngscaffolding-core';
import { combineLatest, Observable } from 'rxjs';
import { ReferenceValue } from 'ngscaffolding-models';

export function warmCache(
    refValuesService: ReferenceValuesService,
    log: LoggingService,
    authQuery: UserAuthenticationQuery
) {
    return () => {
        let isDownloaded = false;
        authQuery.authenticated$.subscribe(isAuthenticated => {
            if (!isAuthenticated || isDownloaded) {
                return;
            }
            log.info('Starting Cache Warm');
            const referenceNames = [
                'FieldForce.WorkItemUpdateStages.Reference',
                'FieldForce.WorkItemUpdateCodes.Reference',
                'FieldForce.ShippedAssets.Reference',
                'FieldForce.Clients.Reference',
                'FieldForce.Priorities.Reference',
                'FieldForce.WorkItems.Types',
                'FieldForce.WorkItems.SubTypes',
                'FieldForce.StatusCodes.Reference',
                'FieldForce.NotificationCodes.Reference'
            ];
            const cacheWarmers: Observable<ReferenceValue>[] = [];
            for (const refName of referenceNames) {
                cacheWarmers.push(refValuesService.getReferenceValue(refName));
            }

            combineLatest(cacheWarmers).subscribe(
                results => {
                    isDownloaded = true;
                },
                err => {}
            );
        });
    };
}

export const dependencies = [ReferenceValuesService, LoggingService, UserAuthenticationQuery];
