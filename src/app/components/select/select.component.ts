import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	forwardRef,
	Input,
	OnChanges,
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
import { IOption } from './interfaces/options.interface'

@Component({
	selector: 'mv-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
})
export class SelectComponent
	implements OnInit, DoCheck, OnChanges, OnDestroy, ControlValueAccessor
{
	destroy$: Subject<boolean> = new Subject()
	onChange = (value: string) => {}
	onTouched = () => {}
	select: FormControl<any> = new FormControl('', {
		nonNullable: true,
		validators: MvValidators.error,
	})
	disabled: boolean = false
	hostTouched: boolean = false

	@Input()
	options: IOption[] = []

	@Input()
	isValid!: boolean

	constructor(private readonly changeDetector: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.select.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((value) => {
				this.onChange(value)
			})
	}

	ngDoCheck(): void {
		if (this.hostTouched !== this.select.touched) {
			this.hostTouched = this.select.touched
			this.onTouched()
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.['isValid'].currentValue) {
			this.select.clearValidators()
			this.select.updateValueAndValidity()
		} else {
			this.select.setValidators(MvValidators.error)
			this.select.updateValueAndValidity()
		}
	}
	ngOnDestroy(): void {
		this.destroy$.next(true)
	}
	writeValue(value: any): void {
		this.select.setValue(value)
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
