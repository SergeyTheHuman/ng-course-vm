import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthState } from './auth.state'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class AuthService {
	constructor(private readonly authState: AuthState) {}

	get user$(): Observable<IUser | null> {
		return this.authState.userData$
	}

	get isAuth$(): Observable<boolean> {
		return this.authState.isAuth$
	}

	login(user: IUser) {
		this.authState.setAuth(user)
	}

	logout() {
		this.authState.setAuth(null)
	}
}
