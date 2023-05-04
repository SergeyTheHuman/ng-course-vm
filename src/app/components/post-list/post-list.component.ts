import { Component, Input } from '@angular/core'
import { IPost } from '../post/post.interface'

@Component({
	selector: 'mv-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
	@Input()
	posts: IPost[] | null = null
}
