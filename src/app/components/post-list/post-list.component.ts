import { Component, Input } from '@angular/core'
import { Field } from '../post-filter/post-filter-field.type'
import { IPost } from '../post/post.interface'

@Component({
	selector: 'mv-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
	@Input()
	posts: IPost[] | null = null

	@Input()
	field: Field = 'title'

	@Input()
	search: string = ''
}
