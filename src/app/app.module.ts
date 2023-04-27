import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { PostFormComponent } from './components/post-form/post-form/post-form.component'
import { PostComponent } from './components/post/post.component'
import { StyleDirective } from './directives/style.directive'

@NgModule({
	declarations: [
		AppComponent,
		PostComponent,
		PostFormComponent,
		StyleDirective,
	],
	imports: [BrowserModule, FormsModule],
	providers: [Document],
	bootstrap: [AppComponent],
})
export class AppModule {}
