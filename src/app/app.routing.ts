import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { authGuard } from './shared/guards/auth.guard'

const routes: Routes = [
	{
		path: '',
		redirectTo: '/posts',
		pathMatch: 'full',
	},
	{
		path: 'posts',
		loadChildren: () =>
			import('./pages/posts/posts.module').then((m) => m.PostsModule),
		canActivate: [authGuard],
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./pages/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'posts/:id',
		loadChildren: () =>
			import('./pages/post/post.module').then((m) => m.PostModule),
		canActivate: [authGuard],
	},
	{
		path: '**',
		loadChildren: () =>
			import('./pages/not-found/not-found.module').then(
				(m) => m.NotFoundModule,
			),
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
