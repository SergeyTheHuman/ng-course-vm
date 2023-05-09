import { Component, Input } from '@angular/core'
import { ValidationErrors } from '@angular/forms'

@Component({
	selector: 'mv-validation-errors',
	templateUrl: './validation-errors.component.html',
	styleUrls: ['./validation-errors.component.scss'],
})
export class ValidationErrorsComponent {
	@Input()
	errors!: ValidationErrors | null

	@Input()
	fieldName: string = 'field'

	@Input()
	itemsName: string = 'values'

	@Input()
	equalFields: string = 'fields'
}
