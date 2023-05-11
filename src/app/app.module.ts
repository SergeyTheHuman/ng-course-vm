import {
	HttpClient,
	HttpClientModule,
	HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'
import { HeaderComponent } from './components/header/header.component'
import { AuthModule } from './pages/auth/auth.module'
import { NotFoundModule } from './pages/not-found/not-found.module'
import { PostModule } from './pages/post/post.module'
import { PostsModule } from './pages/posts/posts.module'
import { AuthService } from './services/auth/auth.service'
import { AuthState } from './services/auth/auth.state'
import { CryptoService } from './services/b-crypt/b-crypt.service'
import { DarkThemeService } from './services/dark-theme/dark-theme.service'
import { DarkThemeState } from './services/dark-theme/dark-theme.state'
import { LocalStorageService } from './services/local-storage/local-storage.service'
import { PostApi } from './services/posts/post.api'
import { PostService } from './services/posts/post.service'
import { PostState } from './services/posts/post.state'
import { DateTimeComponent } from './shared/components/date-time/date-time.component'
import { IfNotDirective } from './shared/directives/if-not/if-not.directive'
import { StyleDirective } from './shared/directives/style/style.directive'
import { AuthInterceptor } from './shared/interceptors/auth.interceptor'
import { PostsPipe } from './shared/pipes/posts/posts.pipe'
import { ZeroIfUndefinedOrNullPipe } from './shared/pipes/zero-if-undefined-or-null/zero-if-undefined-or-null.pipe'

const INTERCEPTORS = {
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptor,
	multi: true,
}

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		PostsModule,
		PostModule,
		AuthModule,
		NotFoundModule,
		ZeroIfUndefinedOrNullPipe,
		StyleDirective,
		IfNotDirective,
		PostsPipe,
		DateTimeComponent,
	],
	providers: [
		Document,
		INTERCEPTORS,
		LocalStorageService,
		{
			provide: DarkThemeService,
			deps: [DarkThemeState],
		},
		{
			provide: DarkThemeState,
			deps: [],
		},
		{
			provide: PostService,
			deps: [PostApi, PostState],
		},
		{
			provide: PostState,
			deps: [],
		},
		{
			provide: PostApi,
			deps: [HttpClient],
		},
		{
			provide: AuthService,
			deps: [AuthState],
		},
		{
			provide: AuthState,
			deps: [LocalStorageService, CryptoService],
		},
		CryptoService,
		LocalStorageService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
