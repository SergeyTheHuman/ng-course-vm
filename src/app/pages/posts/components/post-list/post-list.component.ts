import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { IPost } from '../post/interfaces/post.interface'

@Component({
	selector: 'mv-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
	@Input()
	posts: IPost[] | null = null

	@Input()
	showIds: boolean = false
}
