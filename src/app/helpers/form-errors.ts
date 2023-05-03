import {
	AbstractControl,
	FormArray,
	FormControl,
	FormGroup,
} from '@angular/forms'

export const getFormErrors = (form: AbstractControl | null) => {
	if (form instanceof FormControl) {
		return form.errors ?? null
	}
	if (form instanceof FormGroup || form instanceof FormArray) {
		const groupErrors = form.errors
		const formErrors: { [key: string]: any } = groupErrors
			? { groupErrors }
			: {}
		Object.keys(form.controls).forEach((key) => {
			const error = getFormErrors(form.get(key))
			if (error !== null) formErrors[key] = error
		})
		return Object.keys(formErrors).length > 0 ? formErrors : null
	}
	return null
}
