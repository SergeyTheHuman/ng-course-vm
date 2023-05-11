import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PostPage } from './components/post/post.page'
import { PostRouting } from './post.routing'

@NgModule({
	declarations: [PostPage],
	imports: [CommonModule, PostRouting],
	exports: [PostPage],
	providers: [],
})
export class PostModule {}
