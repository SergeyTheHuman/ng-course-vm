import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'posts',
})
export class PostsPipe implements PipeTransform {
	constructor() {}
	transform(quantity: number) {
		return quantity === 1 ? `${quantity} post` : `${quantity} posts`
	}
}
