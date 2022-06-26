import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ListPokemonsResult, PokemonFromApi } from './types';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons() {
    const pokemonsData = this.getPokemonsData();
    const backgroundColors = this.getPokemonBackgroundColors();
    const pokemons = forkJoin([pokemonsData, backgroundColors]).pipe(
      map(([pokemons, pokemonColors]) => {
        return pokemons.results.map((pokemon, index) => ({
          ...pokemon,
          image: this.getPokemonImageUri(index + 1),
          background: pokemonColors[(index + 1).toString()],
        }));
      })
    );
    return pokemons;
  }

  getPokemonsData() {
    const pokemons = this.http.get<ListPokemonsResult>(
      'https://pokeapi.co/api/v2/pokemon/?limit=50&offset=0'
    );

    return pokemons;
  }

  getPokemonImageUri(id: number) {
    const imageId = ('00' + id).slice(-3); // para 1 => 001
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
  }

  getPokemonBackgroundColors() {
    const pokemonColors = this.http.get<Record<string, string>>(
      '/assets/pokemons-colors.json'
    );

    return pokemonColors;
  }
}
