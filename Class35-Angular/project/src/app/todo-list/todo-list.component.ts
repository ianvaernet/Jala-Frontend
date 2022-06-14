import { Component, Input } from '@angular/core';
import { ToDo } from '../app.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  // styleUrls: ['./list-item.component.scss'],
})
export class TodoListComponent {
  @Input() toDos!: ToDo[];

  deleteToDo(index: number) {
    console.log('deleteToDo');
  }
}
