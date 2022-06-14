import { Component, OnInit } from '@angular/core';

export type ToDo = { label: string; completed: boolean };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  toDos: ToDo[] = [];
  toDoInput = '';

  ngOnInit() {}

  addToDo(event: any) {
    if (event.key === 'Enter') {
      this.toDos.push({ label: this.toDoInput, completed: false });
      this.toDoInput = '';
    }
  }

  deleteToDo(index: number) {
    this.toDos.splice(index, 1);
  }
}
