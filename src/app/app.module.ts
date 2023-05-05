import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { APP_BASE_HREF } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { environment } from 'src/environments/environment'
import { AppComponent } from './app.component'
import { AuthFormComponent } from './components/auth-form/auth-form.component'
import { DateTimeComponent } from './components/date-time/date-time.component'
import { PostFilterComponent } from './components/post-filter/post-filter.component'
import { PostFormComponent } from './components/post-form/post-form.component'
import { PostListComponent } from './components/post-list/post-list.component'
import { PostComponent } from './components/post/post.component'
import { IfNotDirective } from './directives/if-not/if-not.directive'
import { StyleDirective } from './directives/style/style.directive'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { FilterPipe } from './pipes/filter/filter.pipe'
import { PostsPipe } from './pipes/posts/posts.pipe'
import { ZeroIfUndefinedOrNullPipe } from './pipes/zero-if-undefined-or-null/zero-if-undefined-or-null.pipe'
import { PostService } from './services/posts/post.service'

const INTERCEPTORS = {
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptor,
	multi: true,
}
const ENVIRONMENT = {
	provide: APP_BASE_HREF,
	useValue: environment.APP_BASE_URL,
}

@NgModule({
	declarations: [
		AppComponent,
		PostComponent,
		PostFormComponent,
		PostFilterComponent,
		DateTimeComponent,
		AuthFormComponent,
		PostListComponent,
		StyleDirective,
		IfNotDirective,
		PostsPipe,
		FilterPipe,
		PostFilterComponent,
		AuthFormComponent,
		ZeroIfUndefinedOrNullPipe,
	],
	imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
	providers: [PostService, Document, INTERCEPTORS, ENVIRONMENT],
	bootstrap: [AppComponent],
})
export class AppModule {}
