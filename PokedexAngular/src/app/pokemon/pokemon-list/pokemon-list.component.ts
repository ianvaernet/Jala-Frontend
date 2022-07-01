import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../types';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonsToDisplay: Pokemon[] = [];
  search = '';
  selectedGeneration = '0';
  limit = 50;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.getMorePokemons();
  }

  getMorePokemons() {
    this.pokemonService
      .getPokemons(this.limit, this.offset, parseInt(this.selectedGeneration))
      .subscribe((pokemons) => {
        this.pokemons = this.orderPokemonsByName([
          ...this.pokemons,
          ...pokemons,
        ]);
        this.pokemonsToDisplay = this.pokemons;
      });
    this.offset += this.limit;
  }

  onSearchChange(search: string) {
    this.search = search;
    this.pokemonsToDisplay = search
      ? this.pokemons.filter((pokemon) => pokemon.name.includes(search))
      : this.pokemons;
  }

  onGenerationChange(generation: string) {
    this.selectedGeneration = generation;
    this.pokemons = [];
    this.offset = 0;
    this.getMorePokemons();
  }

  orderPokemonsByName(pokemons: Pokemon[]) {
    return pokemons.sort((a, b) => a.name.localeCompare(b.name));
  }

  onScrollDown() {
    if (!this.search && !parseInt(this.selectedGeneration)) {
      this.getMorePokemons();
    }
  }
}
