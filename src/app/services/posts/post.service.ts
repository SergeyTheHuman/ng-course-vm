import { Injectable } from '@angular/core'
import { catchError, Observable, tap, throwError } from 'rxjs'
import { IPost } from 'src/app/components/post/post.interface'
import { PostApi } from './post.api'
import { PostState } from './post.state'

@Injectable({
	providedIn: 'root',
})
export class PostService {
	constructor(
		private readonly postApi: PostApi,
		private readonly postState: PostState,
	) {}

	get posts$(): Observable<IPost[]> {
		return this.postState.posts$.asObservable()
	}

	get() {
		if (this.postState.posts.length !== 0) return
		this.postApi.getAll().subscribe((posts) => this.postState.set(posts))
	}

	getOne(id: string): Observable<IPost> {
		return this.postApi.getOne(id)
	}

	findOneById(id: string): IPost | undefined {
		return this.postState.posts.find((post) => post.id === id)
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

		this.postApi.add(post).subscribe(() => {
			this.postState.add(post)
		})
	}

	update(post: IPost) {
		return this.postApi.update(post).pipe(
			catchError((error) => {
				console.log(error.message)
				return throwError(() => new Error(error.message))
			}),
			tap(() => this.postState.update(post)),
		)
	}

	delete(id: string): Observable<void> {
		return this.postApi.delete(id).pipe(tap(() => this.postState.delete(id)))
	}
}
