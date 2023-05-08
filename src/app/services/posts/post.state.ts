import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IPost } from 'src/app/components/post/post.interface'

@Injectable({
	providedIn: 'root',
})
export class PostState {
	posts$: BehaviorSubject<IPost[] | []> = new BehaviorSubject<IPost[] | []>([])

	get posts(): IPost[] {
		return this.posts$.getValue() ?? []
	}

	set(posts: IPost[]) {
		this.posts$.next(posts)
	}

	add(post: IPost) {
		this.set([...this.posts$.getValue(), post])
	}

	update(post: IPost) {
		this.posts$.next([...this.posts.filter((p) => p.id !== post.id), post])
	}

	delete(id: string) {
		const filteredPosts = this.posts$
			.getValue()
			.filter((post) => post.id.toString() !== id)
		this.set(filteredPosts)
	}
}
