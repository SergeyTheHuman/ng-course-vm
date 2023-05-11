import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
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
	FormGroup,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
	Validators,
} from '@angular/forms'
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs'
import { deepEqual } from 'src/app/shared/helpers/deep-equal'
import { MvValidators } from 'src/app/shared/validators/validators'

@Component({
	selector: 'mv-jobs-control',
	templateUrl: './jobs-control.component.html',
	styleUrls: ['./jobs-control.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => JobsControlComponent),
			multi: true,
		},
	],
})
export class JobsControlComponent
	implements OnInit, OnDestroy, ControlValueAccessor
{
	destroy$: Subject<boolean> = new Subject()
	hostTouched: boolean = false
	onChange = (value?: unknown[]) => {}
	onTouched = () => {}
	disabled: boolean = false

	@Input()
	isValid!: boolean

	@Input()
	errors?: ValidationErrors | null = null

	jobs: FormArray = new FormArray<FormGroup>([])

	get jobsControls() {
		return this.jobs.controls
	}
	constructor(private readonly changeDetector: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.jobs.valueChanges
			.pipe(takeUntil(this.destroy$), distinctUntilChanged(deepEqual))
			.subscribe((value) => {
				this.onChange(value)
			})
	}

	ngDoCheck(): void {
		if (this.hostTouched !== this.jobs.touched) {
			this.hostTouched = this.jobs.touched
			this.onTouched()
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.['isValid']?.currentValue) {
			this.jobs.clearValidators()
			this.jobs.updateValueAndValidity()
		} else {
			this.jobs.setValidators(MvValidators.error)
			this.jobs.updateValueAndValidity()
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}

	addJob() {
		const control = new FormGroup({
			company: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(20),
			]),
			start: new FormControl('', [Validators.required]),
			end: new FormControl('', [Validators.required]),
		})

		this.jobs.push(control)
	}

	removeJob(index: number) {
		this.jobs.removeAt(index)
	}

	writeValue(value: unknown[]): void {
		if (value === null) {
			this.jobs.clear()
		} else {
			this.jobs.setValue(value)
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
