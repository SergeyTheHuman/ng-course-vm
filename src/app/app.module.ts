import { APP_BASE_HREF } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { environment } from 'src/environments/environment'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'
import { AuthFormComponent } from './components/auth-form/auth-form.component'
import { DateTimeComponent } from './components/date-time/date-time.component'
import { HeaderComponent } from './components/header/header.component'
import { InputComponent } from './components/input/input.component'
import { PostFilterComponent } from './components/post-filter/post-filter.component'
import { PostFormComponent } from './components/post-form/post-form.component'
import { PostListComponent } from './components/post-list/post-list.component'
import { PostScrollComponent } from './components/post-scroll/post-scroll.component'
import { PostComponent } from './components/post/post.component'
import { RadioComponent } from './components/radio/radio.component'
import { SelectComponent } from './components/select/select.component'
import { TagsControlComponent } from './components/tags-control/tags-control.component'
import { ValidationErrorsComponent } from './components/validation-errors/validation-errors.component'
import { IfNotDirective } from './directives/if-not/if-not.directive'
import { StyleDirective } from './directives/style/style.directive'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { AuthPage } from './pages/auth/auth.page'
import { NotFoundPage } from './pages/not-found/not-found.page'
import { PolicyPage } from './pages/policy/policy.page'
import { PostPage } from './pages/post/post.page'
import { PostsPage } from './pages/posts/posts.page'
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
	useValue: environment.API_BASE_URL,
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
		HeaderComponent,
		PostFilterComponent,
		AuthFormComponent,
		PostScrollComponent,
		InputComponent,
		StyleDirective,
		IfNotDirective,
		PostsPipe,
		FilterPipe,
		ZeroIfUndefinedOrNullPipe,
		PostsPage,
		AuthPage,
		NotFoundPage,
		PostPage,
		PolicyPage,
		ValidationErrorsComponent,
		SelectComponent,
		RadioComponent,
		TagsControlComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
	],
	providers: [PostService, Document, INTERCEPTORS],
	bootstrap: [AppComponent],
})
export class AppModule {}
