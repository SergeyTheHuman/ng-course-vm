import { NgModule } from '@angular/core'
import { NotFoundPage } from './components/not-found-page/not-found.page'
import { NotFoundRouting } from './not-found.routing'

@NgModule({
	declarations: [NotFoundPage],
	imports: [NotFoundRouting],
	exports: [NotFoundRouting],
	providers: [],
})
export class NotFoundModule {}
