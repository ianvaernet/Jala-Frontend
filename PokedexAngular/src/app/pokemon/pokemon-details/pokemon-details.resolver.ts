import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../types';

@Injectable({ providedIn: 'root' })
export class PokemonDetailsResolver implements Resolve<Pokemon> {
  constructor(private pokemonService: PokemonService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pokemon> {
    return this.pokemonService.getPokemon(route.paramMap.get('id')!);
  }
}
