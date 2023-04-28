import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IPost } from 'src/app/components/post/post.interface'
import { posts } from 'src/app/mocks/posts/posts'

@Injectable()
export class PostService {
	posts$: BehaviorSubject<IPost[]> = new BehaviorSubject(posts)

	constructor() {}

	add(author: string, text: string) {
		const newPost: IPost = {
			id: Math.random() * Math.random(),
			author: author,
			text: text,
		}

		const updatedPosts = [...this.posts$.getValue(), newPost]
		this.posts$.next(updatedPosts)
	}

	delete(id: number) {
		const filteredPosts = this.posts$
			.getValue()
			.filter((post) => post.id !== id)
		this.posts$.next(filteredPosts)
	}
}
