import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ListPokemonsResult } from './types';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private API_URL = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

  getPokemons(limit?: number, offset?: number) {
    const pokemonsData = this.getPokemonsData(limit, offset);
    const backgroundColors = this.getPokemonBackgroundColors();
    const pokemons = forkJoin([pokemonsData, backgroundColors]).pipe(
      map(([pokemons, pokemonColors]) => {
        return pokemons.results.map((pokemon) => {
          const id = this.getIdFromUrl(pokemon.url);
          return {
            ...pokemon,
            id,
            image: this.getPokemonImageUri(id),
            background: pokemonColors[id],
          };
        });
      })
    );
    return pokemons;
  }

  getPokemonsData(limit = 25, offset = 0) {
    const pokemons = this.http.get<ListPokemonsResult>(
      `${this.API_URL}/?limit=${limit}&offset=${offset}`
    );

    return pokemons;
  }

  getPokemonImageUri(id: string) {
    const imageId = ('00' + id).slice(-3); // para 1 => 001
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
  }

  getPokemonBackgroundColors() {
    const pokemonColors = this.http.get<Record<string, string>>(
      '/assets/pokemons-colors.json'
    );

    return pokemonColors;
  }

  getIdFromUrl(url: string) {
    return url.split('/').slice(-2, -1)[0];
  }
}
