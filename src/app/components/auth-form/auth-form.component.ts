import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { capitalMap } from './constants/capital-map'

@Component({
	selector: 'mv-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
	form!: FormGroup

	constructor() {}

	ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl('', [Validators.email, Validators.required]),
			name: new FormControl('', [
				Validators.minLength(3),
				Validators.maxLength(20),
				Validators.required,
			]),
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
			address: new FormGroup({
				// TODO: add validator to non-default value
				country: new FormControl('Country', Validators.required),
				city: new FormControl('', [
					Validators.minLength(3),
					Validators.maxLength(20),
					Validators.required,
				]),
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
		console.log((this.form.get('jobs') as FormArray<FormGroup>)?.controls)
	}

	removeJob(i: number) {
		;(this.form.get('jobs') as FormArray<FormGroup>).removeAt(i)
	}

	submit() {
		console.log('Form: ', this.form)
		console.log('Form data: ', this.form.value)
		if (this.form.invalid) return
	}
}
