import { Injectable } from '@angular/core'
import { interval, map, Observable } from 'rxjs'

@Injectable()
export class DateTimeService {
	date$: Observable<Date> = interval().pipe(map((_) => new Date()))
}
