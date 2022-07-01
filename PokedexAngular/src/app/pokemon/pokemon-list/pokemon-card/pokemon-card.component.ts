import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ListablePokemon } from '../../types';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: ListablePokemon;
  constructor(private router: Router) {}

  goToPokemonDetails() {
    this.router.navigate([`/pokedex/${this.pokemon.id}`]);
  }
}
