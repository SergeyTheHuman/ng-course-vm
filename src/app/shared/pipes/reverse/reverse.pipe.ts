import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'reverse',
	standalone: true,
})
export class ReversePipe implements PipeTransform {
	constructor() {}
	transform(array: unknown[] | null): unknown[] {
		if (array === null) return []
		return [...array].reverse()
	}
}
