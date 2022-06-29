import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generation-filter',
  templateUrl: './generation-filter.component.html',
  styleUrls: ['./generation-filter.component.scss'],
})
export class GenerationFilterComponent implements OnInit {
  @Output() generationChange = new EventEmitter();
  @Input() selectedGeneration!: string;

  constructor() {}

  ngOnInit(): void {}
}
