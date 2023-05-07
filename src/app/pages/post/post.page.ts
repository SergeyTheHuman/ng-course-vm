import { Location } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { EMPTY, iif, Observable, Subject } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import { IPost } from 'src/app/components/post/post.interface'
import { PostService } from 'src/app/services/posts/post.service'

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, OnDestroy {
	post?: IPost
	destroy$: Subject<boolean> = new Subject()

	constructor(
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
						iif(
							() => {
								this.post = this.postService.findOneById(+params['id'])
								return !this.post
							},
							this.postService.getOne(+params['id']),
							EMPTY,
						),
				),
			)
			.subscribe((post) => {
				this.post = post
			})
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	goBack() {
		this.location.back()
	}
}
