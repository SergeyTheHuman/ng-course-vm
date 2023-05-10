import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { AuthState } from 'src/app/services/auth/auth.state'
import { IUser } from 'src/app/services/auth/interfaces/user.interface'

@Component({
	selector: 'mv-policy-page',
	templateUrl: './policy.page.html',
	styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit, OnDestroy {
	destroy$: Subject<boolean> = new Subject<boolean>()
	formData: IUser | null = null

	constructor(private readonly authState: AuthState) {}

	ngOnInit(): void {
		this.authState.user$
			.pipe(takeUntil(this.destroy$))
			.subscribe((authData) => {
				this.formData = authData
			})
	}

	ngOnDestroy(): void {
		this.destroy$.next(true)
	}
}
