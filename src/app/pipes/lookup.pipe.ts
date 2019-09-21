import { Pipe, PipeTransform } from '@angular/core';
import { ReferenceValuesService } from 'ngscaffolding-core';
import { Observable } from 'rxjs';

@Pipe({ name: 'lookup' })
export class LookupPipe implements PipeTransform {
  constructor(private refValuesService: ReferenceValuesService) {}
  transform(value: string, referenceName: string): Observable<any> {
    return new Observable<any>(observer => {
      this.refValuesService.getReferenceValue(referenceName).subscribe(refValues => {
        for (const refValue of refValues.referenceValueItems) {
          // tslint:disable-next-line: triple-equals
          if (refValue.value == value) {
            observer.next(refValue.display);
            observer.complete();
          }
        }
      });
    });
  }
}
