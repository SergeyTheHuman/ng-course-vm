import { Component } from '@angular/core'
import { IPost } from './post/post.interface'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	inputValue: string = 'Random input value'
	lightMode: boolean = true
	posts: IPost[] = []

	constructor() {}

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
