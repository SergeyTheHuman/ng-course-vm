import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StyleDirective } from 'src/app/shared/directives/style/style.directive'
import { FilterPipe } from 'src/app/shared/pipes/filter/filter.pipe'
import { ReversePipe } from 'src/app/shared/pipes/reverse/reverse.pipe'
import { PostFilterComponent } from './components/post-filter/post-filter.component'
import { PostFormComponent } from './components/post-form/post-form.component'
import { PostListComponent } from './components/post-list/post-list.component'
import { PostScrollComponent } from './components/post-scroll/post-scroll.component'
import { PostComponent } from './components/post/post.component'
import { PostsPage } from './components/posts-page/posts.page'
import { PostsRouting } from './posts.routing'

@NgModule({
	declarations: [
		PostComponent,
		PostScrollComponent,
		PostFilterComponent,
		PostListComponent,
		PostFormComponent,
		PostsPage,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PostsRouting,
		FilterPipe,
		ReversePipe,
		StyleDirective,
	],
	exports: [PostsPage],
	providers: [],
})
export class PostsModule {}
