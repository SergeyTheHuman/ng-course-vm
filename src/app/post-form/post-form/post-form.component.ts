import {
	Component,
	ElementRef,
	EventEmitter,
	Output,
	ViewChild,
} from '@angular/core'
import { IPost } from 'src/app/post/post.interface'

@Component({
	selector: 'mv-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
	author = ''
	text = ''

	@Output()
	onAdd: EventEmitter<IPost> = new EventEmitter<IPost>()

	@ViewChild('authorInput')
	authorInputRef!: ElementRef

	@ViewChild('textInput')
	textInputRef!: ElementRef

	constructor() {}

	public addPost() {
		if (!this.author.trim()) {
			this.focusAuthor()
			return
		}
		if (!this.text.trim()) {
			this.focusText()
			return
		}

		const newPost = {
			id: Math.random() * Math.random(),
			author: this.author,
			text: this.text,
		}

		this.onAdd.emit(newPost)
		this.author = this.text = ''
	}

	focusAuthor() {
		this.authorInputRef.nativeElement.focus()
	}
	focusText() {
		this.textInputRef.nativeElement.focus()
	}
}
