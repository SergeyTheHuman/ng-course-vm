import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent {
   inputValue: string = 'Random input value';
   lightMode: boolean = true

   constructor() {}

   public onInput(event: Event) {
      this.inputValue = (event.target as HTMLInputElement).value;
   }
}
