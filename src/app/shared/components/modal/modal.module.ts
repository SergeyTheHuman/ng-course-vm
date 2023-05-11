import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ModalService } from 'src/app/services/modal/modal.service'
import { ModalComponent } from './components/modal/modal.component'

@NgModule({
	declarations: [ModalComponent],
	imports: [CommonModule],
	providers: [ModalService],
})
export class ModalModule {}
