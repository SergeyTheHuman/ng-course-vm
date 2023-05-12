import { Component } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { metaTags } from './meta/meta'

@Component({
	selector: 'mv-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(private readonly title: Title, private readonly meta: Meta) {
		title.setTitle('Mv test app')
		meta.addTags(metaTags)
	}
}
