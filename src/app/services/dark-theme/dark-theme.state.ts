import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'any',
})
export class DarkThemeState {
	darkTheme$: BehaviorSubject<boolean> = new BehaviorSubject(false)

	constructor() {}

	get theme() {
		return this.darkTheme$.getValue()
	}

	set(isDark: boolean) {
		this.darkTheme$.next(isDark)
	}
}
