import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IPost } from 'src/app/components/post/post.interface'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class PostApi {
	constructor(private http: HttpClient) {}

	getAll(): Observable<IPost[]> {
		let params = new HttpParams()
		params = params.append('_limit', 10)

		return this.http.get<IPost[]>(`${environment.APP_BASE_URL}posts`, {
			params,
		})
	}

	add(post: IPost): Observable<IPost> {
		return this.http.post<IPost>(`${environment.APP_BASE_URL}posts`, post)
	}

	update(post: IPost): Observable<IPost> {
		return this.http.put<IPost>(
			`${environment.APP_BASE_URL}posts/${post.id}`,
			post,
		)
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${environment.APP_BASE_URL}posts/${id}`)
	}
}
