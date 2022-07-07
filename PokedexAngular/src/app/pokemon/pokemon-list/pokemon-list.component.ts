import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ListablePokemon, Order } from '../types';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: ListablePokemon[] = [];
  pokemonsToDisplay: ListablePokemon[] = [];
  search = '';
  selectedGeneration = '0';
  orderOptions = Object.values(Order);
  order: string = Order.Id;
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
        if (this.order === Order.Name) {
          this.pokemons = this.orderPokemonsByName([
            ...this.pokemons,
            ...pokemons,
          ]);
        } else {
          this.pokemons = [...this.pokemons, ...pokemons];
        }
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

  orderPokemonsByName(pokemons: ListablePokemon[]) {
    return pokemons.sort((a, b) => a.name.localeCompare(b.name));
  }

  onScrollDown() {
    if (!this.search && !parseInt(this.selectedGeneration)) {
      this.getMorePokemons();
    }
  }

  onOrderChange(order: string) {
    this.order = order;
    this.pokemons = [];
    this.offset = 0;
    this.getMorePokemons();
  }
}
