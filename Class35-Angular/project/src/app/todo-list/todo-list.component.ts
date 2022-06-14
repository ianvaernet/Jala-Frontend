import { Component, Input } from '@angular/core';
import { ToDo } from '../app.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() toDos!: ToDo[];
  pendingToDos: ToDo[] = [];

  toggleCompleted(index: number) {
    this.toDos[index].completed = !this.toDos[index].completed;
    if (this.toDos) {
      this.pendingToDos = this.toDos.filter((todo) => !todo.completed);
    }
  }

  deleteToDo(index: number) {
    this.toDos.splice(index, 1);
  }
}
