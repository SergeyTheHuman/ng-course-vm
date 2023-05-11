import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PostsPage } from './components/posts-page/posts.page'

const routes: Routes = [{ path: '', pathMatch: 'full', component: PostsPage }]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PostsRouting {}
