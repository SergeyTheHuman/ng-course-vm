import { Injectable, OnDestroy } from '@angular/core'
import { Observable, Subject, takeUntil, tap } from 'rxjs'
import { IPost } from 'src/app/components/post/interfaces/post.interface'
import { PostApi } from './post.api'
import { PostState } from './post.state'

@Injectable({
	providedIn: 'root',
})
export class PostService implements OnDestroy {
	destroy$: Subject<boolean> = new Subject<boolean>()
	constructor(
		private readonly postApi: PostApi,
		private readonly postState: PostState,
	) {}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	get posts$(): Observable<IPost[]> {
		return this.postState.posts$.asObservable()
	}

	get() {
		if (this.postState.posts.length !== 0) return
		this.postApi
			.getAll()
			.pipe(takeUntil(this.destroy$))
			.subscribe((posts) => this.postState.set(posts))
	}

	getOne(id: string): Observable<IPost> {
		return this.postApi.getOne(id)
	}

	findOneById(id: string): IPost | undefined {
		return this.postState.posts.find((post) => post.id.toString() === id)
	}

	generateId(): string {
		let id = (Math.random() ** 2 * 1000).toFixed(0)

		const post = this.postState.posts$
			.getValue()
			.find((post) => post.id.toString() === id)

		if (!post) {
			return id
		} else {
			return this.generateId()
		}
	}

	add(title: string, body: string) {
		const post: IPost = {
			id: this.generateId(),
			title,
			body,
		}

		this.postApi
			.add(post)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				this.postState.add(post)
			})
	}

	update(post: IPost) {
		return this.postApi
			.update(post)
			.pipe(tap(() => this.postState.update(post)))
	}

	delete(id: string): Observable<void> {
		return this.postApi.delete(id).pipe(tap(() => this.postState.delete(id)))
	}
}
