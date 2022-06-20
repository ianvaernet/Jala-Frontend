import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  //   styleUrls: ['./app-pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  constructor() {}
}
