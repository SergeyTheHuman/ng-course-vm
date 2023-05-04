import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DarkThemeState } from './dark-theme.state'

@Injectable()
export class DarkThemeService {
	constructor(private readonly darkThemeState: DarkThemeState) {}

	get darkTheme$(): Observable<boolean> {
		return this.darkThemeState.darkTheme$.asObservable()
	}

	toggleTheme() {
		if (this.darkThemeState.theme) {
			this.darkThemeState.set(false)
		} else {
			this.darkThemeState.set(true)
		}
	}
}
