import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
	FormsModule,
	ReactiveFormsModule,
	ValidationErrors,
} from '@angular/forms'

@Component({
	selector: 'mv-validation-errors',
	templateUrl: './validation-errors.component.html',
	styleUrls: ['./validation-errors.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
