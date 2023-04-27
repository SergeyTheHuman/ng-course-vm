import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core'

@Directive({
	selector: '[mvStyle]',
})
export class StyleDirective {
	constructor(
		private readonly renderer: Renderer2,
		private element: ElementRef,
	) {}

	@HostListener('mouseenter')
	onEnter() {
		this.renderer.setStyle(
			this.element.nativeElement,
			'background-color',
			'lightblue',
		)
	}

	@HostListener('mouseleave')
	onLeave() {
		this.renderer.setStyle(
			this.element.nativeElement,
			'background-color',
			null,
		)
	}
}
