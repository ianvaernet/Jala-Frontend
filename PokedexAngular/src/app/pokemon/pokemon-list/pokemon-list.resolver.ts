import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { ListablePokemon } from '../types';

@Injectable({ providedIn: 'root' })
export class PokemonListResolver implements Resolve<ListablePokemon[]> {
  constructor(private pokemonService: PokemonService) {}

  resolve(): Observable<ListablePokemon[]> {
    return this.pokemonService.getPokemons();
  }
}
