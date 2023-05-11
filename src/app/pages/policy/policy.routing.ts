import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { authGuard } from 'src/app/shared/guards/auth.guard'
import { PolicyPage } from './components/policy-page/policy.page'

const routes: Routes = [
	{
		path: '',
		component: PolicyPage,
		canActivate: [authGuard],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PolicyRouting {}
