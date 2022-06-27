import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../types';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonsToDisplay!: Pokemon[];
  limit = 50;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.pokemonService
      .getPokemons(this.limit, this.offset)
      .subscribe((pokemons) => {
        this.pokemons = [...this.pokemons, ...pokemons];
        this.pokemonsToDisplay = this.pokemons;
      });
    this.offset += this.limit;
  }

  onSearchChange(search: string) {
    this.pokemonsToDisplay = this.pokemons.filter(
      (pokemon) => !search || pokemon.name.includes(search)
    );
  }
}
