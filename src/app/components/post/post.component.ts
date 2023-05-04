import {
	AfterContentInit,
	Component,
	ContentChild,
	ElementRef,
	Input,
	OnDestroy,
} from '@angular/core'
import { exhaustMap, Subject, takeUntil, tap } from 'rxjs'
import { PostService } from 'src/app/services/posts/post.service'
import { IPost } from './post.interface'

@Component({
	selector: 'mv-post',
	styleUrls: ['./post.component.scss'],
	templateUrl: './post.component.html',
})
export class PostComponent implements AfterContentInit, OnDestroy {
	removeSubject$: Subject<number> = new Subject()
	destroySubject$: Subject<void> = new Subject()
	isLoading = false

	@Input()
	post!: IPost

	@ContentChild('size')
	sizeRef?: ElementRef

	constructor(private readonly postService: PostService) {}

	ngAfterContentInit() {
		if (Math.random() > 0.5) {
			this.sizeRef?.nativeElement.classList.add('green')
		}

		this.removeSubject$
			.pipe(
				tap(() => (this.isLoading = true)),
				takeUntil(this.destroySubject$),
				exhaustMap((id) => this.postService.delete(id)),
			)
			.subscribe(() => (this.isLoading = false))
	}

	remove(id: number) {
		this.removeSubject$.next(id)
	}

	ngOnDestroy(): void {
		this.destroySubject$.next()
		this.destroySubject$.complete()
	}
}
