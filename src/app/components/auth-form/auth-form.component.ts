import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { MvValidators } from 'src/app/validators/validators'
import { capitalMap } from './constants/capital-map'

@Component({
	selector: 'mv-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
	form!: FormGroup
	destroySubject$ = new Subject()

	@ViewChild('skillNameInput')
	skillNameInputRef!: ElementRef

	constructor() {}

	ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl('', [Validators.email, Validators.required]),
			name: new FormControl('', [
				Validators.minLength(3),
				Validators.maxLength(20),
				Validators.required,
			]),
			passwords: new FormGroup(
				{
					password: new FormControl('', [
						Validators.minLength(6),
						Validators.maxLength(20),
						Validators.required,
					]),
					repeatPassword: new FormControl('', [
						Validators.minLength(6),
						Validators.maxLength(20),
						Validators.required,
					]),
				},
				{
					validators: MvValidators.controlsAreEqual({
						sourceControl: 'password',
						targetControl: 'repeatPassword',
					}),
				},
			),
			address: new FormGroup({
				country: new FormControl('Country', {
					validators: [
						Validators.required,
						MvValidators.selectNonDefault('Country'),
					],
					nonNullable: true,
				}),
				city: new FormControl('', [
					Validators.minLength(3),
					Validators.maxLength(20),
					Validators.required,
				]),
			}),
			skills: new FormGroup({
				skill: new FormControl('', [Validators.minLength(3)]),
				skills: new FormArray<FormControl>(
					[],
					MvValidators.formArrayMinValuesQuantuty(3),
				),
			}),
			sex: new FormGroup({
				sex: new FormControl(null, Validators.required),
				other: new FormControl(
					{
						value: '',
						disabled: true,
					},
					[
						Validators.minLength(3),
						Validators.maxLength(20),
						Validators.required,
					],
				),
			}),
			jobs: new FormGroup({
				hasWorkExperience: new FormControl(false),
				jobs: new FormArray<FormGroup>([]),
			}),
		})

		this.form
			.get('sex')
			?.get('sex')
			?.valueChanges.pipe(takeUntil(this.destroySubject$))
			.subscribe((sex) => {
				if (sex === 'other') {
					this.form.get('sex')?.get('other')?.enable()
				} else {
					this.form.get('sex')?.get('other')?.reset()
					this.form.get('sex')?.get('other')?.disable()
				}
			})

		this.form
			.get('jobs')
			?.get('hasWorkExperience')
			?.valueChanges.pipe(takeUntil(this.destroySubject$))
			.subscribe((hasWorkExperience) => {
				const jobsControl = this.form.get('jobs')?.get('jobs') as FormArray

				if (
					hasWorkExperience &&
					!jobsControl?.hasValidator(
						MvValidators.formArrayMinValuesQuantuty(2),
					)
				) {
					jobsControl?.addValidators(
						MvValidators.formArrayMinValuesQuantuty(2),
					)
				} else {
					jobsControl?.clear()
					jobsControl?.reset()
					jobsControl?.clearValidators()
				}
				jobsControl?.updateValueAndValidity()
			})
	}
	setCapital() {
		const country: string = this.form.get('address')?.get('country')?.value
		const capital: string = capitalMap[country]

		this.form.patchValue({
			address: { city: capital },
		})
	}

	get skillsControls() {
		return (this.form.get('skills')?.get('skills') as FormArray)?.controls
	}

	removeSkill(index: number) {
		;(
			this.form.get('skills')?.get('skills') as FormArray<FormGroup>
		).removeAt(index)
	}

	addSkill() {
		const skillControl = this.form.get('skills')?.get('skill')
		const skillValue = skillControl?.value.trim()
		if (!skillValue) {
			this.skillNameInputRef.nativeElement.focus()
			return
		}

		const skills = skillValue.split(' ')

		for (const skill of skills) {
			if (skill.trim().length < 3) continue

			const skillControl = new FormControl(skill)

			;(
				this.form.get('skills')?.get('skills') as FormArray<FormControl>
			).push(skillControl)
		}

		skillControl?.setValue('')
		this.skillNameInputRef.nativeElement.focus()
	}

	get jobsControls() {
		return (this.form?.get('jobs')?.get('jobs') as FormArray).controls
	}

	addJob() {
		const control = new FormGroup({
			company: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(20),
			]),
			start: new FormControl('', Validators.required),
			end: new FormControl('', Validators.required),
		})

		;(this.form.get('jobs')?.get('jobs') as FormArray<FormGroup>).push(
			control,
		)
	}

	removeJob(index: number) {
		;(this.form.get('jobs')?.get('jobs') as FormArray<FormGroup>).removeAt(
			index,
		)
	}

	reset() {
		;(this.form.get('skills')?.get('skills') as FormArray)?.clear()
		;(this.form.get('jobs')?.get('jobs') as FormArray)?.clear()
		this.form.reset()
	}

	submit() {
		if (this.form.invalid) return
		delete this.form.value.skills.skill
		console.log('Form data: ', this.form.value)
		this.reset()
	}

	ngOnDestroy(): void {
		this.destroySubject$.next(true)
	}
}
