import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { postResolver } from 'src/app/shared/resolvers/post.resolver'
import { PostPage } from './components/post/post.page'

const routes: Routes = [
	{ path: '', component: PostPage, resolve: { post: postResolver } },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PostRouting {}
