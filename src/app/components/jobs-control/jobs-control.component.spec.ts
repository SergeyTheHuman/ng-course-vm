import { ComponentFixture, TestBed } from '@angular/core/testing'

import { JobsControlComponent } from './jobs-control.component'

describe('JobsControlComponent', () => {
	let component: JobsControlComponent
	let fixture: ComponentFixture<JobsControlComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [JobsControlComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(JobsControlComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
