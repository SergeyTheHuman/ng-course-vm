import { Pipe, PipeTransform } from '@angular/core'
import { Field } from 'src/app/components/post-filter/post-filter-field.type'

@Pipe({
	name: 'filter',
})
export class FilterPipe implements PipeTransform {
	constructor() {}

	transform(array: any[], filterBy: Field, search: string): any[] {
		return array.filter((item) =>
			item[filterBy].toLowerCase().includes(search.toLowerCase()),
		)
	}
}
