import { Pipe, PipeTransform } from '@angular/core'
import { Field } from 'src/app/components/post-filter/post-filter-field.type'

@Pipe({
	name: 'filter',
	pure: false,
})
export class FilterPipe implements PipeTransform {
	constructor() {}

	transform(
		array: any[] | null | undefined,
		filterBy: Field,
		search: string,
	): any[] {
		if (!array) return []
		return array.filter((item) =>
			item[filterBy].toLowerCase().includes(search.trim().toLowerCase()),
		)
	}
}
