import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundComponent } from '../core/not-found/not-found.component';
import { PokemonCardComponent } from './pokemon-list/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { SearchBarComponent } from './pokemon-list/search-bar/search-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GenerationFilterComponent } from './pokemon-list/generation-filter/generation-filter.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonRoutingModule } from './pokemon-routing.module';

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonListComponent,
    SearchBarComponent,
    NotFoundComponent,
    GenerationFilterComponent,
    PokemonDetailsComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, InfiniteScrollModule],
  exports: [PokemonRoutingModule],
  providers: [],
})
export class PokemonModule {}
