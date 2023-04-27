import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { PostFormComponent } from './components/post-form/post-form/post-form.component'
import { PostComponent } from './components/post/post.component'
import { IfNotDirective } from './directives/if-not/if-not.directive'
import { StyleDirective } from './directives/style/style.directive'
import { PostsPipe } from './pipes/posts/posts.pipe'

@NgModule({
	declarations: [
		AppComponent,
		PostComponent,
		PostFormComponent,
		StyleDirective,
		IfNotDirective,
		PostsPipe,
	],
	imports: [BrowserModule, FormsModule],
	providers: [Document],
	bootstrap: [AppComponent],
})
export class AppModule {}
