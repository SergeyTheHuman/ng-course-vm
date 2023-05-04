import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IPost } from 'src/app/components/post/post.interface'

@Injectable({
	providedIn: 'any',
})
export class PostApi {
	constructor(private http: HttpClient) {}

	getAll(): Observable<IPost[]> {
		return this.http.get<IPost[]>(
			'https://jsonplaceholder.typicode.com/posts?_limit=10',
		)
	}

	add(post: IPost): Observable<IPost> {
		return this.http.post<IPost>(
			'https://jsonplaceholder.typicode.com/posts',
			post,
		)
	}

	delete(id: number): Observable<object> {
		return this.http.delete(
			`https://jsonplaceholder.typicode.com/posts/${id}`,
		)
	}
}
