import { Component } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { environment } from 'src/environments/environment'
import { metaTags } from './meta/meta'

@Component({
	selector: 'mv-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(title: Title, meta: Meta) {
		title.setTitle('Mv test app')
		meta.addTags(metaTags)
		console.log(
			`Production mode is ${environment.PRODUCTION_MODE ? 'on' : 'off'}`,
		)
	}
}
