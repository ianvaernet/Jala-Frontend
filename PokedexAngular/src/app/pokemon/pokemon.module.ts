import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonListComponent,
    SearchBarComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  exports: [PokemonListComponent],
  providers: [],
})
export class PokemonModule {}
