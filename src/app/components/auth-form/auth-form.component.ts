import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { MvValidators } from 'src/app/validators/validators'
import { capitalMap } from './constants/capital-map'

@Component({
	selector: 'mv-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
	form!: FormGroup

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
				country: new FormControl('Country', [
					Validators.required,
					MvValidators.selectNonDefault('Country'),
				]),
				city: new FormControl('', [
					Validators.minLength(3),
					Validators.maxLength(20),
					Validators.required,
				]),
			}),
			skills: new FormGroup({
				skill: new FormControl('', [
					Validators.minLength(3),
					Validators.maxLength(20),
				]),
				skills: new FormArray([]),
				// TODO: add validation to skills (at least one)
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
			jobs: new FormArray<FormGroup>([]),
			// TODO: add validation to jobs (at least one)
		})

		this.form
			.get('sex')
			?.get('sex')
			?.valueChanges.subscribe((sex) => {
				if (sex === 'other') {
					this.form.get('sex')?.get('other')?.enable()
				} else {
					this.form.get('sex')?.get('other')?.reset()
					this.form.get('sex')?.get('other')?.disable()
				}
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
		return (this.form.get('skills')?.get('skills') as FormArray).controls
	}

	removeSkill(index: number) {
		;(
			this.form.get('skills')?.get('skills') as FormArray<FormGroup>
		).removeAt(index)
	}

	addSkill() {
		const skillControl = this.form.get('skills')?.get('skill')
		const skillValue = skillControl?.value
		if (!skillValue) return
		const skill = new FormControl(skillValue)

		;(this.form.get('skills')?.get('skills') as FormArray<FormControl>).push(
			skill,
		)

		skillControl?.reset()
		this.skillNameInputRef.nativeElement.focus()
	}

	get jobsControls() {
		return (this.form.get('jobs') as FormArray).controls
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

		;(this.form.get('jobs') as FormArray<FormGroup>).push(control)
	}

	removeJob(index: number) {
		;(this.form.get('jobs') as FormArray<FormGroup>).removeAt(index)
	}

	submit() {
		if (this.form.invalid) return
		delete this.form.value.skills.skill
		console.log('Form: ', this.form)
		console.log('Form data: ', this.form.value)
	}
}
