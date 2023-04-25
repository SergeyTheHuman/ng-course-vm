import { Component, EventEmitter, Output } from '@angular/core';
import { IPost } from 'src/app/post/post.interface';

@Component({
  selector: 'mv-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
  author = '';
  text = '';

  @Output()
  onAdd: EventEmitter<IPost> = new EventEmitter<IPost>();

  constructor() {}

  public addPost() {
    if (!this.author.trim() || !this.text.trim()) return;

    const newPost = {
      author: this.author,
      text: this.text,
    };

    this.onAdd.emit(newPost);
    this.author = this.text = '';
  }
}
