import { DOCUMENT } from '@angular/common'
import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import {
	distinctUntilChanged,
	filter,
	Observable,
	Subject,
	takeUntil,
	tap,
} from 'rxjs'
import { links } from 'src/app/components/header/constants/links'
import { AuthService } from 'src/app/services/auth/auth.service'
import { IUser } from 'src/app/services/auth/interfaces/user.interface'
import { DarkThemeService } from 'src/app/services/dark-theme/dark-theme.service'
import { ModalService } from 'src/app/services/modal/modal.service'
import { PostService } from 'src/app/services/posts/post.service'
import { IPost } from '../../pages/posts/components/post/interfaces/post.interface'

@Component({
	selector: 'mv-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
	posts$!: Observable<IPost[]>
	darkTheme$!: Observable<boolean>
	destroy$ = new Subject()
	user$!: Observable<IUser | null>
	isAuth$!: Observable<boolean>
	showPostsCount: boolean = false
	pages = links

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private readonly postService: PostService,
		private readonly darkThemeService: DarkThemeService,
		private readonly router: Router,
		private readonly authService: AuthService,
		private readonly route: ActivatedRoute,
		private readonly modalService: ModalService,
		private readonly viewContainerRef: ViewContainerRef,
	) {}

	ngOnInit(): void {
		this.user$ = this.authService.user$
		this.isAuth$ = this.authService.isAuth$
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

		this.router.events
			.pipe(
				takeUntil(this.destroy$),
				filter((event) => event instanceof NavigationEnd),
			)
			.subscribe((route) => {
				const url = (route as NavigationEnd).url
				const urlTree = this.router.parseUrl(url)
				const urlWithoutParams = urlTree.root.children?.[
					'primary'
				]?.segments
					.map((it) => it.path)
					.join('/')

				if (
					urlWithoutParams === 'posts' ||
					urlWithoutParams === undefined
				) {
					this.showPostsCount = true
				} else {
					this.showPostsCount = false
				}
			})
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	toggleDarkMode(event: Event) {
		event.stopPropagation()

		this.darkThemeService.toggleTheme()
	}

	logout() {
		this.authService.logout()

		// (!) Note: гуард не срабатывает при разлогине, пришлось редиректить
		this.router.navigate(['/auth'])
	}

	showModal(template: TemplateRef<any>) {
		this.modalService
			.open(this.viewContainerRef, template, {
				size: 'medium',
				title: `Hey, what's up?`,
			})
			.subscribe((action) => {
				console.log('Modal action >>> ', action)
			})
	}
}
