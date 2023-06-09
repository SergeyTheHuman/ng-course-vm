import {
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject, takeUntil, tap } from 'rxjs'
import { IPost } from 'src/app/pages/posts/components/post/interfaces/post.interface'
import { PostService } from 'src/app/services/posts/post.service'
import { Field } from '../post-filter/post-filter-field.type'

@Component({
	selector: 'mv-posts-page',
	templateUrl: './posts.page.html',
	styleUrls: ['./posts.page.scss'],
	providers: [PostService],
})
export class PostsPage implements OnInit, OnDestroy {
	field: Field = 'title'
	search: string = ''
	showPostIds: boolean = false
	posts$!: Observable<IPost[]>
	destroy$ = new Subject<boolean>()

	@Output()
	postsQuantity: EventEmitter<number> = new EventEmitter<number>()

	constructor(
		private readonly postService: PostService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.postService.get()
		this.posts$ = this.postService.posts$
		this.posts$
			.pipe(
				takeUntil(this.destroy$),
				tap((posts) => console.log(posts)),
			)
			.subscribe((posts) => this.postsQuantity.emit(posts.length))

		this.route.queryParams
			.pipe(takeUntil(this.destroy$))
			.subscribe((params) => {
				const showPostIds = params['showPostIds']
					? !!params['showPostIds']
					: false
				this.showPostIds = showPostIds
			})
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	toggleShowPostIds(value: boolean) {
		const queryParams: { showPostIds?: boolean } = {}
		if (value) queryParams.showPostIds = value

		this.router.navigate(['/posts'], {
			queryParams,
		})
	}
}
