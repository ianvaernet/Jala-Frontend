import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export type PokemonFromApi = { name: string; url: string };
export type Pokemon = { name: string; url: string; image: string };

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons() {
    const pokemons = this.http
      .get<PokemonFromApi[]>('/assets/pokemons.json')
      .pipe(
        map((pokemons) => {
          return pokemons.map((pokemon, index) => ({
            ...pokemon,
            image: this.getPokemonImageUri(index + 1),
          }));
        })
      );
    return pokemons;
  }

  getPokemonImageUri(id: number) {
    const imageId = ('00' + id).slice(-3); // para 1 => 001
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
  }
}
