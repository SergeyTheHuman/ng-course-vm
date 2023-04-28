import {
	AfterContentInit,
	Component,
	ContentChild,
	ElementRef,
	Input,
} from '@angular/core'
import { PostService } from 'src/app/services/posts/post.service'
import { IPost } from './post.interface'

@Component({
	selector: 'mv-post',
	styleUrls: ['./post.component.scss'],
	templateUrl: './post.component.html',
})
export class PostComponent implements AfterContentInit {
	@Input()
	post!: IPost

	@ContentChild('size')
	sizeRef?: ElementRef

	constructor(private readonly postService: PostService) {}

	ngAfterContentInit() {
		if (Math.random() > 0.5) {
			this.sizeRef?.nativeElement.classList.add('green')
		}
	}

	remove(id: number) {
		this.postService.delete(id)
	}
}
