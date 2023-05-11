import { DOCUMENT } from '@angular/common'
import {
	Inject,
	Injectable,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { ModalComponent } from 'src/app/shared/components/modal/components/modal/modal.component'
import { IModalOptions } from './modal-options.interface'

@Injectable()
export class ModalService {
	private modalNotifier?: Subject<string>

	constructor(@Inject(DOCUMENT) private readonly document: Document) {}

	open(
		viewContainerRef: ViewContainerRef,
		content: TemplateRef<any>,
		options?: IModalOptions,
	): Observable<any> {
		if (!viewContainerRef)
			throw new Error('Modal service error. No ViewContainerRef!')

		const contentViewRef = content.createEmbeddedView(null)
		const modal = viewContainerRef.createComponent(ModalComponent, {
			projectableNodes: [contentViewRef.rootNodes],
		})

		if (options && Object.keys(options)) {
			for (const key in options) {
				const value = options[key as keyof IModalOptions]
				modal.setInput(key, value)
			}
		}

		modal.instance.onClose.subscribe(() => this.onClose())
		modal.instance.onSubmit.subscribe(() => this.onSubmit())

		modal.hostView.detectChanges()

		this.document.body.appendChild(modal.location.nativeElement)

		this.modalNotifier = new Subject()

		return this.modalNotifier?.asObservable()
	}
	onClose(): void {
		this.modalNotifier?.next('closed')
		this.modalNotifier?.complete()
	}
	onSubmit(): void {
		this.modalNotifier?.next('confirmed')
		this.modalNotifier?.complete()
	}
}
