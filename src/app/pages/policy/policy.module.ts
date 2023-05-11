import { NgModule } from '@angular/core'
import { PolicyPage } from './components/policy-page/policy.page'
import { PolicyRouting } from './policy.routing'

@NgModule({
	declarations: [PolicyPage],
	imports: [PolicyRouting],
	exports: [PolicyPage],
})
export class PolicyModule {}
