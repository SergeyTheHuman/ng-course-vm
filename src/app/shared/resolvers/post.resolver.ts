import { inject, InjectionToken } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { Observable } from 'rxjs'
import { PostApi } from 'src/app/services/posts/post.api'
import { PostState } from 'src/app/services/posts/post.state'
import { IPost } from '../../pages/posts/components/post/interfaces/post.interface'
import { PostService } from '../../services/posts/post.service'

const POST_SERVICE_TOKEN = new InjectionToken<PostService>('PostService', {
	factory: () => new PostService(inject(PostApi), inject(PostState)),
})

export const postResolver: ResolveFn<IPost> = (
	route: ActivatedRouteSnapshot,
): Observable<IPost> | Promise<IPost> | IPost => {
	const postService = inject(POST_SERVICE_TOKEN)
	const post = postService.findOneById(route.params['id'])

	if (post) return post

	return postService.getOne(route.params['id'])
}
