import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  // styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  title = 'list-item';
  todos = [
    { label: 'Test', completed: false },
    { label: 'Test2', completed: true },
  ];

  deleteToDo() {
    console.log('deleteToDo');
  }
}
