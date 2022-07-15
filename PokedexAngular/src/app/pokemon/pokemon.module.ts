import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from '../core/not-found/not-found.component';
import { PokemonCardComponent } from './pokemon-list/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { SearchBarComponent } from './pokemon-list/search-bar/search-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectComponent } from '../core/select/select.component';
import { CommonModule } from '@angular/common';
import { PokemonEvolutionChainComponent } from './pokemon-details/pokemon-evolution-chain/pokemon-evolution-chain.component';

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonListComponent,
    SearchBarComponent,
    NotFoundComponent,
    PokemonDetailsComponent,
    SelectComponent,
    PokemonEvolutionChainComponent,
  ],
  imports: [
    PokemonRoutingModule,
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    MatProgressBarModule,
    FontAwesomeModule,
  ],
  exports: [],
  providers: [],
})
export class PokemonModule {}
