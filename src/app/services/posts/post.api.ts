import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, of } from 'rxjs'
import { IPost } from 'src/app/components/post/interfaces/post.interface'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class PostApi {
	constructor(private http: HttpClient) {}

	getAll(): Observable<IPost[]> {
		let params = new HttpParams()
		params = params.append('_limit', 20)

		return this.http.get<IPost[]>(`${environment.API_BASE_URL}/posts`, {
			params,
		})
	}

	getOne(id: string): Observable<IPost> {
		return this.http.get<IPost>(`${environment.API_BASE_URL}/posts/${id}`)
	}

	add(post: IPost): Observable<IPost> {
		return this.http.post<IPost>(`${environment.API_BASE_URL}/posts`, post)
	}

	update(post: IPost): Observable<IPost> {
		return this.http
			.put<IPost>(`${environment.API_BASE_URL}/posts/${post.id}`, post)
			.pipe(
				catchError((error) => {
					console.log(error.message)

					// (!) Note: needs because of JsonPlaceholder api doesn't support posts with id > 100
					return of(post)
				}),
			)
	}

	delete(id: string): Observable<void> {
		return this.http.delete<void>(`${environment.API_BASE_URL}/posts/${id}`)
	}
}
