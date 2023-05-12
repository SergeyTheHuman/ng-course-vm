import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms'

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
	static error(control: AbstractControl): ValidationErrors | null {
		return { error: true }
	}
	static date(format: string) {
		return function (control: AbstractControl): ValidationErrors | null {
			try {
				const value = control.value

				if (value.length !== format.length) throw new Error('invalid date')

				const map = {
					day: format.indexOf('DD'),
					month: format.indexOf('MM'),
					year: format.indexOf('YYYY'),
				}

				const day = +value.substring(map['day'], map['day'] + 2)
				const month = +value.substring(map['month'], map['month'] + 2)
				const year = +value.substring(map['year'], map['year'] + 4)

				const date = new Date(year, month - 1, day)
				const validDay = date.getDate()
				const validMonth = date.getMonth()
				const validYear = date.getFullYear()

				if (
					day < 1 ||
					month < 1 ||
					year < 1970 ||
					validDay !== day ||
					validMonth !== month - 1 ||
					validYear !== year
				) {
					throw new Error('invalid date')
				}
				return null
			} catch (error) {
				return {
					wrongDateFormat: {
						requiredFormat: format,
					},
				}
			}
		}
	}
	static minValuesQuantuty(minControls: number) {
		return function (control: AbstractControl): ValidationErrors | null {
			let formValuesQuantuty = control.value?.length ?? 0
			if (formValuesQuantuty >= minControls) {
				return null
			} else {
				return {
					formArrayMinValuesQuantuty: {
						minValuesQuantity: minControls,
						actualValuesQuantity: formValuesQuantuty,
						remainValuesQuantity: minControls - formValuesQuantuty,
					},
				}
			}
		}
	}
	static formArrayMinValuesQuantuty(minControls: number) {
		return function (control: AbstractControl): ValidationErrors | null {
			if (control instanceof FormArray === false)
				throw new Error(
					'Error! FormArrayMinValuesQuantuty validator availible only to FormArray',
				)

			let formArrayValuesQuantuty = (control as FormArray)?.controls.length
			if (formArrayValuesQuantuty >= minControls) {
				return null
			} else {
				return {
					formArrayMinValuesQuantuty: {
						minValuesQuantity: minControls,
						actualValuesQuantity: formArrayValuesQuantuty,
						remainValuesQuantity: minControls - formArrayValuesQuantuty,
					},
				}
			}
		}
	}
}
