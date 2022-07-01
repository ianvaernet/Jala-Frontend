import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import {
  ListPokemonsByGenerationResult,
  ListPokemonsResult,
  Pokemon,
  PokemonDetails,
  PokemonSpecie,
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

  getPokemon(id: string): Observable<Pokemon> {
    const pokemonDetails = this.getPokemonDetails(id);
    const pokemonSpecie = this.getPokemonSpecie(id);
    const pokemon = forkJoin([pokemonDetails, pokemonSpecie]).pipe(
      map(([pokemonDetails, pokemonSpecie]) => ({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: pokemonSpecie.egg_groups[0].name,
        image: this.getPokemonImageUri(id),
        description: this.getPokemonDescription(pokemonSpecie),
      }))
    );
    return pokemon;
  }

  getPokemonDetails(id: string) {
    return this.http.get<PokemonDetails>(`${this.API_URL}/pokemon/${id}`);
  }
  getPokemonSpecie(id: string) {
    return this.http.get<PokemonSpecie>(
      `${this.API_URL}/pokemon-species/${id}`
    );
  }

  getPokemonDescription(pokemonSpecie: PokemonSpecie) {
    const uniqueDescriptions = new Set(
      pokemonSpecie.flavor_text_entries
        .filter((entry) => entry.language.name === 'es')
        .map((entry) => entry?.flavor_text)
    );
    return Array.from(uniqueDescriptions).join(' ');
  }
}
