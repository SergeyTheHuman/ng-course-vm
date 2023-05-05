import {
	HttpEvent,
	HttpEventType,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		console.log('Intercepted request >>> ', req)

		const cloned = req.clone({
			headers: req.headers.append('Auth', 'Bearer super_kinder_penguin'),
		})

		return next.handle(cloned).pipe(
			tap((event) => {
				if (event.type === HttpEventType.Response)
					console.log('Intercepted response >>> ', event)
			}),
		)
	}
}
