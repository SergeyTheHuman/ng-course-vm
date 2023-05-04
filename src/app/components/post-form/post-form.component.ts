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
		if (!this.title.trim()) {
			this.focustitle()
			return
		}
		if (!this.body.trim()) {
			this.focusText()
			return
		}

		this.postService.add(this.title, this.body)
		this.title = this.body = ''
	}

	focustitle() {
		this.titleInputRef.nativeElement.focus()
	}
	focusText() {
		this.bodyInputRef.nativeElement.focus()
	}
}
