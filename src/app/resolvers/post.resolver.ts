import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { Observable } from 'rxjs'
import { IPost } from '../components/post/interfaces/post.interface'
import { PostService } from '../services/posts/post.service'

export const postResolver: ResolveFn<IPost> = (
	route: ActivatedRouteSnapshot,
): Observable<IPost> | Promise<IPost> | IPost => {
	const postService = inject(PostService)
	const post = postService.findOneById(route.params['id'])

	if (post) return post

	return postService.getOne(route.params['id'])
}
