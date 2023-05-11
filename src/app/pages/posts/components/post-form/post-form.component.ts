import { Component, ElementRef, ViewChild } from '@angular/core'
import { PostService } from 'src/app/services/posts/post.service'

@Component({
	selector: 'mv-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
	title = ''
	body = ''

	@ViewChild('titleInput')
	titleInputRef!: ElementRef

	@ViewChild('bodyInput')
	bodyInputRef!: ElementRef

	constructor(private readonly postService: PostService) {}

	addPost() {
		if (!this.title.trim()) return this.focusTitle()
		if (!this.body.trim()) return this.focusBody()

		this.postService.add(this.title, this.body)
		this.title = this.body = ''
	}

	focusTitle() {
		this.titleInputRef.nativeElement.focus()
	}
	focusBody() {
		this.bodyInputRef.nativeElement.focus()
	}
}
