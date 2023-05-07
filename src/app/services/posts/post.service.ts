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

	getOne(id: number): Observable<IPost> {
		return this.postApi.getOne(id)
	}

	findOneById(id: number): IPost | undefined {
		return this.postState.posts.find((post) => post.id === id)
	}

	add(title: string, body: string) {
		const post: IPost = {
			id: Math.random() * Math.random(),
			title,
			body,
		}

		this.postApi.add(post).subscribe((post) => {
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

	delete(id: number): Observable<void> {
		return this.postApi.delete(id).pipe(tap(() => this.postState.delete(id)))
	}
}
