import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { distinctUntilChanged, Observable, Subject, takeUntil, tap } from 'rxjs'
import { links } from 'src/app/constants/links'
import { DarkThemeService } from 'src/app/services/dark-theme/dark-theme.service'
import { PostService } from 'src/app/services/posts/post.service'
import { IPost } from '../post/post.interface'

@Component({
	selector: 'mv-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	posts$!: Observable<IPost[]>
	darkTheme$!: Observable<boolean>
	destroy$ = new Subject()
	pages = links

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private readonly postService: PostService,
		private readonly darkThemeService: DarkThemeService,
	) {}

	ngOnInit(): void {
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
