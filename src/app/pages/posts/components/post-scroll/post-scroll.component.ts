import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnDestroy,
	Output,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'mv-post-scroll',
	templateUrl: './post-scroll.component.html',
	styleUrls: ['./post-scroll.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostScrollComponent implements OnDestroy {
	goToInput: string = ''
	showIds: boolean = false
	destroy$: Subject<boolean> = new Subject<boolean>()

	@Output()
	toggleShowIds: EventEmitter<boolean> = new EventEmitter<boolean>()

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
	) {}

	goTo() {
		const currentUrl = this.router.parseUrl(this.router.url)
		const mainUrl = currentUrl.root?.children?.['primary']?.segments[0].path

		if (!mainUrl || this.goToInput.trim() === '') return

		let currentQueryParams: { [key: string]: string } = {}
		this.route.queryParams
			.pipe(takeUntil(this.destroy$))
			.subscribe((params) => {
				currentQueryParams = params
			})

		this.router.navigate([mainUrl], {
			fragment: `post-${this.goToInput.trim()}`,
			queryParams: currentQueryParams,
			queryParamsHandling: 'merge',
		})

		this.goToInput = ''
	}

	toggleShowPostIds() {
		this.showIds = !this.showIds
		this.toggleShowIds.emit(this.showIds)
	}

	ngOnDestroy() {
		this.destroy$.next(true)
	}
}
