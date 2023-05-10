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

	constructor(private readonly authState: AuthState) {}

	ngOnInit(): void {
		this.authState.user$.subscribe((authData) => {
			this.formData = authData
		})
	}
}
