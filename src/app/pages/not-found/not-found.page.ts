import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'mv-not-found',
	templateUrl: './not-found.page.html',
	styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage {
	constructor(private readonly router: Router) {}

	goToPosts() {
		this.router.navigate(['/'])
	}
}
