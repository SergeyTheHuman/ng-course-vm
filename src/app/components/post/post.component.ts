import {
	AfterContentInit,
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { exhaustMap, filter, Subject, takeUntil, tap } from 'rxjs'
import { PostService } from 'src/app/services/posts/post.service'
import { IPost } from './post.interface'

@Component({
	selector: 'mv-post',
	styleUrls: ['./post.component.scss'],
	templateUrl: './post.component.html',
})
export class PostComponent
	implements AfterContentInit, OnDestroy, AfterViewInit
{
	removeSubject$: Subject<string> = new Subject()
	destroy$: Subject<void> = new Subject()

	newTitle!: string
	newBody!: string

	isLoading = false
	isEditMode = false

	@Input()
	post!: IPost

	@Input()
	showId: boolean = false

	@ContentChild('size')
	sizeRef?: ElementRef

	@ViewChild('postRef')
	postRef!: ElementRef

	@ViewChild('newTitleInput')
	newTitleInput!: ElementRef

	@ViewChild('newBodyInput')
	newBodyInput!: ElementRef

	constructor(
		private readonly postService: PostService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
	) {}

	ngAfterContentInit() {
		this.newBody = this.post.body
		this.newTitle = this.post.title

		if (Math.random() > 0.5) {
			this.sizeRef?.nativeElement.classList.add('green')
		}

		this.removeSubject$
			.pipe(
				tap(() => (this.isLoading = true)),
				takeUntil(this.destroy$),
				exhaustMap((id) => this.postService.delete(id.toString())),
			)
			.subscribe(() => (this.isLoading = false))
	}

	ngAfterViewInit(): void {
		this.route.fragment
			.pipe(
				takeUntil(this.destroy$),
				filter((fragment) => fragment === `post-${this.post.id}`),
			)
			.subscribe((fragment) => {
				if (!this.postRef || !fragment) return

				this.postRef.nativeElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			})
	}

	remove(id: string) {
		this.removeSubject$.next(id.toString())
	}

	edit() {
		this.isEditMode = true
		// Не знаю, как сделать вызов этого метода только после того, как отрендерится дочерний инпут в *ngIf
		setTimeout(() => this.focusTitle())
	}

	save() {
		if (this.newTitle.trim().length < 1) return this.focusTitle()
		if (this.newBody.trim().length < 1) return this.focusBody()
		if (
			this.newBody === this.post.body &&
			this.newTitle === this.post.title
		) {
			return (this.isEditMode = false)
		}
		this.isLoading = true

		this.postService
			.update({
				...this.post,
				title: this.newTitle,
				body: this.newBody,
			})
			.subscribe({
				next: () => {
					this.isEditMode = false
					this.isLoading = false
				},
				error: (error) => {
					this.isLoading = false
				},
			})
	}

	focusTitle() {
		this.newTitleInput.nativeElement.focus()
	}

	focusBody() {
		this.newBodyInput.nativeElement.focus()
	}

	goToDetails() {
		this.router.navigate(['/posts', this.post.id])
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
	}
}
