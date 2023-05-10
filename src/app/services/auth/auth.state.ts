import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class AuthState {
	user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(
		null,
	)

	constructor() {}

	get userData$(): Observable<IUser | null> {
		return this.user$.asObservable()
	}

	get isAuth$(): Observable<boolean> {
		return this.user$.asObservable().pipe(map((user) => !!user))
	}

	setAuth(user: IUser | null) {
		this.user$.next(user)
	}
}
