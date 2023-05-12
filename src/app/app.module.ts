import {
	HttpClient,
	HttpClientModule,
	HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { isDevMode, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { ServiceWorkerModule } from '@angular/service-worker'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'
import { HeaderComponent } from './components/header/header.component'
import { AuthService } from './services/auth/auth.service'
import { AuthState } from './services/auth/auth.state'
import { CryptoService } from './services/crypto/crypto.service'
import { DarkThemeService } from './services/dark-theme/dark-theme.service'
import { DarkThemeState } from './services/dark-theme/dark-theme.state'
import { LocalStorageService } from './services/local-storage/local-storage.service'
import { PostApi } from './services/posts/post.api'
import { PostService } from './services/posts/post.service'
import { PostState } from './services/posts/post.state'
import { DateTimeComponent } from './shared/components/date-time/date-time.component'
import { ModalModule } from './shared/components/modal/modal.module'
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
		ModalModule,
		ZeroIfUndefinedOrNullPipe,
		StyleDirective,
		IfNotDirective,
		PostsPipe,
		DateTimeComponent,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: !isDevMode(),
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
	],
	providers: [
		Document,
		INTERCEPTORS,
		LocalStorageService,
		CryptoService,
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
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
