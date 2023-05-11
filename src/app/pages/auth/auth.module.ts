import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from 'src/app/services/auth/auth.service'
import { AuthState } from 'src/app/services/auth/auth.state'
import { InputDateComponent } from 'src/app/shared/components/input-date/input-date.component'
import { InputComponent } from 'src/app/shared/components/input/input.component'
import { RadioComponent } from 'src/app/shared/components/radio/radio.component'
import { SelectComponent } from 'src/app/shared/components/select/select.component'
import { TagsControlComponent } from 'src/app/shared/components/tags-control/tags-control.component'
import { ValidationErrorsComponent } from 'src/app/shared/components/validation-errors/validation-errors.component'
import { AuthRouting } from './auth.routing'
import { AuthFormComponent } from './components/auth-form/auth-form.component'
import { AuthPage } from './components/auth-page/auth.page'
import { JobsControlComponent } from './components/jobs-control/jobs-control.component'

@NgModule({
	declarations: [AuthPage, AuthFormComponent, JobsControlComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AuthRouting,
		InputComponent,
		InputDateComponent,
		SelectComponent,
		RadioComponent,
		TagsControlComponent,
		ValidationErrorsComponent,
	],
	exports: [AuthPage],
	providers: [
		{
			provide: AuthService,
			deps: [AuthState],
		},
		{
			provide: AuthState,
			deps: [],
		},
	],
})
export class AuthModule {}
