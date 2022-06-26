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
  pokemons!: Pokemon[];
  pokemonsToDisplay!: Pokemon[];

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.pokemons = await lastValueFrom(this.pokemonService.getPokemons());
    this.pokemonsToDisplay = this.pokemons;
  }

  onSearchChange(search: string) {
    this.pokemonsToDisplay = this.pokemons.filter(
      (pokemon) => !search || pokemon.name.includes(search)
    );
  }
}
