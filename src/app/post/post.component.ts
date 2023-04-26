import { Component, Input } from '@angular/core'
import { IPost } from './post.interface'

@Component({
	selector: 'mv-post',
	styleUrls: ['./post.component.scss'],
	templateUrl: './post.component.html',
})
export class PostComponent {
	@Input()
	post!: IPost
}
