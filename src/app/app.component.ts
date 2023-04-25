import { Component } from '@angular/core';
import { IPost } from './post/post.interface';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent {
   inputValue: string = 'Random input value';
   lightMode: boolean = true;
   posts: IPost[] = [
      {
         author: 'Sergey',
         text: 'Some text',
         comments: [
            {
               author: 'User 1',
               text: 'text 1',
            },
            {
               author: 'User 2',
               text: 'text 2',
            },
            {
               author: 'User 3',
               text: 'text 3',
            },
         ],
      },
      {
         author: 'Anasteysha',
         text: 'Some text from Anasteysha',
         comments: [
            {
               author: 'User 23',
               text: 'text 23',
            },
            {
               author: 'User 24',
               text: 'text 24',
            },
            {
               author: 'User 25',
               text: 'text 25',
            },
         ],
      },
   ];

   constructor() {}

   public onInput(event: Event) {
      this.inputValue = (event.target as HTMLInputElement).value;
   }
}
