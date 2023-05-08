import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthPage } from './pages/auth/auth.page'
import { NotFoundPage } from './pages/not-found/not-found.page'
import { PostPage } from './pages/post/post.page'
import { PostsPage } from './pages/posts/posts.page'

const routes: Routes = [
	{
		path: '',
		redirectTo: '/posts',
		pathMatch: 'full',
	},
	{ path: 'posts', component: PostsPage },
	{ path: 'auth', component: AuthPage },
	{ path: 'posts/:id', component: PostPage },
	{ path: '**', component: NotFoundPage },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
