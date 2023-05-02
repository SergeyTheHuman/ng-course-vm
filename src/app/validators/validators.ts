import { AbstractControl, ValidationErrors } from '@angular/forms'

interface IControlsIsEqualValidator {
	sourceControl: string
	targetControl: string
}
export class MvValidators {
	static controlsAreEqual({
		sourceControl,
		targetControl,
	}: IControlsIsEqualValidator) {
		return function (control: AbstractControl): ValidationErrors | null {
			const password = control.get(sourceControl)
			const repeatPassword = control.get(targetControl)

			let isEqual =
				password &&
				repeatPassword &&
				password.value === repeatPassword.value

			if (isEqual && repeatPassword?.value !== '') {
				if (repeatPassword?.hasError('controlsAreEqual')) {
					delete repeatPassword?.errors?.['controlsAreEqual']
					repeatPassword?.updateValueAndValidity()
				}
				return null
			} else {
				repeatPassword?.setErrors({
					controlsAreEqual: true,
					...repeatPassword.errors,
				})
				return { controlsAreEqual: true }
			}
		}
	}
	static selectNonDefault(value: string | number) {
		return function (control: AbstractControl): ValidationErrors | null {
			if (control.value !== value) {
				return null
			} else {
				return { selectNonDefault: true }
			}
		}
	}
}
