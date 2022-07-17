import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../types';

@Injectable({ providedIn: 'root' })
export class PokemonDetailsResolver implements Resolve<Pokemon> {
  constructor(private pokemonService: PokemonService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pokemon> {
    const id = route.paramMap.get('id')!;
    if (parseInt(id) < 1000) {
      return this.pokemonService
        .getPokemon(id)
        .pipe(
          switchMap((pokemon) =>
            this.pokemonService
              .getPokemonEvolutionChain(pokemon.evolutionChainId)
              .pipe(map((evolutionChain) => ({ ...pokemon, evolutionChain })))
          )
        );
    } else {
      return of(this.pokemonService.getCustomPokemon(id)!);
    }
  }
}
