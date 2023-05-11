import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { DateTimeService } from 'src/app/services/date-time/date-time.service'

@Component({
	selector: 'mv-date-time',
	templateUrl: './date-time.component.html',
	styleUrls: ['./date-time.component.scss'],
	standalone: true,
	imports: [CommonModule],
	providers: [DateTimeService],
})
export class DateTimeComponent implements OnInit {
	date$!: Observable<Date>

	constructor(private readonly dateTimeService: DateTimeService) {}

	ngOnInit(): void {
		this.date$ = this.dateTimeService.date$
	}
}
