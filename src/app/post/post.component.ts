import {
	AfterContentInit,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	Output,
} from '@angular/core'
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

	@Output()
	onRemove: EventEmitter<number> = new EventEmitter<number>()

	ngAfterContentInit() {
		if (Math.random() > 0.5) {
			this.sizeRef?.nativeElement.classList.add('green')
		}
	}

	remove(id: number) {
		this.onRemove.emit(id)
	}
}
