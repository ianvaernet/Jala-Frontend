import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundComponent } from '../core/not-found/not-found.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonListComponent,
    SearchBarComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  exports: [PokemonListComponent],
  providers: [],
})
export class PokemonModule {}
