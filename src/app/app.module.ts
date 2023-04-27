import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { DateTimeComponent } from './components/date-time/date-time/date-time.component'
import { PostFilterComponent } from './components/post-filter/post-filter.component'
import { PostFormComponent } from './components/post-form/post-form/post-form.component'
import { PostComponent } from './components/post/post.component'
import { IfNotDirective } from './directives/if-not/if-not.directive'
import { StyleDirective } from './directives/style/style.directive'
import { FilterPipe } from './pipes/filter/filter.pipe'
import { PostsPipe } from './pipes/posts/posts.pipe'

@NgModule({
	declarations: [
		AppComponent,
		PostComponent,
		PostFormComponent,
		PostFilterComponent,
		DateTimeComponent,
		StyleDirective,
		IfNotDirective,
		PostsPipe,
		FilterPipe,
		PostFilterComponent,
	],
	imports: [BrowserModule, CommonModule, FormsModule],
	providers: [Document],
	bootstrap: [AppComponent],
})
export class AppModule {}
