import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class ThemeService {
	darkTheme$: BehaviorSubject<boolean> = new BehaviorSubject(false)

	constructor() {}

	toggleTheme() {
		if (this.darkTheme$.getValue() === true) {
			this.darkTheme$.next(false)
		} else {
			this.darkTheme$.next(true)
		}
	}
}
