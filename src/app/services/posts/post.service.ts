import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { IPost } from 'src/app/components/post/post.interface'
import { PostApi } from './post.api'
import { PostState } from './post.state'

@Injectable({
	providedIn: 'any',
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
		this.postApi.getAll().subscribe((posts) => this.postState.set(posts))
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

	delete(id: number): Observable<void> {
		return this.postApi.delete(id).pipe(tap(() => this.postState.delete(id)))
	}
}
