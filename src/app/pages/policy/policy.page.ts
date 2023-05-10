import { Component, OnInit } from '@angular/core'
import { AuthState } from 'src/app/services/auth/auth.state'
import { IUser } from 'src/app/services/auth/interfaces/user.interface'

@Component({
	selector: 'mv-policy-page',
	templateUrl: './policy.page.html',
	styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
	formData: IUser | null = null

	constructor(
		// (!) Note: used to get access to current route state
		// private readonly location: Location
		private readonly authState: AuthState,
	) {}

	ngOnInit(): void {
		// (!) Note: used to get data from route state
		// const routeState = this.location.getState() as { formData: unknown }
		// this.formData = routeState?.formData as IAuthFormData

		this.authState.user$.subscribe((authData) => {
			this.formData = authData
		})
	}
}
