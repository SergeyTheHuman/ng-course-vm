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
	FormControl,
	NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { MvValidators } from 'src/app/validators/validators'
import { IRadio } from './interfaces/radio-option.interface'

@Component({
	selector: 'mv-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RadioComponent),
			multi: true,
		},
	],
})
export class RadioComponent
	implements OnInit, DoCheck, OnDestroy, ControlValueAccessor
{
	destroy$: Subject<boolean> = new Subject()
	hostTouched: boolean = false
	onChange = (value: string | null) => {}
	onTouched = () => {}
	disabled: boolean = false

	@Input()
	options: IRadio[] = []

	@Input()
	isValid!: boolean

	@Input()
	controlName!: string

	radio: FormControl<string | null> = new FormControl(null, MvValidators.error)

	constructor(private readonly changeDetector: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.radio.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((value) => {
				this.onChange(value)
			})
	}

	ngDoCheck(): void {
		if (this.hostTouched !== this.radio.touched) {
			this.hostTouched = this.radio.touched
			this.onTouched()
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.['isValid'].currentValue) {
			this.radio.clearValidators()
			this.radio.updateValueAndValidity()
		} else {
			this.radio.setValidators(MvValidators.error)
			this.radio.updateValueAndValidity()
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	writeValue(value: string | null): void {
		this.radio.setValue(value)
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
