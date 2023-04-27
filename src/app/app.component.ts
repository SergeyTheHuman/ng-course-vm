import { DOCUMENT } from '@angular/common'
import { Component, Inject } from '@angular/core'
import { IPost } from './components/post/post.interface'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	inputValue: string = 'Random input value'
	lightMode: boolean = true
	posts: IPost[] = []
	showTitle: boolean = false

	constructor(@Inject(DOCUMENT) private document: Document) {}

	toggleLightMode(event: Event) {
		event.stopPropagation()

		if (this.document.body.classList.contains('darkness')) {
			this.document.body.classList.remove('darkness')
		} else {
			this.document.body.classList.add('darkness')
		}
	}

	addPost(post: IPost) {
		this.posts.push(post)
	}

	public onInput(event: Event) {
		this.inputValue = (event.target as HTMLInputElement).value
	}

	removePost(id: number) {
		this.posts = this.posts.filter((post) => post.id !== id)
	}
}
