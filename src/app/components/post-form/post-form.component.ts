import { Component, ElementRef, ViewChild } from '@angular/core'
import { PostService } from 'src/app/services/posts/post.service'

@Component({
	selector: 'mv-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
	author = ''
	text = ''

	@ViewChild('authorInput')
	authorInputRef!: ElementRef

	@ViewChild('textInput')
	textInputRef!: ElementRef

	constructor(private readonly postService: PostService) {}

	addPost() {
		if (!this.author.trim()) {
			this.focusAuthor()
			return
		}
		if (!this.text.trim()) {
			this.focusText()
			return
		}

		this.postService.add(this.author, this.text)
		this.author = this.text = ''
	}

	focusAuthor() {
		this.authorInputRef.nativeElement.focus()
	}
	focusText() {
		this.textInputRef.nativeElement.focus()
	}
}
