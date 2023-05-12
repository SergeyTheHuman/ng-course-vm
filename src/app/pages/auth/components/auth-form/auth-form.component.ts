import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject, takeUntil } from 'rxjs'
import { AuthService } from 'src/app/services/auth/auth.service'
import { IUser } from 'src/app/services/auth/interfaces/user.interface'
import { IRadio } from 'src/app/shared/components/radio/interfaces/radio-option.interface'
import { IOption } from 'src/app/shared/components/select/interfaces/options.interface'
import { TagsControlComponent } from 'src/app/shared/components/tags-control/tags-control.component'
import { getFormErrors } from 'src/app/shared/helpers/form-errors'
import { MvValidators } from 'src/app/shared/validators/validators'
import { InputComponent } from '../../../../shared/components/input/input.component'
import { capitalMap } from './constants/capital-map'
import { countries } from './constants/countries'
import { genders } from './constants/genders'
import { IAuthFormData } from './interfaces/form-data.interface'

@Component({
	selector: 'mv-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit, OnDestroy {
	countryOptions: IOption[] = countries
	genderOptions: IRadio[] = genders
	isAuth$!: Observable<boolean>
	form!: FormGroup
	destroy$ = new Subject()
	get formErrors() {
		return getFormErrors(this.form)
	}

	@ViewChild('otherGenderInputRef')
	otherGenderInputRef!: InputComponent

	@ViewChild('skillNameInput')
	skillNameInputRef!: InputComponent

	@ViewChild('skillTagsRef')
	skillTagsRef!: TagsControlComponent

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly authService: AuthService,
	) {}

	ngOnInit(): void {
		this.isAuth$ = this.authService.isAuth$

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
				jobs: new FormControl(),
			}),
		})

		this.form
			.get('sex')
			?.get('sex')
			?.valueChanges.pipe(takeUntil(this.destroy$))
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
			?.valueChanges.pipe(takeUntil(this.destroy$))
			.subscribe((hasWorkExperience) => {
				const jobsControl = this.form.get('jobs')?.get('jobs') as FormArray

				if (
					hasWorkExperience &&
					!jobsControl?.hasValidator(MvValidators.minValuesQuantuty(2))
				) {
					jobsControl?.addValidators(MvValidators.minValuesQuantuty(2))
				} else {
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

	reset() {
		console.log(this.form.value)

		this.form.reset()
	}

	submit() {
		if (this.form.invalid) return
		delete this.form.value.skills.skill
		this.form.value.skills = this.form.value.skills.skills
		delete this.form.value.skills.skills

		const formData: IAuthFormData = this.form.value
		console.log('Form data: ', formData)

		this.login(formData)
		this.reset()

		this.router.navigate(['policy'], {
			relativeTo: this.route,
		})
	}

	login(authData: IAuthFormData) {
		const user: Partial<IAuthFormData> & IUser = authData
		delete user?.passwords

		this.authService.login(user)
	}

	goToPolicy() {
		this.router.navigate(['policy'], {
			relativeTo: this.route,
		})
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}
}
