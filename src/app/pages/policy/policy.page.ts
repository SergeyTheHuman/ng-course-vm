import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { IAuthFormData } from 'src/app/components/auth-form/interfaces/form-data.interface'

@Component({
	selector: 'mv-policy-page',
	templateUrl: './policy.page.html',
	styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
	formData!: IAuthFormData

	constructor(private readonly location: Location) {}

	ngOnInit(): void {
		const routeState = this.location.getState() as { formData: unknown }
		this.formData = routeState?.formData as IAuthFormData
	}
}
