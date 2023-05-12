import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core'
import { TypeModalSize } from 'src/app/services/modal/modal-options.interface'

@Component({
	selector: 'mv-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements AfterViewInit {
	@Input()
	title?: string

	@Input()
	size?: TypeModalSize = 'medium'

	@Output()
	onClose: EventEmitter<any> = new EventEmitter()

	@Output()
	onSubmit: EventEmitter<any> = new EventEmitter()

	@ViewChild('modal')
	modal!: ElementRef

	constructor(private readonly elementRef: ElementRef) {}

	ngAfterViewInit(): void {
		setTimeout(() => this.modal.nativeElement.focus())
	}

	close(event: Event) {
		event.stopPropagation()
		this.elementRef.nativeElement.remove()
		this.onClose.emit()
	}

	submit() {
		this.elementRef.nativeElement.remove()
		this.onSubmit.emit()
	}
}
