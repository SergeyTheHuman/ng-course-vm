import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthPage } from './pages/auth/auth.page'
import { PostsPage } from './pages/posts/posts.page'

const routes: Routes = [
	{ path: '', component: PostsPage },
	{ path: 'auth', component: AuthPage },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
