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

	newTitle!: string
	newBody!: string

	isLoading = false
	isEditMode = false

	@Input()
	post!: IPost

	@ContentChild('size')
	sizeRef?: ElementRef

	constructor(private readonly postService: PostService) {}

	ngAfterContentInit() {
		this.newBody = this.post.body
		this.newTitle = this.post.title

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

	edit() {
		this.isEditMode = true
	}

	save() {
		this.isLoading = true

		this.postService
			.update({
				...this.post,
				title: this.newTitle,
				body: this.newBody,
			})
			.subscribe((post) => {
				this.isEditMode = false
				this.isLoading = false
			})

		//TODO: обработка ошибок
	}

	ngOnDestroy(): void {
		this.destroySubject$.next()
		this.destroySubject$.complete()
	}
}
