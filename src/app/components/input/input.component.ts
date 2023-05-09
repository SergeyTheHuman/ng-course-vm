import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	ElementRef,
	forwardRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	ViewChild,
} from '@angular/core'
import {
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { MvValidators } from 'src/app/validators/validators'

@Component({
	selector: 'mv-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent
	implements OnInit, DoCheck, OnChanges, OnDestroy, ControlValueAccessor
{
	destroy$: Subject<boolean> = new Subject()
	onChange = (value: string) => {}
	onTouched = () => {}
	disabled: boolean = false
	input: FormControl<string | null> = new FormControl('', MvValidators.error)
	hostTouched: boolean = false

	@ViewChild('inputRef')
	inputRef!: ElementRef

	@Input()
	type: 'text' | 'password' | 'email' = 'text'

	@Input()
	isValid!: boolean

	@Input()
	isDisabled: boolean = false

	@Input()
	placeholder: string = ''

	constructor(private readonly changeDetector: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.input.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((value) => {
				this.onChange(value ? value?.trim() : '')
			})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.['isValid'].currentValue) {
			this.input.clearValidators()
			this.input.updateValueAndValidity()
		} else {
			this.input.setValidators(MvValidators.error)
			this.input.updateValueAndValidity()
		}
	}

	ngDoCheck(): void {
		if (this.hostTouched !== this.input.touched) {
			this.hostTouched = this.input.touched
			this.input.touched ? this.onTouched() : this.input.reset()
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	reset() {
		this.input.reset()
	}

	focus() {
		this.inputRef.nativeElement.focus()
	}

	writeValue(value: string | null): void {
		this.input.setValue(value)
		this.changeDetector.detectChanges()
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled
	}
}
