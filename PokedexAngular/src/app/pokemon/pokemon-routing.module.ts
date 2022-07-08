import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonDetailsResolver } from './pokemon-details/pokemon-details.resolver';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonListResolver } from './pokemon-list/pokemon-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PokemonListComponent,
    resolve: { pokemons: PokemonListResolver },
  },
  {
    path: ':id',
    component: PokemonDetailsComponent,
    resolve: { pokemon: PokemonDetailsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
