import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AddPokemonModalComponent } from './pokemon-list/add-pokemon-modal/add-pokemon-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';

const AngularMaterial = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSliderModule,
  MatSelectModule,
];
@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonListComponent,
    SearchBarComponent,
    NotFoundComponent,
    PokemonDetailsComponent,
    SelectComponent,
    PokemonEvolutionChainComponent,
    AddPokemonModalComponent,
  ],
  imports: [
    PokemonRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatProgressBarModule,
    FontAwesomeModule,
    ...AngularMaterial,
  ],
  exports: [],
  providers: [],
})
export class PokemonModule {}
