import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'zeroIfUndefinedOrNull',
})
export class ZeroIfUndefinedOrNullPipe implements PipeTransform {
	transform(value: null | undefined | number): number {
		if (value === null || value === undefined) {
			return 0
		} else {
			return value
		}
	}
}
