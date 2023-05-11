import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthPage } from './components/auth-page/auth.page'

const routes: Routes = [
	{ path: '', component: AuthPage },
	{
		path: 'policy',
		loadChildren: () =>
			import('src/app/pages/policy/policy.module').then(
				(m) => m.PolicyModule,
			),
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRouting {}
