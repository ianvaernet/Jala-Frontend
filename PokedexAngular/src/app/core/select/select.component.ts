import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() label!: string;
  @Input() options!: { name: string; value: string }[];
  @Input() selectedOption!: string;
  @Output() selectChange = new EventEmitter<string>();
}
