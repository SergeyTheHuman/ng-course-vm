import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { tap } from 'rxjs'
import { AuthService } from '../../services/auth/auth.service'

export const authGuard: CanActivateFn = () => {
	const router = inject(Router)

	return inject(AuthService).isAuth$.pipe(
		tap((isAuth) => {
			isAuth ? true : router.navigate(['/auth'])
		}),
	)
}
