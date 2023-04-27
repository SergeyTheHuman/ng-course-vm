import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
	selector: 'mv-date-time',
	templateUrl: './date-time.component.html',
	styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent implements OnInit {
	date$!: Observable<Date>
	date: Date = new Date()

	ngOnInit(): void {
		this.date$ = new Observable((observer) => {
			observer.next(new Date())
			setInterval(() => {
				observer.next(new Date())
			}, 1000)
		})
	}
}
