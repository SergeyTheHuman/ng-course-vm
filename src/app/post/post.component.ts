import {
	AfterContentInit,
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	Input,
} from '@angular/core'
import { IPost } from './post.interface'

@Component({
	selector: 'mv-post',
	styleUrls: ['./post.component.scss'],
	templateUrl: './post.component.html',
})
export class PostComponent implements AfterViewInit, AfterContentInit {
	@Input()
	post!: IPost

	@ContentChild('size')
	sizeRef?: ElementRef

	ngAfterViewInit() {
		// console.log(Math.random())
		// console.log(this.sizeRef)

		// if (Math.random() > 0.5) {
		// 	this.sizeRef?.nativeElement.classList.add('green')
		// }
	}
	ngAfterContentInit() {
		if (Math.random() > 0.5) {
			this.sizeRef?.nativeElement.classList.add('green')
		}
	}
}
