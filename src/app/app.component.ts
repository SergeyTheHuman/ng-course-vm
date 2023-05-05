import { Component } from '@angular/core'
import { DarkThemeService } from './services/dark-theme/dark-theme.service'
import { PostService } from './services/posts/post.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [DarkThemeService, PostService],
})
export class AppComponent {
	constructor() {}
}
