import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'mv-auth-page',
	templateUrl: './auth.page.html',
	styleUrls: ['./auth.page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPage {
	constructor() {}
}
