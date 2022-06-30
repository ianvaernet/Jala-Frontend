import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import {
  ListPokemonsByGenerationResult,
  ListPokemonsResult,
  PokemonDetails,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private API_URL = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) {}

  getPokemons(limit?: number, offset?: number, generation?: number) {
    const pokemonsData = generation
      ? this.getPokemonsFromGeneration(generation)
      : this.getPokemonsData(limit, offset);
    const backgroundColors = this.getPokemonBackgroundColors();
    const pokemons = forkJoin([pokemonsData, backgroundColors]).pipe(
      map(([pokemons, pokemonColors]) => {
        return pokemons.map((pokemon) => {
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

  getPokemonsFromGeneration(generation: number) {
    const pokemons = this.http
      .get<ListPokemonsByGenerationResult>(
        `${this.API_URL}/generation/${generation}`
      )
      .pipe(map((response) => response.pokemon_species));

    return pokemons;
  }

  getPokemonsData(limit = 25, offset = 0) {
    const pokemons = this.http
      .get<ListPokemonsResult>(
        `${this.API_URL}/pokemon?limit=${limit}&offset=${offset}`
      )
      .pipe(map((response) => response.results));

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

  getPokemon(id: string) {
    const pokemon = this.http.get<PokemonDetails>(
      `${this.API_URL}/pokemon/${id}`
    );

    return pokemon;
  }
}
