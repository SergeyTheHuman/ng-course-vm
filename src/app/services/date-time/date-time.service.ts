import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class DateTimeService {
	date$: Observable<Date> = new Observable((observer) => {
		observer.next(new Date())
		setInterval(() => {
			observer.next(new Date())
		}, 1000)
	})
	constructor() {}
}
