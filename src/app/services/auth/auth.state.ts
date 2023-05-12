import { Injectable, OnInit } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { CryptoService } from '../crypto/crypto.service'
import { LocalStorageService } from '../local-storage/local-storage.service'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class AuthState implements OnInit {
	user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(
		null,
	)

	constructor(
		private readonly localStorage: LocalStorageService,
		private readonly cryptoService: CryptoService,
	) {
		const savedUser = this.localStorage.getItem('user')
		if (!savedUser) return

		const decodedSavedUser = this.cryptoService.decode<IUser>(savedUser)
		if (decodedSavedUser) this.user$.next(decodedSavedUser)
	}

	ngOnInit(): void {}

	get userData$(): Observable<IUser | null> {
		return this.user$.asObservable()
	}

	get isAuth$(): Observable<boolean> {
		return this.user$.asObservable().pipe(map((user) => !!user))
	}

	setAuth(user: null): void
	setAuth(user: IUser): void
	setAuth(user: IUser | null) {
		this.user$.next(user)
		if (user) {
			const encodedUser = this.cryptoService.encode(user)
			this.localStorage.setItem('user', encodedUser)
		} else {
			this.localStorage.removeItem('user')
		}
	}
}
