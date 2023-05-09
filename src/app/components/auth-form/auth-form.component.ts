import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { MvValidators } from 'src/app/validators/validators'
import { InputComponent } from '../input/input.component'
import { IRadio } from '../radio/interfaces/radio-option.interface'
import { IOption } from '../select/interfaces/options.interface'
import { TagsControlComponent } from '../tags-control/tags-control.component'
import { capitalMap } from './constants/capital-map'
import { countries } from './constants/countries'
import { genders } from './constants/genders'
import { IAuthFormData } from './interfaces/form-data.interface'

@Component({
	selector: 'mv-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
	countryOptions: IOption[] = countries
	genderOptions: IRadio[] = genders
	form!: FormGroup
	destroySubject$ = new Subject()

	@ViewChild('otherGenderInputRef')
	otherGenderInputRef!: InputComponent

	@ViewChild('skillNameInput')
	skillNameInputRef!: InputComponent

	@ViewChild('skillTagsRef')
	skillTagsRef!: TagsControlComponent

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
	) {}

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
				skills: new FormControl([], MvValidators.minValuesQuantuty(3)),
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
					this.otherGenderInputRef.reset()
					this.form.get('sex')?.get('other')?.reset()
				} else {
					this.otherGenderInputRef.reset()
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

	removeSkill(index: number) {
		this.skillTagsRef.removeControl(index)
	}

	addSkill() {
		const skillControl = this.form.get('skills')?.get('skill')
		const skillValue = skillControl?.value.trim()

		if (!skillValue) {
			this.skillNameInputRef.focus()
			return
		}

		this.skillTagsRef.addControl(skillValue)

		skillControl?.setValue('')
		this.skillNameInputRef.focus()
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
		;(this.form.get('jobs')?.get('jobs') as FormArray)?.clear()
		this.form.reset()
	}

	submit() {
		// TODO: при отправке формы и ресете формы ошибки горят
		if (this.form.invalid) return
		delete this.form.value.skills.skill
		this.form.value.skills = this.form.value.skills.skills
		delete this.form.value.skills.skills

		const formData: IAuthFormData = this.form.value
		console.log('Form data: ', formData)
		this.reset()
		this.router.navigate(['policy'], {
			relativeTo: this.route,
			state: { formData },
		})
	}

	ngOnDestroy(): void {
		this.destroySubject$.next(true)
	}
}
