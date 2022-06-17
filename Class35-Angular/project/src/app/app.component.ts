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

  addToDo() {
    this.toDos.push({ label: this.toDoInput, completed: false });
    this.toDoInput = '';
  }
}
