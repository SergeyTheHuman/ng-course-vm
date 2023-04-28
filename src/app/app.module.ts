import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { AuthFormComponent } from './components/auth-form/auth-form.component'
import { DateTimeComponent } from './components/date-time/date-time.component'
import { PostFilterComponent } from './components/post-filter/post-filter.component'
import { PostFormComponent } from './components/post-form/post-form.component'
import { PostComponent } from './components/post/post.component'
import { IfNotDirective } from './directives/if-not/if-not.directive'
import { StyleDirective } from './directives/style/style.directive'
import { FilterPipe } from './pipes/filter/filter.pipe'
import { PostsPipe } from './pipes/posts/posts.pipe'
import { ZeroIfUndefinedOrNullPipe } from './pipes/zero-if-undefined-or-null/zero-if-undefined-or-null.pipe'
import { PostService } from './services/posts/post.service'

@NgModule({
	declarations: [
		AppComponent,
		PostComponent,
		PostFormComponent,
		PostFilterComponent,
		DateTimeComponent,
		AuthFormComponent,
		StyleDirective,
		IfNotDirective,
		PostsPipe,
		FilterPipe,
		PostFilterComponent,
		AuthFormComponent,
		ZeroIfUndefinedOrNullPipe,
	],
	imports: [BrowserModule, FormsModule, ReactiveFormsModule],
	providers: [Document, PostService],
	bootstrap: [AppComponent],
})
export class AppModule {}
