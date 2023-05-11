import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'

@Directive({
	selector: '[mvIfNot]',
	standalone: true,
})
export class IfNotDirective {
	@Input('mvIfNot')
	set ifNot(condition: boolean) {
		if (condition) {
			this.viewContainerRef.clear()
		} else {
			this.viewContainerRef.createEmbeddedView(this.templateRef)
		}
	}

	constructor(
		private readonly templateRef: TemplateRef<any>,
		private readonly viewContainerRef: ViewContainerRef,
	) {}
}
