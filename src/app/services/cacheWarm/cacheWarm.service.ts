import { Injectable } from '@angular/core';
import { AppSettingsQuery, ReferenceValuesService } from 'ngscaffolding-core';
import { AppSettings, ReferenceValue } from 'ngscaffolding-models';
import { Observable, combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CacheWarmService {
    constructor(private appSettingsQuery: AppSettingsQuery, private refValuesService: ReferenceValuesService) {
    }

    warmCache() {
        const storeEntity = this.appSettingsQuery.getEntity(AppSettings.mobileCacheNames);
        if (storeEntity) {
            const referenceNames: string[] = storeEntity.value;
            const cacheWarmers: Observable<ReferenceValue>[] = [];

            for (const refName of referenceNames) {
                cacheWarmers.push(this.refValuesService.getReferenceValue(refName));
            }

            combineLatest(cacheWarmers).subscribe();
        }
    }
}
