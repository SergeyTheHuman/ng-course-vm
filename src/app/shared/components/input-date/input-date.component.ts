import { CommonModule } from '@angular/common'
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
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms'
import { filter, map, Subject, takeUntil, tap } from 'rxjs'
import { dateParse, INVALID_DATE } from 'src/app/shared/helpers/date-parse'
import { MvValidators } from 'src/app/shared/validators/validators'

@Component({
	selector: 'mv-input-date',
	templateUrl: './input-date.component.html',
	styleUrls: ['./input-date.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputDateComponent),
			multi: true,
		},
	],
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class InputDateComponent
	implements OnInit, DoCheck, OnChanges, OnDestroy, ControlValueAccessor
{
	destroy$: Subject<boolean> = new Subject()
	onChange = (value: string) => {}
	onTouched = () => {}
	disabled: boolean = false
	hostTouched: boolean = false
	input: FormControl<string | null> = new FormControl(null)

	@ViewChild('inputRef')
	inputRef!: ElementRef

	@Input()
	hostFormControl?: AbstractControl | null

	@Input()
	dateFormat: string = 'DD.MM.YYYY'

	@Input()
	isValid!: boolean

	@Input()
	isDisabled: boolean = false

	@Input()
	placeholder: string = ''

	constructor(private readonly changeDetector: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.input.setValidators([
			MvValidators.error,
			MvValidators.date(this.dateFormat),
		])

		this.input.valueChanges
			.pipe(
				takeUntil(this.destroy$),
				tap(() => {
					if (!this.hostFormControl?.hasError('wrongDateFormat')) {
						this.hostFormControl?.setErrors({
							...this.hostFormControl.errors,
							wrongDateFormat: this.input.errors?.['wrongDateFormat'],
						})
					}
				}),
				map((value: string | null) => dateParse(this.dateFormat, value)),
				filter((value: string) => value !== INVALID_DATE),
			)
			.subscribe((value: string | null) => {
				this.hostFormControl?.setErrors({
					...this.hostFormControl.errors,
				})

				this.onChange(value as string)
			})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.['isValid'].currentValue) {
			this.input.clearValidators()
			this.input.updateValueAndValidity()
		} else {
			this.input.setValidators([
				MvValidators.error,
				MvValidators.date(this.dateFormat),
			])
			this.input.updateValueAndValidity()
		}
	}

	ngDoCheck(): void {
		if (
			this.hostFormControl &&
			this.hostFormControl?.touched !== this.input.touched
		) {
			if (!this.hostTouched && this.input.touched) {
				this.hostTouched = this.input.touched
				this.onTouched()
			}
			if (this.hostTouched && !this.hostFormControl.touched) {
				this.hostTouched = false
				this.input.reset()
				this.changeDetector.detectChanges()
			}
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
