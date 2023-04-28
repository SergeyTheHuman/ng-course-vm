import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import {
	distinctUntilChanged,
	Observable,
	of,
	Subject,
	takeUntil,
	tap,
} from 'rxjs'
import { Field } from './components/post-filter/post-filter-field.type'
import { IPost } from './components/post/post.interface'
import { PostService } from './services/posts/post.service'
import { ThemeService } from './services/theme/theme.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [ThemeService],
})
export class AppComponent implements OnInit, OnDestroy {
	inputValue: string = 'Random input value'
	lightMode: boolean = true
	showTitle: boolean = false
	field: Field = 'author'
	search: string = ''
	posts$!: Observable<IPost[]>
	darkTheme$: Observable<boolean> = of(false)
	destroy$ = new Subject()

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private readonly postService: PostService,
		private readonly themeService: ThemeService,
	) {}

	ngOnInit(): void {
		this.posts$ = this.postService.posts$
		this.darkTheme$ = this.themeService.darkTheme$
		this.themeService.darkTheme$
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

		this.themeService.toggleTheme()
	}

	public onInput(event: Event) {
		this.inputValue = (event.target as HTMLInputElement).value
	}
}
