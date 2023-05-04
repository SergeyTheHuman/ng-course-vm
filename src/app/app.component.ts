import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { distinctUntilChanged, Observable, Subject, takeUntil, tap } from 'rxjs'
import { Field } from './components/post-filter/post-filter-field.type'
import { IPost } from './components/post/post.interface'
import { DarkThemeService } from './services/dark-theme/dark-theme.service'
import { PostService } from './services/posts/post.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [DarkThemeService, PostService],
})
export class AppComponent implements OnInit, OnDestroy {
	showTitle: boolean = false
	field: Field = 'title'
	search: string = ''
	posts$!: Observable<IPost[]>
	darkTheme$!: Observable<boolean>
	destroy$ = new Subject()

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private readonly postService: PostService,
		private readonly darkThemeService: DarkThemeService,
	) {}

	ngOnInit(): void {
		this.postService.get()
		this.posts$ = this.postService.posts$
		this.darkTheme$ = this.darkThemeService.darkTheme$
		this.darkThemeService.darkTheme$
			.pipe(
				distinctUntilChanged(),
				takeUntil(this.destroy$),
				tap((darkTheme) => {
					if (darkTheme) {
						this.document.body.classList.add('darkness')
					} else {
						this.document.body.classList.remove('darkness')
					}
				}),
			)
			.subscribe()
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	toggleDarkMode(event: Event) {
		event.stopPropagation()

		this.darkThemeService.toggleTheme()
	}
}
