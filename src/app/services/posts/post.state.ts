import { BehaviorSubject } from 'rxjs'
import { IPost } from 'src/app/pages/posts/components/post/interfaces/post.interface'

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
		this.posts$.next([
			...this.posts.filter((p) => {
				return p.id.toString() !== post.id.toString()
			}),
			post,
		])
	}

	delete(id: string) {
		const filteredPosts = this.posts$
			.getValue()
			.filter((post) => post.id.toString() !== id.toString())
		this.set(filteredPosts)
	}
}
