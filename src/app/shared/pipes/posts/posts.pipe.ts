import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'posts',
	standalone: true,
})
export class PostsPipe implements PipeTransform {
	constructor() {}
	transform(quantity: number | undefined): string {
		if (quantity === undefined || quantity === null) return ''
		return quantity === 1 ? `${quantity} post` : `${quantity} posts`
	}
}
