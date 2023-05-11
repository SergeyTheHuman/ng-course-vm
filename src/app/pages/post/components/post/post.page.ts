import { Location } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { IPost } from 'src/app/pages/posts/components/post/interfaces/post.interface'
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
		this.route.data.pipe(takeUntil(this.destroy$)).subscribe(({ post }) => {
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
