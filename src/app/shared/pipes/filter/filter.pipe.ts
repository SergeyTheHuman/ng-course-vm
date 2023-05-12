import { Pipe, PipeTransform } from '@angular/core'
import { Field } from 'src/app/pages/posts/components/post-filter/post-filter-field.type'

@Pipe({
	name: 'filter',
	standalone: true,
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
