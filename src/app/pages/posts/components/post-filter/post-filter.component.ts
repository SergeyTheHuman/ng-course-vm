import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
} from '@angular/core'
import { Field } from './post-filter-field.type'

@Component({
	selector: 'mv-post-filter',
	templateUrl: './post-filter.component.html',
	styleUrls: ['./post-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFilterComponent {
	search: string = ''
	field: Field = 'title'

	@Output()
	onFieldChange: EventEmitter<Field> = new EventEmitter<Field>()

	@Output()
	onSearchChange: EventEmitter<string> = new EventEmitter<string>()

	constructor() {}

	updateField(field: Field) {
		this.field = field
		this.onFieldChange.emit(field)
	}

	updateSearch(event: Event) {
		this.search = (event.target as HTMLInputElement).value
		this.onSearchChange.emit(this.search)
	}
}
