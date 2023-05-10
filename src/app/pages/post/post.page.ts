import { Location } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { EMPTY, iif, Observable, Subject } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { IPost } from 'src/app/components/post/interfaces/post.interface'
import { PostService } from 'src/app/services/posts/post.service'

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, OnDestroy {
	post?: IPost
	showId: boolean = false
	destroy$: Subject<boolean> = new Subject()

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly postService: PostService,
		private readonly location: Location,
	) {}

	ngOnInit(): void {
		this.route.params
			.pipe(
				takeUntil(this.destroy$),
				mergeMap(
					(params: Params): Observable<IPost> =>
						// TODO: запрос все равно уходит, тварь

						iif(
							() => {
								this.post = this.postService.findOneById(params['id'])
								return !this.post
							},
							this.postService.getOne(params['id']),
							EMPTY,
						),
				),
			)
			.subscribe((post) => {
				this.post = post
			})

		this.route.queryParams
			.pipe(takeUntil(this.destroy$))
			.subscribe((params: Params) => {
				const showId = params['showId'] ? !!params['showId'] : false
				this.showId = showId
			})
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	toggleNavigateWithId() {
		const queryParams: { showId?: boolean } = {}
		if (!this.showId) queryParams.showId = !this.showId

		this.router.navigate(['/posts', this.post?.id], {
			queryParams,
		})
	}

	goBack() {
		this.location.back()
	}
}
