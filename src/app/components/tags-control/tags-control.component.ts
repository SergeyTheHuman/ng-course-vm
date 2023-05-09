import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	forwardRef,
	Input,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core'
import {
	ControlValueAccessor,
	FormArray,
	FormControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { MvValidators } from 'src/app/validators/validators'

@Component({
	selector: 'mv-tags',
	templateUrl: './tags-control.component.html',
	styleUrls: ['./tags-control.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TagsControlComponent),
			multi: true,
		},
	],
})
export class TagsControlComponent
	implements OnInit, DoCheck, OnDestroy, ControlValueAccessor
{
	destroy$: Subject<boolean> = new Subject()
	hostTouched: boolean = false
	onChange = (value?: unknown[]) => {}
	onTouched = () => {}
	disabled: boolean = false

	@Input()
	isValid!: boolean

	tags: FormArray = new FormArray<FormControl>([])

	get tagsControls() {
		return this.tags.controls
	}

	constructor(private readonly changeDetector: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.tags.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((value) => {
				this.onChange(value)
			})
	}

	ngDoCheck(): void {
		if (this.hostTouched !== this.tags.touched) {
			this.hostTouched = this.tags.touched
			this.onTouched()
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.['isValid'].currentValue) {
			this.tags.clearValidators()
			this.tags.updateValueAndValidity()
		} else {
			this.tags.setValidators(MvValidators.error)
			this.tags.updateValueAndValidity()
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	removeControl(index: number) {
		this.tags.removeAt(index)

		this.changeDetector.detectChanges()
	}

	addControl(value: string) {
		const tags = value.trim().split(' ')

		for (const tag of tags) {
			if (tag.trim().length < 3) continue

			const tagControl = new FormControl(tag)

			this.tags.push(tagControl)
		}

		this.changeDetector.detectChanges()
	}

	writeValue(value: unknown[]): void {
		if (value === null) {
			this.tags.clear()
		} else {
			this.tags.setValue(value)
		}
		this.changeDetector.detectChanges()
	}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled
	}
}
