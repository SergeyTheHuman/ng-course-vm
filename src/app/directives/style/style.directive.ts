import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	Renderer2,
} from '@angular/core'
import { IStyle } from './style.interface'

@Directive({
	selector: '[mvStyleOnHover]',
})
export class StyleDirective {
	@Input('mvStyleOnHover')
	styles?: IStyle

	constructor(
		private readonly renderer: Renderer2,
		private element: ElementRef,
	) {}

	@HostListener('mouseenter')
	onEnter() {
		for (const key in this.styles) {
			this.renderer.setStyle(
				this.element.nativeElement,
				key,
				this.styles[key],
			)
		}
	}

	@HostListener('mouseleave')
	onLeave() {
		for (const key in this.styles) {
			this.renderer.setStyle(this.element.nativeElement, key, null)
		}
	}
}
