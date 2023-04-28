import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

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
				Validators.minLength(3),
				Validators.maxLength(20),
				Validators.required,
			]),
			repeatPassword: new FormControl('', [
				Validators.minLength(3),
				Validators.maxLength(20),
				Validators.required,
			]),
		})
	}

	submit() {
		if (this.form.invalid) return
		console.log('Form: ', this.form)
		console.log('Form data: ', this.form.value)
	}
}
