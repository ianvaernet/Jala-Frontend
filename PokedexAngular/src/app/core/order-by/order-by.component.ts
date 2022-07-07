import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss'],
})
export class OrderByComponent {
  @Input() orderOptions!: string[];
  @Input() currentOrder!: string;
  @Output() orderChange = new EventEmitter<string>();
}
