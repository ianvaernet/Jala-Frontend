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
  limit = 50;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.getMorePokemons();
  }

  getMorePokemons() {
    this.pokemonService
      .getPokemons(this.limit, this.offset)
      .subscribe((pokemons) => {
        this.pokemons = [...this.pokemons, ...pokemons];
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

  onScrollDown() {
    if (!this.search) {
      this.getMorePokemons();
    }
  }
}
